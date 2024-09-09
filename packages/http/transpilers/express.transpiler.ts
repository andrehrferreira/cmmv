import * as fs from 'fs';
import * as path from 'path';

import { Application, ITranspile, Logger, Scope } from '@cmmv/core';

export class ExpressTranspile implements ITranspile {
    private logger: Logger = new Logger('ExpressTranspile');

    run(): void {
        const contracts = Scope.getArray<any>('__contracts');
        const controllers = [];
        const providers = [];

        contracts?.forEach((contract: any) => {
            if (contract.generateController) {
                this.generateModel(contract);
                this.generateService(contract);
                this.generateController(contract);
                controllers.push(`${contract.controllerName}Controller`);
                providers.push(`${contract.controllerName}Service`);
            }
        });

        this.generateModule(controllers, providers);
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
}
`;

        const dirname = path.resolve(outputDir, '../models');

        if (!fs.existsSync(dirname)) fs.mkdirSync(dirname, { recursive: true });

        const outputFilePath = path.join(outputDir, '../models', modelFileName);
        fs.writeFileSync(outputFilePath, modelTemplate, 'utf8');
    }

    private generateService(contract: any): void {
        const outputPath = path.resolve(contract.protoPath);
        const outputDir = path.dirname(outputPath);
        const serviceName = `${contract.controllerName}Service`;
        const modelName = `${contract.controllerName}`;
        const modelInterfaceName = `I${modelName}`;
        const serviceFileName = `${contract.controllerName.toLowerCase()}.service.ts`;

        const serviceTemplate = `// Generated automatically by CMMV

import { validate } from 'class-validator';
import { instanceToPlain, plainToClass } from 'class-transformer';
import { AbstractService, Service } from '@cmmv/core';
import { ${modelName}, ${modelInterfaceName} } from '../models/${modelName.toLowerCase()}.model';

@Service("${contract.controllerName.toLowerCase()}")
export class ${serviceName} extends AbstractService {
    public override name = "${contract.controllerName.toLowerCase()}";
    private items: ${modelName}[] = [];

    async getAll(queries?: any, req?: any): Promise<${modelName}[]> {
        return this.items;
    }

    async getById(id: string, req?: any): Promise<${modelName}> {
        const item = this.items.find(i => i.id === id);

        if (item) 
            return item;
        
        throw new Error('Item not found');
    }

    async add(item: ${modelInterfaceName}, req?: any): Promise<${modelName}> {
        return new Promise((resolve, reject) => {
            item['id'] = this.items.length + 1;

            const newItem = plainToClass(${modelName}, item, { 
                excludeExtraneousValues: true 
            });

            validate(newItem, { skipMissingProperties: true }).then(err => {
                if(!err){
                    this.items.push(newItem);
                    resolve(newItem);
                }
                else{
                    reject(err);
                }
            });            
        });
    }

    async update(id: string, item: ${modelInterfaceName}, req?: any): Promise<${modelName}> {
        return new Promise((resolve, reject) => {
            const index = this.items.findIndex(i => i.id === parseInt(id));

            if (index !== -1){
                let itemRaw = instanceToPlain(this.items[index]);
                let updateItem = { ...itemRaw, ...item };

                const editedItem = plainToClass(${modelName}, updateItem, { 
                    excludeExtraneousValues: true 
                });
                
                validate(editedItem, { skipMissingProperties: true }).then(err => {
                    if(!err){
                        this.items[index] = editedItem;
                        resolve(editedItem);
                    } 
                    else reject(err);
                }); 
            }
            else{
                reject('Item not found');
            }                        
        });
    }

    async delete(id: string, req?: any): Promise<{ success: boolean, affected: number }> {
        const index = this.items.findIndex(i => i.id === parseInt(id));

        if (index !== -1) {
            this.items.splice(index, 1);
            return { success: true, affected: 1 };
        }
                    
        throw new Error('Item not found');
    }
}`;

        const dirname = path.resolve(outputDir, '../services');

        if (!fs.existsSync(dirname)) fs.mkdirSync(dirname, { recursive: true });

        const outputFilePath = path.join(
            outputDir,
            '../services',
            serviceFileName,
        );

        fs.writeFileSync(outputFilePath, serviceTemplate, 'utf8');
    }

    private generateController(contract: any): void {
        const outputPath = path.resolve(contract.protoPath);
        const outputDir = path.dirname(outputPath);
        const controllerName = `${contract.controllerName}Controller`;
        const serviceName = `${contract.controllerName}Service`;
        const controllerFileName = `${contract.controllerName.toLowerCase()}.controller.ts`;

        const hasCache =
            contract.cache !== undefined && contract.cache !== null;
        const cacheKeyPrefix = hasCache
            ? contract.cache.key || `${contract.controllerName.toLowerCase()}:`
            : '';
        const cacheTtl = hasCache ? contract.cache.ttl || 300 : 0;
        const cacheCompress =
            hasCache && contract.cache.compress ? 'true' : 'false';

        const controllerTemplate = `// Generated automatically by CMMV

import { Telemetry } from "@cmmv/core";
import { Controller, Get, Post, Put, Delete, Queries, Param, Body, Request } from '@cmmv/http';
import { ${serviceName} } from '../services/${contract.controllerName.toLowerCase()}.service';
import { ${contract.controllerName} } from '../models/${contract.controllerName.toLowerCase()}.model';
${hasCache ? `import { Cache, CacheService } from "@cmmv/cache";` : ''}

@Controller('${contract.controllerName.toLowerCase()}')
export class ${controllerName} {
    constructor(private readonly ${serviceName.toLowerCase()}: ${serviceName}) {}

    @Get()
    ${hasCache ? `@Cache("${cacheKeyPrefix}getAll", { ttl: ${cacheTtl}, compress: ${cacheCompress} })` : ''}
    async getAll(@Queries() queries: any, @Request() req): Promise<${contract.controllerName}[]> {
        Telemetry.start('${controllerName}::GetAll', req.requestId);
        let result = await this.${serviceName.toLowerCase()}.getAll(queries, req);
        Telemetry.end('${controllerName}::GetAll', req.requestId);
        return result;
    }

    @Get(':id')
    ${hasCache ? `@Cache("${cacheKeyPrefix}{id}", { ttl: ${cacheTtl}, compress: ${cacheCompress} })` : ''}
    async getById(@Param('id') id: string, @Request() req): Promise<${contract.controllerName}> {
        Telemetry.start('${controllerName}::GetById', req.requestId);
        let result = await this.${serviceName.toLowerCase()}.getById(id, req);
        Telemetry.end('${controllerName}::GetById', req.requestId);
        return result;
    }

    @Post()
    async add(@Body() item: ${contract.controllerName}, @Request() req): Promise<${contract.controllerName}> {
        Telemetry.start('${controllerName}::Add', req.requestId);
        let result = await this.${serviceName.toLowerCase()}.add(item, req);
        ${hasCache ? `CacheService.set(\`${cacheKeyPrefix}\${result.id}\`, JSON.stringify(result), ${cacheTtl});` : ''}
        ${hasCache ? `CacheService.del("${cacheKeyPrefix}getAll");` : ''}
        Telemetry.end('${controllerName}::Add', req.requestId);
        return result;
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() item: ${contract.controllerName}, @Request() req): Promise<${contract.controllerName}> {
        Telemetry.start('${controllerName}::Update', req.requestId);
        let result = await this.${serviceName.toLowerCase()}.update(id, item, req);
        ${hasCache ? `CacheService.set(\`${cacheKeyPrefix}\${result.id}\`, JSON.stringify(result), ${cacheTtl});` : ''}
        ${hasCache ? `CacheService.del("${cacheKeyPrefix}getAll");` : ''}
        Telemetry.end('${controllerName}::Update', req.requestId);
        return result;
    }

    @Delete(':id')
    async delete(@Param('id') id: string, @Request() req): Promise<{ success: boolean, affected: number }> {
        Telemetry.start('${controllerName}::Delete', req.requestId);
        let result = await this.${serviceName.toLowerCase()}.delete(id, req);
        ${hasCache ? `CacheService.del(\`${cacheKeyPrefix}\${id}\`);` : ''}
        ${hasCache ? `CacheService.del("${cacheKeyPrefix}getAll");` : ''}
        Telemetry.end('${controllerName}::Delete', req.requestId);
        return result;
    }
}
`;
        const dirname = path.resolve(outputDir, '../controllers');

        if (!fs.existsSync(dirname)) fs.mkdirSync(dirname, { recursive: true });

        const outputFilePath = path.join(
            outputDir,
            '../controllers',
            controllerFileName,
        );
        fs.writeFileSync(outputFilePath, controllerTemplate, 'utf8');
    }

    private generateModule(controllers: string[], providers: string[]): void {
        Application.appModule.controllers = [
            ...Application.appModule.controllers,
            ...controllers.map(name => {
                return {
                    name,
                    path: `./controllers/${name.replace('Controller', '').toLowerCase()}.controller`,
                };
            }),
        ];

        Application.appModule.providers = [
            ...Application.appModule.providers,
            ...providers.map(name => {
                return {
                    name,
                    path: `./services/${name.replace('Service', '').toLowerCase()}.service`,
                };
            }),
        ];
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
