import * as fs from 'fs';
import * as path from 'path';
import * as UglifyJS from 'uglify-js';

import { Config, ITranspile, Logger, Scope, Module } from '@cmmv/core';
import { ProtobufTranspile } from '@cmmv/protobuf';

export class VueTranspile implements ITranspile {
    private logger: Logger = new Logger('VueTranspile');

    async run(): Promise<void> {
        const useVue3 = Config.get<boolean>('view.vue3', false);
        const hasProtobuf = Module.hasModule('protobuf');

        if (useVue3) {
            const contracts = Scope.getArray<any>('__contracts');

            if (hasProtobuf) {
                const protobufTranspile =
                    Module.loadTranspile<ProtobufTranspile>(ProtobufTranspile);

                protobufTranspile
                    .returnContractJs()
                    .then((contractsString: string) => {
                        const contractsParsed = JSON.parse(contractsString);
                        this.generateMixins(contractsParsed);
                    });
            }
        }
    }

    private generateMixins(contracts: any): void {
        const content = fs.readFileSync(
            path.resolve(__dirname, '../lib/vue.frontend.cjs'),
            'utf-8',
        );

        const mixinsOutputFile = path.resolve('public/assets/rpc-mixins.js');

        const rpcFunctions = Object.keys(contracts.index)
            .map(contractName => {
                const types = contracts.index[contractName]?.types || {};
                return Object.keys(types)
                    .map(typeName => {
                        const methodName = typeName.replace(
                            /Request|Response/,
                            '',
                        );

                        if (typeName.endsWith('Request')) {
                            if (methodName.startsWith('Add')) {
                                return `
        ${methodName}Request(data) {
            const buffer = this.pack('${contractName}', '${typeName}', { item: data });
            this.send(buffer);
        },`;
                            } else if (methodName.startsWith('Update')) {
                                return `
        ${methodName}Request(data) {
            const buffer = this.pack('${contractName}', '${typeName}', { id: data._id || data.id, item: data });
            this.send(buffer);
        },`;
                            } else if (methodName.startsWith('Delete')) {
                                return `
        ${methodName}Request(data) {
            const buffer = this.pack('${contractName}', '${typeName}', { id: data._id || data.id });
            this.send(buffer);
        },`;
                            } else if (methodName.startsWith('Get')) {
                                return `
        ${methodName}Request() {
            const buffer = this.pack('${contractName}', '${typeName}');
            this.send(buffer);
        },`;
                            } else {
                                return `
        ${methodName}Request(data) {
            const buffer = this.pack('${contractName}', '${typeName}', data);
            this.send(buffer);
        },`;
                            }
                        }
                        return '';
                    })
                    .join('\n');
            })
            .join('\n');

        const mixinTemplate = `
// Generated automatically by CMMV

${content
    .replace('//%CONTRATCTS%', JSON.stringify(contracts))
    .replace('//%RPCFUNCTIONS%', rpcFunctions)}`;

        const minifiedMixinTemplate = UglifyJS.minify(mixinTemplate).code;
        fs.writeFileSync(mixinsOutputFile, minifiedMixinTemplate, 'utf8');
        //this.logger.log(`RPC mixins generated successfully at ${mixinsOutputFile}`);
    }
}
