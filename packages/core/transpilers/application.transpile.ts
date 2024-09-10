import * as fs from 'fs';
import * as path from 'path';

import { ITranspile, Logger, Scope } from '../utils';

export class ApplicationTranspile implements ITranspile {
    private logger: Logger = new Logger('ExpressTranspile');

    run(): void {
        const contracts = Scope.getArray<any>('__contracts');

        contracts?.forEach((contract: any) => {
            if (contract.generateController) {
                this.generateModel(contract);
            }
        });
    }

    private generateModel(contract: any): void {
        const outputPath = path.resolve(contract.protoPath);
        const outputDir = path.dirname(outputPath);
        const modelName = `${contract.controllerName}`;
        const modelInterfaceName = `I${modelName}`;
        const modelFileName = `${modelName.toLowerCase()}.model.ts`;

        const modelTemplate = `// Generated automatically by CMMV

${this.generateClassImports(contract)}
        
export interface ${modelInterfaceName} {
    id?: any;
${contract.fields.map((field: any) => `    ${field.propertyKey}: ${this.mapToTsType(field.protoType)};`).join('\n')}
}

export class ${modelName} implements ${modelInterfaceName} {
    id?: any;

${contract.fields.map((field: any) => this.generateClassField(field)).join('\n\n')}

    constructor(partial: Partial<${modelName}>) {
        Object.assign(this, partial);
    }
}
`;

        const dirname = path.resolve(outputDir, '../models');

        if (!fs.existsSync(dirname)) fs.mkdirSync(dirname, { recursive: true });

        const outputFilePath = path.join(outputDir, '../models', modelFileName);
        fs.writeFileSync(outputFilePath, modelTemplate, 'utf8');
    }

    private generateClassImports(contract: any): string {
        let importStatements: string[] = [];

        const hasExclude = contract.fields.some(
            (field: any) => field.exclude || field.toClassOnly,
        );

        const hasTransform = contract.fields.some(
            (field: any) => field.transform,
        );

        if (hasExclude || hasTransform) {
            let imports = [];
            if (hasExclude) imports.push('Exclude');
            if (hasTransform) imports.push('Transform');
            importStatements.push(
                `import { ${imports.join(', ')} } from 'class-transformer';`,
            );
        }

        const validationImports = new Set<string>();
        contract.fields.forEach((field: any) => {
            if (field.validations) {
                field.validations.forEach((validation: any) => {
                    const validationName = Array.isArray(validation.type)
                        ? validation.type[0]
                        : validation.type;
                    validationImports.add(validationName);
                });
            }
        });

        if (validationImports.size > 0) {
            importStatements.push(
                `import { ${Array.from(validationImports).join(', ')} } from 'class-validator';`,
            );
        }

        if (contract.imports && contract.imports.length > 0) {
            for (let module of contract.imports)
                importStatements.push(
                    `import * as ${module} from '${module}';`,
                );
        }

        return importStatements.length > 0 ? importStatements.join('\n') : '';
    }

    private generateClassField(field: any): string {
        let decorators: string[] = [];

        if (field.exclude && field.toClassOnly) {
            decorators.push(
                `    @Exclude(${field.toClassOnly ? `{ toClassOnly: true }` : ''})`,
            );
        }

        if (field.transform) {
            decorators.push(
                `    @Transform(${field.transform}${field.toClassOnly ? `, { toClassOnly: true }` : ''})`,
            );
        }

        if (field.validations) {
            field.validations.forEach((validation: any) => {
                const validationName = Array.isArray(validation.type)
                    ? validation.type[0]
                    : validation.type;
                const validationParams =
                    Array.isArray(validation.type) && validation.type.length > 1
                        ? `(${validation.type
                              .slice(1)
                              .map(param =>
                                  typeof param === 'string'
                                      ? `"${param}"`
                                      : param,
                              )
                              .join(', ')}`
                        : '(';

                const options = [];
                if (validation.message) {
                    options.push(`message: "${validation.message}"`);
                }
                if (validation.context) {
                    const contextString = JSON.stringify(
                        validation.context,
                    ).replace(/"([^"]+)":/g, '$1:');
                    options.push(`context: ${contextString}`);
                }
                const optionsString =
                    options.length > 0 ? `{ ${options.join(', ')} }` : '';

                decorators.push(
                    `    @${validationName}${validationParams}${validationParams !== '(' ? ',' : ''}${optionsString})`,
                );
            });
        }

        let defaultValueString = '';
        if (field.defaultValue !== undefined) {
            const defaultValue =
                typeof field.defaultValue === 'string'
                    ? `"${field.defaultValue}"`
                    : field.defaultValue;
            defaultValueString = ` = ${defaultValue};`;
        }

        return `${decorators.length > 0 ? decorators.join('\n') + '\n' : ''}    ${field.propertyKey}: ${this.mapToTsType(field.protoType)}${defaultValueString}`;
    }

    private mapToTsType(protoType: string): string {
        const typeMapping: { [key: string]: string } = {
            string: 'string',
            bool: 'boolean',
            int32: 'number',
            float: 'number',
            double: 'number',
            any: 'any',
        };

        return typeMapping[protoType] || 'string';
    }
}