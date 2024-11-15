import * as fs from 'fs';
import * as path from 'path';
import * as protobufjs from 'protobufjs';
import * as UglifyJS from 'uglify-js';

import { ProtoRegistry } from '../registries/protobuf.registry';

import { ITranspile, Logger, Scope } from '@cmmv/core';

export class ProtobufTranspile implements ITranspile {
    private logger: Logger = new Logger('ProtobufTranspile');

    run(): void {
        const contracts = Scope.getArray<any>('__contracts');
        const contractsJson: { [key: string]: any } = {};

        contracts?.forEach((contract: any) => {
            const outputPath = path.resolve(contract.protoPath);
            //const outputPathJson = outputPath.replace('.proto', '.json');
            const outputPathTs = outputPath.replace('.proto', '.d.ts');
            const outputDir = path.dirname(outputPath);

            if (!fs.existsSync(outputDir)) {
                fs.mkdirSync(outputDir, { recursive: true });
                this.logger.log(`Created directory ${outputDir}`);
            }

            let root = new protobufjs.Root();
            const protoNamespace = root.define(contract.controllerName);

            const itemMessage = new protobufjs.Type(
                contract.controllerName,
            ).add(new protobufjs.Field('id', 1, 'int32'));

            contract.fields.forEach((field: any, index: number) => {
                const protoType = this.mapToProtoType(field.protoType);
                itemMessage.add(
                    new protobufjs.Field(
                        field.propertyKey,
                        index + 2,
                        protoType,
                    ),
                );
            });

            protoNamespace.add(itemMessage);

            if (!contract.directMessage) {
                const listMessage = new protobufjs.Type(
                    `${contract.controllerName}List`,
                ).add(
                    new protobufjs.Field(
                        'items',
                        1,
                        `${contract.controllerName}`,
                        'repeated',
                    ),
                );

                protoNamespace.add(listMessage);
            }

            const protoContent = this.generateProtoContent(contract);
            fs.writeFileSync(outputPath, protoContent, 'utf8');

            if (
                contract.customProto &&
                typeof contract.customProto === 'function'
            ) {
                try {
                    const customRoot = protobufjs.parse(protoContent).root;
                    root = new protobufjs.Root(customRoot);
                } catch (error) {
                    this.logger.error(
                        `Error parsing custom proto: ${error.message}`,
                    );
                    console.error(error);
                }
            }

            const tsContent = this.generateTypes(contract);
            fs.writeFileSync(outputPathTs, tsContent, 'utf8');

            const contractJSON = root.toJSON();
            contractsJson[contract.controllerName] = contractJSON;

            /*fs.writeFileSync(
                outputPathJson,
                JSON.stringify(contractJSON, null, 4),
                'utf8',
            );*/
        });

        this.generateContractsJs(contractsJson);
    }

    private generateProtoContent(contract: any): string {
        const packageName = contract.protoPackage || null;
        const lines: string[] = [];
        let includesGoogleAny = false;

        contract.fields.forEach((field: any) => {
            if (field.protoType === 'any') includesGoogleAny = true;
        });

        lines.push('// Generated automatically by CMMV\n');
        lines.push(`syntax = "proto3";`);

        if (packageName) lines.push(`package ${packageName};`);

        if (includesGoogleAny)
            lines.push('import "google/protobuf/any.proto";');

        lines.push('');

        lines.push(`message ${contract.controllerName} {`);

        contract.fields.forEach((field: any, index: number) => {
            const protoType = this.mapToProtoType(field.protoType);
            const repeatedPrefix = field.protoRepeated ? 'repeated ' : '';
            lines.push(
                `   ${repeatedPrefix}${protoType} ${field.propertyKey} = ${index + 1};`,
            );
        });

        lines.push(`}`);

        if (!contract.directMessage) {
            lines.push('');
            lines.push(`message ${contract.controllerName}List {`);
            lines.push(`    repeated ${contract.controllerName} items = 1;`);
            lines.push(`}`);

            lines.push('');
            lines.push(`message Add${contract.controllerName}Request {`);
            lines.push(`    ${contract.controllerName} item = 1;`);
            lines.push(`}`);
            lines.push(`message Add${contract.controllerName}Response {`);
            lines.push(`    string id = 1;`);
            lines.push(`    ${contract.controllerName} item = 2;`);
            lines.push(`}`);

            lines.push('');
            lines.push(`message Update${contract.controllerName}Request {`);
            lines.push(`    string id = 1;`);
            lines.push(`    ${contract.controllerName} item = 2;`);
            lines.push(`}`);
            lines.push(`message Update${contract.controllerName}Response {`);
            lines.push(`    string id = 1;`);
            lines.push(`    ${contract.controllerName} item = 2;`);
            lines.push(`}`);

            lines.push('');
            lines.push(`message Delete${contract.controllerName}Request {`);
            lines.push(`    string id = 1;`);
            lines.push(`}`);
            lines.push(`message Delete${contract.controllerName}Response {`);
            lines.push(`    bool success = 1;`);
            lines.push(`    int32 affected = 2;`);
            lines.push(`    string id = 3;`);
            lines.push(`}`);

            lines.push('');
            lines.push(`message GetAll${contract.controllerName}Request {}`);
            lines.push(`message GetAll${contract.controllerName}Response {`);
            lines.push(`    ${contract.controllerName}List items = 1;`);
            lines.push(`}`);

            lines.push('');
            lines.push(`service ${contract.controllerName}Service {`);
            lines.push(
                `   rpc Add${contract.controllerName} (Add${contract.controllerName}Request) returns (Add${contract.controllerName}Response);`,
            );
            lines.push(
                `   rpc Update${contract.controllerName} (Update${contract.controllerName}Request) returns (Update${contract.controllerName}Response);`,
            );
            lines.push(
                `   rpc Delete${contract.controllerName} (Delete${contract.controllerName}Request) returns (Delete${contract.controllerName}Response);`,
            );
            lines.push(
                `   rpc GetAll${contract.controllerName} (GetAll${contract.controllerName}Request) returns (GetAll${contract.controllerName}Response);`,
            );
            lines.push(`}`);
        }

        if (contract.customProto && typeof contract.customProto === 'function')
            lines.push(contract.customProto());

        return lines.join('\n');
    }

    private generateTypes(contract: any): string {
        const lines: string[] = [];

        lines.push(`// Generated automatically by CMMV\n`);
        lines.push(`export namespace ${contract.controllerName} {`);

        contract.fields.forEach((field: any) => {
            const tsType = this.mapToTsType(field.protoType);
            lines.push(`    export type ${field.propertyKey} = ${tsType};`);
        });

        lines.push(`}`);
        lines.push('');

        if (!contract.directMessage) {
            lines.push(
                `export interface Add${contract.controllerName}Request {`,
            );
            lines.push(`    item: ${contract.controllerName};`);
            lines.push(`}`);
            lines.push('');
            lines.push(
                `export interface Add${contract.controllerName}Response {`,
            );
            lines.push(`    item: ${contract.controllerName};`);
            lines.push(`}`);
            lines.push('');

            lines.push(
                `export interface Update${contract.controllerName}Request {`,
            );
            lines.push(`    id: string;`);
            lines.push(`    item: ${contract.controllerName};`);
            lines.push(`}`);
            lines.push('');
            lines.push(
                `export interface Update${contract.controllerName}Response {`,
            );
            lines.push(`    item: ${contract.controllerName};`);
            lines.push(`}`);
            lines.push('');

            lines.push(
                `export interface Delete${contract.controllerName}Request {`,
            );
            lines.push(`    id: string;`);
            lines.push(`}`);
            lines.push('');
            lines.push(
                `export interface Delete${contract.controllerName}Response {`,
            );
            lines.push(`    success: boolean;`);
            lines.push(`    affected: number;`);
            lines.push(`    id: string;`);
            lines.push(`}`);
            lines.push('');

            lines.push(
                `export interface GetAll${contract.controllerName}Request {}`,
            );
            lines.push('');
            lines.push(
                `export interface GetAll${contract.controllerName}Response {`,
            );
            lines.push(`    items: ${contract.controllerName}[];`);
            lines.push(`}`);
            lines.push('');
        }

        if (contract.customTypes && typeof contract.customTypes === 'function')
            lines.push(contract.customTypes());

        return lines.join('\n');
    }

    private async generateContractsJs(
        contractsJson: {
            [key: string]: any;
        },
        returnResult: boolean = false,
    ): Promise<void | string> {
        const outputDirectory = path.resolve('public/core');

        if (!fs.existsSync(outputDirectory))
            fs.mkdirSync(outputDirectory, { recursive: true });

        const outputFile = path.resolve('public/core/contracts.min.js');

        await ProtoRegistry.load();
        const contracts = ProtoRegistry.retrieveAll();
        const contractsJSON = {};
        const index = {};
        let pointer = 0;

        for (const key in contracts) {
            const contract = ProtoRegistry.retrieve(key);
            const jsonProtoFile = path.resolve(`src/protos/${key}.json`);
            contractsJSON[key] = contract.toJSON();

            fs.writeFileSync(
                jsonProtoFile,
                JSON.stringify(contractsJSON[key], null, 4),
            );

            const types = {};
            let pointerTypes = 0;

            for (const namespace of contract.nestedArray) {
                for (const type in namespace.toJSON().nested) {
                    types[type] = pointerTypes;
                    pointerTypes++;
                }
            }

            index[key] = { index: pointer, types };
            pointer++;
        }

        const data = {
            index,
            contracts: contractsJSON,
        };

        if (returnResult) {
            return JSON.stringify(data);
        } else {
            let jsContent = '// Generated automatically by CMMV\n';
            jsContent += '(function(global) {\n';
            jsContent += '  try {\n';
            jsContent +=
                '    global.cmmv.addContracts(' + JSON.stringify(data) + ');\n';
            jsContent += '  } catch (e) {\n';
            jsContent += '    console.error("Error loading contracts:", e);\n';
            jsContent += '  }\n';
            jsContent +=
                '})(typeof window !== "undefined" ? window : global);\n';

            const minifiedJsContent = UglifyJS.minify(jsContent).code;

            fs.writeFileSync(outputFile, minifiedJsContent, 'utf8');
        }
    }

    public async returnContractJs(): Promise<string> {
        const contracts = Scope.getArray<any>('__contracts');
        const contractsJson: { [key: string]: any } = {};

        contracts?.forEach((contract: any) => {
            const root = new protobufjs.Root();
            const protoNamespace = root.define(contract.controllerName);

            const itemMessage = new protobufjs.Type(
                contract.controllerName,
            ).add(new protobufjs.Field('id', 1, 'int32'));

            contract.fields.forEach((field: any, index: number) => {
                const protoType = this.mapToProtoType(field.protoType);
                itemMessage.add(
                    new protobufjs.Field(
                        field.propertyKey,
                        index + 2,
                        protoType,
                    ),
                );
            });

            protoNamespace.add(itemMessage);
            const contractJSON = root.toJSON();
            contractsJson[contract.controllerName] = contractJSON;
        });

        const parseContract = await this.generateContractsJs(
            contractsJson,
            true,
        );
        return typeof parseContract == 'string' ? parseContract : '';
    }

    private mapToProtoType(type: string): string {
        const typeMapping: { [key: string]: string } = {
            string: 'string',
            boolean: 'bool',
            bool: 'bool',
            int: 'int32',
            int32: 'int32',
            int64: 'int64',
            float: 'float',
            double: 'double',
            bytes: 'bytes',
            date: 'string',
            timestamp: 'string',
            text: 'string',
            json: 'string',
            jsonb: 'string',
            uuid: 'string',
            time: 'string',
            simpleArray: 'string',
            simpleJson: 'string',
            bigint: 'int64',
            uint32: 'uint32',
            uint64: 'uint64',
            sint32: 'sint32',
            sint64: 'sint64',
            fixed32: 'fixed32',
            fixed64: 'fixed64',
            sfixed32: 'sfixed32',
            sfixed64: 'sfixed64',
            any: 'google.protobuf.Any',
        };

        return typeMapping[type] || 'string';
    }

    private mapToTsType(protoType: string): string {
        const typeMapping: { [key: string]: string } = {
            string: 'string',
            boolean: 'boolean',
            bool: 'boolean',
            int: 'number',
            int32: 'number',
            int64: 'number',
            float: 'number',
            double: 'number',
            bytes: 'Uint8Array',
            date: 'string',
            timestamp: 'string',
            text: 'string',
            json: 'any',
            jsonb: 'any',
            uuid: 'string',
            time: 'string',
            simpleArray: 'string[]',
            simpleJson: 'any',
            bigint: 'bigint',
            uint32: 'number',
            uint64: 'number',
            sint32: 'number',
            sint64: 'number',
            fixed32: 'number',
            fixed64: 'number',
            sfixed32: 'number',
            sfixed64: 'number',
            any: 'any',
        };

        return typeMapping[protoType] || 'any';
    }
}
