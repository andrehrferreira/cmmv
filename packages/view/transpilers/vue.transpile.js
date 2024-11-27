"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VueTranspile = void 0;
const fs = require("fs");
const path = require("path");
const UglifyJS = require("uglify-js");
const core_1 = require("@cmmv/core");
const protobuf_1 = require("@cmmv/protobuf");
class VueTranspile {
    constructor() {
        this.logger = new core_1.Logger('VueTranspile');
    }
    async run() {
        const useVue3 = core_1.Config.get('view.vue3', false);
        const hasProtobuf = core_1.Module.hasModule('protobuf');
        if (useVue3) {
            const contracts = core_1.Scope.getArray('__contracts');
            if (hasProtobuf) {
                const protobufTranspile = core_1.Module.loadTranspile(protobuf_1.ProtobufTranspile);
                protobufTranspile
                    .returnContractJs()
                    .then((contractsString) => {
                    const contractsParsed = JSON.parse(contractsString);
                    this.generateMixins(contractsParsed);
                });
            }
        }
    }
    generateMixins(contracts) {
        const content = fs.readFileSync(path.resolve(__dirname, '../lib/vue.frontend.cjs'), 'utf-8');
        const mixinsOutputFile = path.resolve('public/assets/rpc-mixins.js');
        const rpcFunctions = Object.keys(contracts.index)
            .map(contractName => {
            const types = contracts.index[contractName]?.types || {};
            return Object.keys(types)
                .map(typeName => {
                const methodName = typeName.replace(/Request|Response/, '');
                if (typeName.endsWith('Request')) {
                    if (methodName.startsWith('Add')) {
                        return `
        ${methodName}Request(data) {
            const buffer = this.pack('${contractName}', '${typeName}', { item: data });
            this.send(buffer);
        },`;
                    }
                    else if (methodName.startsWith('Update')) {
                        return `
        ${methodName}Request(data) {
            const buffer = this.pack('${contractName}', '${typeName}', { id: data._id || data.id, item: data });
            this.send(buffer);
        },`;
                    }
                    else if (methodName.startsWith('Delete')) {
                        return `
        ${methodName}Request(data) {
            const buffer = this.pack('${contractName}', '${typeName}', { id: data._id || data.id });
            this.send(buffer);
        },`;
                    }
                    else if (methodName.startsWith('Get')) {
                        return `
        ${methodName}Request() {
            const buffer = this.pack('${contractName}', '${typeName}');
            this.send(buffer);
        },`;
                    }
                    else {
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
exports.VueTranspile = VueTranspile;
