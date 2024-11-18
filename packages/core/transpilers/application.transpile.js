"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApplicationTranspile = void 0;
const fs = require("fs");
const path = require("path");
const lib_1 = require("../lib");
class ApplicationTranspile {
    constructor() {
        this.logger = new lib_1.Logger('ExpressTranspile');
    }
    run() {
        const contracts = lib_1.Scope.getArray('__contracts');
        contracts?.forEach((contract) => this.generateModel(contract));
    }
    generateModel(contract) {
        const outputPath = path.resolve(contract.protoPath);
        const outputDir = path.dirname(outputPath);
        const modelName = `${contract.controllerName}`;
        const modelInterfaceName = `I${modelName}`;
        const modelFileName = `${modelName.toLowerCase()}.model.ts`;
        const modelTemplate = `// Generated automatically by CMMV

${this.generateClassImports(contract)}
        
export interface ${modelInterfaceName} {
    ${lib_1.Config.get('repository.type') === 'mongodb' ? '_id?: any' : 'id?: any'};
${contract.fields?.map((field) => `    ${field.propertyKey}: ${this.mapToTsType(field.protoType)};`).join('\n')}
}

export class ${modelName} implements ${modelInterfaceName} {
    @Transform(({ value }) => value !== undefined ? value : null, { toClassOnly: true })
    ${lib_1.Config.get('repository.type') === 'mongodb' ? '_id?: any' : 'id?: any'};

${contract.fields?.map((field) => this.generateClassField(field)).join('\n\n')}

    constructor(partial: Partial<${modelName}>) {
        Object.assign(this, partial);
    }
}

// Schema for fast-json-stringify
export const ${modelName}Schema = fastJson({
    title: '${modelName} Schema',
    type: 'object',
    properties: {
${contract.fields?.map((field) => `        ${field.propertyKey}: ${this.generateJsonSchemaField(field)}`).join(',\n')}
    },
    required: [${contract.fields
            .filter((field) => field.required)
            .map((field) => `"${field.propertyKey}"`)
            .join(', ')}]
});
`;
        const dirname = path.resolve(outputDir, '../models');
        if (!fs.existsSync(dirname))
            fs.mkdirSync(dirname, { recursive: true });
        const outputFilePath = path.join(outputDir, '../models', modelFileName);
        fs.writeFileSync(outputFilePath, modelTemplate, 'utf8');
    }
    generateClassImports(contract) {
        const importStatements = [
            `import * as fastJson from 'fast-json-stringify';`,
            `import { Expose, Transform } from 'class-transformer';`,
        ];
        const hasExclude = contract.fields?.some((field) => field.exclude || field.toClassOnly);
        const hasTransform = contract.fields?.some((field) => field.transform);
        if (hasExclude || hasTransform) {
            const imports = [];
            if (hasExclude)
                imports.push('Exclude');
            if (hasTransform)
                imports.push('Transform');
            importStatements.push(`import { ${imports.join(', ')} } from 'class-transformer';`);
        }
        const validationImports = new Set();
        contract.fields?.forEach((field) => {
            if (field.validations) {
                field.validations?.forEach((validation) => {
                    const validationName = Array.isArray(validation.type)
                        ? validation.type[0]
                        : validation.type;
                    validationImports.add(validationName);
                });
            }
        });
        if (validationImports.size > 0) {
            importStatements.push(`import { ${Array.from(validationImports).join(', ')} } from 'class-validator';`);
        }
        if (contract.imports && contract.imports.length > 0) {
            for (const module of contract.imports)
                importStatements.push(`import * as ${module} from '${module}';`);
        }
        return importStatements.length > 0 ? importStatements.join('\n') : '';
    }
    generateClassField(field) {
        const decorators = [];
        if (field.exclude && field.toClassOnly) {
            decorators.push(`    @Exclude(${field.toClassOnly ? `{ toClassOnly: true }` : ''})`);
        }
        else {
            decorators.push(`    @Expose()`);
        }
        if (field.transform) {
            const cleanedTransform = field.transform
                .toString()
                .replace(/_([a-zA-Z]+)/g, ' $1');
            decorators.push(`    @Transform(${cleanedTransform}${field.toClassOnly ? `, { toClassOnly: true }` : ''})`);
        }
        if (field.validations) {
            field.validations?.forEach((validation) => {
                const validationName = Array.isArray(validation.type)
                    ? validation.type[0]
                    : validation.type;
                const validationParams = Array.isArray(validation.type)
                    ? validation.type
                        .slice(1)
                        .map(param => JSON.stringify(param))
                        .join(', ')
                    : validation.value !== undefined
                        ? validation.value
                        : '';
                const options = [];
                if (validation.message) {
                    options.push(`message: "${validation.message}"`);
                }
                if (validation.context) {
                    const contextString = JSON.stringify(validation.context).replace(/"([^"]+)":/g, '$1:');
                    options.push(`context: ${contextString}`);
                }
                let optionsString = options.length > 0 ? `{ ${options.join(', ')} }` : '';
                if (validationParams && optionsString)
                    optionsString = ', ' + optionsString;
                decorators.push(`    @${validationName}(${validationParams}${optionsString ? optionsString : ''})`);
            });
        }
        let defaultValueString = '';
        if (field.defaultValue !== undefined) {
            const defaultValue = typeof field.defaultValue === 'string'
                ? `"${field.defaultValue}"`
                : field.defaultValue;
            defaultValueString = ` = ${defaultValue};`;
        }
        return `${decorators.length > 0 ? decorators.join('\n') + '\n' : ''}    ${field.propertyKey}: ${this.mapToTsType(field.protoType)}${defaultValueString}`;
    }
    mapToTsType(protoType) {
        const typeMapping = {
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
    generateJsonSchemaField(field) {
        const parts = [`type: "${this.mapToJsonSchemaType(field.protoType)}"`];
        if (field.defaultValue !== undefined) {
            parts.push(`default: ${JSON.stringify(field.defaultValue)}`);
        }
        if (field.description) {
            parts.push(`description: "${field.description}"`);
        }
        return `{ ${parts.join(', ')} }`;
    }
    mapToJsonSchemaType(protoType) {
        const typeMapping = {
            string: 'string',
            boolean: 'boolean',
            bool: 'boolean',
            int: 'integer',
            int32: 'integer',
            int64: 'integer',
            float: 'number',
            double: 'number',
            bytes: 'string',
            date: 'string',
            timestamp: 'string',
            text: 'string',
            json: 'object',
            jsonb: 'object',
            uuid: 'string',
            time: 'string',
            simpleArray: 'array',
            simpleJson: 'object',
            bigint: 'integer',
            uint32: 'integer',
            uint64: 'integer',
            sint32: 'integer',
            sint64: 'integer',
            fixed32: 'integer',
            fixed64: 'integer',
            sfixed32: 'integer',
            sfixed64: 'integer',
            any: 'any',
        };
        return typeMapping[protoType] || 'any';
    }
}
exports.ApplicationTranspile = ApplicationTranspile;
