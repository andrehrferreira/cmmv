import * as fs from 'node:fs';
import * as path from 'node:path';
import * as protobufjs from 'protobufjs';
import * as UglifyJS from 'uglify-js';

import { ProtoRegistry } from './protobuf.registry';

import {
    AbstractTranspile,
    ITranspile,
    Logger,
    Scope,
    IContract,
    CONTROLLER_NAME_METADATA,
} from '@cmmv/core';

export class ProtobufTranspile extends AbstractTranspile implements ITranspile {
    private logger: Logger = new Logger('ProtobufTranspile');
    private imports: Set<string> = new Set();

    run(): void {
        const contracts = Scope.getArray<any>('__contracts');
        const contractsJson: { [key: string]: any } = {};

        contracts?.forEach((contract: any) => {
            let root = new protobufjs.Root();
            const protoNamespace = root.define(contract.controllerName);

            const itemMessage = new protobufjs.Type(
                contract.controllerName,
            ).add(new protobufjs.Field('id', 1, 'int32'));

            contract.fields.forEach((field: any, index: number) => {
                let protoType = this.mapToProtoType(field.protoType);
                let fieldType = protoType;

                itemMessage.add(
                    new protobufjs.Field(
                        field.propertyKey,
                        index + 2,
                        fieldType,
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

            const outputDir = path.resolve(
                this.getRootPath(contract, 'protos'),
            );
            const protoFileName = `${contract.controllerName.toLowerCase()}.proto`;
            const outputFilePath = path.join(outputDir, protoFileName);
            const protoContent = this.generateProtoContent(
                contract,
                outputFilePath,
            );
            fs.writeFileSync(
                outputFilePath,
                this.removeExtraSpaces(protoContent),
                'utf8',
            );

            //Types
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

            const tsContent = this.generateTypes(contract, outputFilePath);
            const outputPathTs = outputFilePath.replace('.proto', '.d.ts');
            fs.writeFileSync(outputPathTs, tsContent, 'utf8');

            //JSON
            const contractJSON = root.toJSON();
            contractsJson[contract.controllerName.toLocaleLowerCase()] = {
                content: contractJSON,
                path: outputFilePath.replace('.proto', '.json'),
            };
        });

        this.generateContractsJs(contractsJson);
    }

    private generateProtoContent(
        contract: IContract,
        outputFilePath: string,
    ): string {
        const packageName = contract.protoPackage || null;
        const lines: string[] = [];
        let includesGoogleAny = false;
        this.clearImports();

        contract.fields.forEach((field: any) => {
            if (field.protoType === 'any') includesGoogleAny = true;
        });

        lines.push(`/**                                                                               
    **********************************************
    This script was generated automatically by CMMV.
    It is recommended not to modify this file manually, 
    as it may be overwritten by the application.
    **********************************************
**/\n`);
        lines.push(`syntax = "proto3";`);

        if (packageName) lines.push(`package ${packageName};`);

        if (includesGoogleAny)
            lines.push('import "google/protobuf/any.proto";');

        lines.push('');

        this.imports.forEach(importStatement => {
            lines.push(importStatement);
        });

        contract.fields.forEach((field: any, index: number) => {
            if (field.link) {
                field.link.forEach((link: any) => {
                    const contractInstance = new link.contract();
                    const controllerName = Reflect.getMetadata(
                        CONTROLLER_NAME_METADATA,
                        contractInstance.constructor,
                    );

                    const entityName = controllerName;
                    const importPath = this.getImportPathRelative(
                        contractInstance,
                        contract,
                        'protos',
                        `${entityName.toLowerCase()}.proto`,
                        outputFilePath,
                    );

                    if (importPath) {
                        const linkedEntityImport = `import \"${importPath}\";`;
                        lines.push(linkedEntityImport);
                    }
                });
            }
        });

        lines.push('');

        lines.push(`message ${contract.controllerName} {`);

        contract.fields.forEach((field: any, index: number) => {
            let protoType = this.mapToProtoType(field.protoType);
            let fieldType = protoType;

            if (field.link) {
                field.link.forEach((link: any) => {
                    const contractInstance = new link.contract();
                    const controllerName = Reflect.getMetadata(
                        CONTROLLER_NAME_METADATA,
                        contractInstance.constructor,
                    );
                    const entityName = controllerName;
                    fieldType = entityName;
                });
            }

            const repeatedPrefix = field.protoRepeated ? 'repeated ' : '';
            lines.push(
                `   ${repeatedPrefix}${fieldType} ${field.propertyKey} = ${index + 1};`,
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
            lines.push('');
            lines.push(`message Add${contract.controllerName}Response {`);
            lines.push(`    string id = 1;`);
            lines.push(`    ${contract.controllerName} item = 2;`);
            lines.push(`}`);

            lines.push('');
            lines.push(`message Update${contract.controllerName}Request {`);
            lines.push(`    string id = 1;`);
            lines.push(`    ${contract.controllerName} item = 2;`);
            lines.push(`}`);
            lines.push('');
            lines.push(`message Update${contract.controllerName}Response {`);
            lines.push(`    bool success = 1;`);
            lines.push(`    int32 affected = 2;`);
            lines.push(`}`);

            lines.push('');
            lines.push(`message Delete${contract.controllerName}Request {`);
            lines.push(`    string id = 1;`);
            lines.push(`}`);
            lines.push('');
            lines.push(`message Delete${contract.controllerName}Response {`);
            lines.push(`    bool success = 1;`);
            lines.push(`    int32 affected = 2;`);
            lines.push(`}`);

            lines.push('');
            lines.push(`message GetAll${contract.controllerName}Request {}`);
            lines.push('');
            lines.push(`message GetAll${contract.controllerName}Response {`);
            lines.push(`    ${contract.controllerName}List items = 1;`);
            lines.push(`}`);

            if (
                contract.messages &&
                Object.keys(contract.messages).length > 0
            ) {
                lines.push('');

                for (let key in contract.messages) {
                    lines.push(`message ${contract.messages[key].name} {
${Object.entries(contract.messages[key].properties)
    .map(([fieldName, field]: [string, any], index: number) => {
        const fieldType = this.mapToTsType(field.type);
        return `   ${field.required ? '' : 'optional '}${this.mapToProtoType(fieldType)} ${fieldName} = ${index + 1};`;
    })
    .join('\n')}
}\n`);
                }
            }

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

            if (
                contract.services &&
                Object.keys(contract.services).length > 0
            ) {
                for (let key in contract.services) {
                    lines.push(
                        `   rpc ${contract.services[key].name} (${contract.services[key].request}) returns (${contract.services[key].response});`,
                    );
                }
            }

            lines.push(`}`);
        } else {
            if (
                contract.messages &&
                Object.keys(contract.messages).length > 0
            ) {
                lines.push('\n// Messages');

                for (let key in contract.messages) {
                    lines.push(`message ${contract.messages[key].name} {
${Object.entries(contract.messages[key].properties)
    .map(([fieldName, field]: [string, any], index: number) => {
        const fieldType = this.mapToTsType(field.type);
        return `   ${field.required ? '' : 'optional '}${this.mapToProtoType(fieldType)} ${fieldName} = ${index + 1};`;
    })
    .join('\n\n')}
}\n`);
                }
            }

            if (
                contract.services &&
                Object.keys(contract.services).length > 0
            ) {
                lines.push(`// Services
    service ${contract.controllerName}Service {`);

                for (let key in contract.services) {
                    lines.push(
                        `   rpc ${contract.services[key].name} (${contract.services[key].request}) returns (${contract.services[key].response});`,
                    );
                }

                lines.push(`}`);
            }
        }

        if (contract.customProto && typeof contract.customProto === 'function')
            lines.push(contract.customProto());

        return lines.join('\n');
    }

    private generateTypes(contract: IContract, outputFilePath: string): string {
        const lines: string[] = [];
        this.clearImports();

        lines.push(`/**                                                                               
    **********************************************
    This script was generated automatically by CMMV.
    It is recommended not to modify this file manually, 
    as it may be overwritten by the application.
    **********************************************
**/\n`);

        contract.fields.forEach((field: any, index: number) => {
            if (field.link) {
                field.link.forEach((link: any) => {
                    const contractInstance = new link.contract();
                    const controllerName = Reflect.getMetadata(
                        CONTROLLER_NAME_METADATA,
                        contractInstance.constructor,
                    );

                    const entityName = controllerName;
                    const importPath = this.getImportPathRelative(
                        contractInstance,
                        contract,
                        'protos',
                        `${entityName.toLowerCase()}.d`,
                        outputFilePath,
                    );

                    if (importPath) {
                        const linkedEntityImport = `import { ${entityName} } from \"${importPath}\";`;
                        lines.push(linkedEntityImport);
                    }
                });
            }
        });

        lines.push('');

        lines.push(`export namespace ${contract.controllerName} {`);

        contract.fields.forEach((field: any) => {
            let tsType = this.mapToTsType(field.protoType);

            if (field.link) {
                field.link.forEach((link: any) => {
                    const contractInstance = new link.contract();
                    const controllerName = Reflect.getMetadata(
                        CONTROLLER_NAME_METADATA,
                        contractInstance.constructor,
                    );
                    const entityName = controllerName;

                    tsType = entityName;
                });
            }

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
            lines.push(`    success: boolean;`);
            lines.push(`    affected: number;`);
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
        const contractsList = {};
        const index = {};
        let pointer = 0;

        for (const key in contracts) {
            const contract = ProtoRegistry.retrieve(key);
            const jsonProtoFile = contractsJson[key].path;
            contractsList[key] = contract.toJSON();

            fs.writeFileSync(
                jsonProtoFile,
                JSON.stringify(contractsList[key], null, 4),
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
            contracts: contractsList,
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

    /*public async returnContractJs(): Promise<string> {
        const contracts = Scope.getArray<any>("__contracts");
        const contractsJson: { [key: string]: any } = {};

        contracts?.forEach((contract: any) => {
            let root = new protobufjs.Root();
            const protoNamespace = root.define(contract.controllerName);

            const itemMessage = new protobufjs.Type(
                contract.controllerName,
            ).add(new protobufjs.Field("id", 1, "int32"));

            contract.fields.forEach((field: any, index: number) => {
                let protoType = this.mapToProtoType(field.protoType);
                let fieldType = protoType;

                if (field.link) {
                    field.link.forEach((link: any) => {
                        const contractInstance = new link.contract();
                        const controllerName = Reflect.getMetadata(
                            CONTROLLER_NAME_METADATA,
                            contractInstance.constructor,
                        );

                        const entityName = controllerName;
                        const protoOutputDir = this.getRootPath(contract, "protos");
                        const importPath = path.relative(protoOutputDir, path.join(this.getRootPath(contractInstance, "protos"), `${entityName.toLowerCase()}.proto`));

                        // Only add import if there is a correlation
                        if (importPath) {
                            const linkedEntityImport = `import \"${importPath}\";`;
                            this.addImport(linkedEntityImport);
                        }

                        fieldType = entityName;
                    });
                }

                itemMessage.add(
                    new protobufjs.Field(
                        field.propertyKey,
                        index + 2,
                        fieldType,
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

        return typeof parseContract == "string" ? parseContract : "";
    }*/

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

    private clearImports(): void {
        this.imports.clear();
    }

    private addImport(importStatement: string): void {
        this.imports.add(importStatement);
    }
}
