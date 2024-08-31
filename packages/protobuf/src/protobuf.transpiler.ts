import * as fs from 'fs';
import * as path from 'path';
import * as protobufjs from 'protobufjs';
import * as UglifyJS from 'uglify-js';

import { GlobalProto } from './protobuf.services';

import { ITranspile, Logger, Scope } from "@cmmv/core";

export class ProtobufTranspile implements ITranspile {
    private logger: Logger = new Logger('ProtobufTranspile');

    run(): void {
        const contracts = Scope.getArray<any>("__contracts");

        const contractsJson: { [key: string]: any } = {};

        contracts.forEach((contract: any) => {
            const outputPath = path.resolve(contract.protoPath);
            const outputPathJson = outputPath.replace('.proto', '.json');
            const outputDir = path.dirname(outputPath);           
            
            if (!fs.existsSync(outputDir)) {
                fs.mkdirSync(outputDir, { recursive: true });
                this.logger.log(`Created directory ${outputDir}`);
            }

            const root = new protobufjs.Root();
            const protoNamespace = root.define(contract.controllerName);

            const itemMessage = new protobufjs.Type(contract.controllerName)
                .add(new protobufjs.Field("id", 1, "int32"));

            contract.fields.forEach((field: any, index: number) => {
                const protoType = this.mapToProtoType(field.protoType);
                itemMessage.add(new protobufjs.Field(field.propertyKey, index + 2, protoType));
            });

            protoNamespace.add(itemMessage);

            if (!contract.directMessage) {
                const listMessage = new protobufjs.Type(`${contract.controllerName}List`)
                    .add(new protobufjs.Field("items", 1, `${contract.controllerName}`, "repeated"));

                protoNamespace.add(listMessage);
            }

            const protoContent = this.generateProtoContent(contract);
            fs.writeFileSync(outputPath, protoContent, 'utf8');
            //this.logger.log(`Generated .proto file for ${contract.controllerName} at ${outputPath}`);

            const contractJSON = root.toJSON();
            contractsJson[contract.controllerName] = contractJSON;
            fs.writeFileSync(outputPathJson, JSON.stringify(contractJSON), 'utf8');
            //this.logger.log(`Generated JSON file for ${contract.controllerName} at ${outputPathJson}`);
        });

        this.generateContractsJs(contractsJson);
    }

    private generateProtoContent(contract: any): string {
        const packageName = contract.protoPackage || null;
        const lines: string[] = [];
        let includesGoogleAny = false;
    
        contract.fields.forEach((field: any) => {
            if (field.protoType === 'any') 
                includesGoogleAny = true;        
        });
    
        lines.push('// Generated automatically by CMMV');
        lines.push(`syntax = "proto3";`);
    
        if (packageName)
            lines.push(`package ${packageName};`);
    
        if (includesGoogleAny) 
            lines.push('import "google/protobuf/any.proto";');
            
        lines.push('');
    
        // Gerando a mensagem principal
        lines.push(`message ${contract.controllerName} {`);
    
        contract.fields.forEach((field: any, index: number) => {
            const protoType = this.mapToProtoType(field.protoType);
            const repeatedPrefix = field.protoRepeated ? 'repeated ' : '';
            lines.push(`  ${repeatedPrefix}${protoType} ${field.propertyKey} = ${index + 1};`);
        });
    
        lines.push(`}`);
    
        // Gerando a lista de mensagens
        if (!contract.directMessage) {
            lines.push('');
            lines.push(`message ${contract.controllerName}List {`);
            lines.push(`  repeated ${contract.controllerName} items = 1;`);
            lines.push(`}`);
        }
    
        // Gerando mensagens para operações CRUD
        lines.push('');
        lines.push(`message Add${contract.controllerName}Request {`);
        lines.push(`  ${contract.controllerName} item = 1;`);
        lines.push(`}`);
        lines.push(`message Add${contract.controllerName}Response {`);
        lines.push(`  ${contract.controllerName} item = 1;`);
        lines.push(`}`);
        
        lines.push('');
        lines.push(`message Update${contract.controllerName}Request {`);
        lines.push(`  string id = 1;`); // ID do registro a ser alterado
        lines.push(`  ${contract.controllerName} item = 2;`);
        lines.push(`}`);
        lines.push(`message Update${contract.controllerName}Response {`);
        lines.push(`  ${contract.controllerName} item = 1;`);
        lines.push(`}`);
    
        lines.push('');
        lines.push(`message Delete${contract.controllerName}Request {`);
        lines.push(`  string id = 1;`);
        lines.push(`}`);
        lines.push(`message Delete${contract.controllerName}Response {`);
        lines.push(`  bool success = 1;`);
        lines.push(`}`);
    
        lines.push('');
        lines.push(`message GetAll${contract.controllerName}Request {}`);
        lines.push(`message GetAll${contract.controllerName}Response {`);
        lines.push(`  ${contract.controllerName}List items = 1;`);
        lines.push(`}`);
    
        // Gerando o serviço CRUD
        lines.push('');
        lines.push(`service ${contract.controllerName}Service {`);
        lines.push(`  rpc Add${contract.controllerName} (Add${contract.controllerName}Request) returns (Add${contract.controllerName}Response);`);
        lines.push(`  rpc Update${contract.controllerName} (Update${contract.controllerName}Request) returns (Update${contract.controllerName}Response);`);
        lines.push(`  rpc Delete${contract.controllerName} (Delete${contract.controllerName}Request) returns (Delete${contract.controllerName}Response);`);
        lines.push(`  rpc GetAll${contract.controllerName} (GetAll${contract.controllerName}Request) returns (GetAll${contract.controllerName}Response);`);
        lines.push(`}`);
    
        return lines.join('\n');
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
            any: 'google.protobuf.Any'
        };
    
        return typeMapping[type] || 'string';
    }   

    private async generateContractsJs(contractsJson: { [key: string]: any }): Promise<void> {
        const outputFile = path.resolve('public/core/contracts.min.js');
    
        await GlobalProto.load();
        const contracts = GlobalProto.retrieveAll();
        let contractsJSON = {};
        let index = {};
        let pointer = 0;

        for(let key in contracts){
            const contract = GlobalProto.retrieve(key);
            contractsJSON[key] = contract.toJSON();
            let types = {};
            let pointerTypes = 0;

            for(let namespace of contract.nestedArray){
                for(let type in namespace.toJSON().nested){
                    types[type] = pointerTypes;   
                    pointerTypes++;
                }                                 
            }
            
            index[key] = { index: pointer, types };
            pointer++;
        }

        const data = {
            index,
            contracts: contractsJSON
        };
    
        let jsContent = '// Generated automatically by CMMV\n';
        jsContent += '(function(global) {\n';
        jsContent += '  try {\n';
        jsContent += '    global.cmmv.addContracts(' + JSON.stringify(data) + ');\n';
        jsContent += '  } catch (e) {\n';
        jsContent += '    console.error("Error loading contracts:", e);\n';
        jsContent += '  }\n';
        jsContent += '})(typeof window !== "undefined" ? window : global);\n';
    
        const minifiedJsContent = UglifyJS.minify(jsContent).code;
    
        fs.writeFileSync(outputFile, minifiedJsContent, 'utf8');
        //this.logger.log(`Generated public contracts JS file at ${outputFile}`);
    }    
}
