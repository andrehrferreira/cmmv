import * as fs from 'fs';
import * as path from 'path';

import {
    Application,
    Config,
    ITranspile,
    Scope,
    AbstractTranspile,
    IContract,
} from '@cmmv/core';

export class DefaultHTTPTranspiler
    extends AbstractTranspile
    implements ITranspile
{
    run(): void {
        const contracts = Scope.getArray<any>('__contracts');
        const controllers = [];
        const providers = [];

        contracts?.forEach((contract: any) => {
            if (contract.generateController) {
                this.generateService(contract);
                this.generateController(contract);
                controllers.push({
                    name: `${contract.controllerName}Controller`,
                    subPath: contract.subPath ? contract.subPath : '',
                });
                providers.push({
                    name: `${contract.controllerName}Service`,
                    subPath: contract.subPath ? contract.subPath : '',
                });
            }
        });

        this.generateModule(controllers, providers);
    }

    private generateService(contract: IContract): void {
        const serviceName = `${contract.controllerName}Service`;
        const modelName = `${contract.controllerName}`;
        const modelInterfaceName = `I${modelName}`;
        const serviceFileNameGenerated = `${contract.controllerName.toLowerCase()}.service.generated.ts`;
        const serviceFileName = `${contract.controllerName.toLowerCase()}.service.ts`;

        let importsFromModel = [];

        contract.services
            .filter(service => service.createBoilerplate === true)
            .map(service => {
                importsFromModel.push(service.request);
                importsFromModel.push(service.response);
            });

        importsFromModel = [...new Set(importsFromModel)];

        const serviceTemplateGenerated = `/**                                                                               
    **********************************************
    This script was generated automatically by CMMV.
    It is recommended not to modify this file manually, 
    as it may be overwritten by the application.
    **********************************************
**/

import { validate } from 'class-validator';
import { instanceToPlain, plainToClass } from 'class-transformer';
import { AbstractService, Service } from '@cmmv/core';

import { 
    ${modelName}, 
    ${modelInterfaceName},${importsFromModel.join(', \n   ')}
} from "${this.getImportPath(contract, 'models', modelName.toLowerCase() + '.model')}";

export class ${serviceName}Generated extends AbstractService {
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

    ${contract.services
        .filter(service => service.createBoilerplate === true)
        .map(service => {
            return `    async ${service.name}(payload: ${service.request}): Promise<${service.response}> {
            throw new Error("Function ${service.name} not implemented");
        }`;
        })
        .join('\n\n')}
}`;

        const outputDir = this.getRootPath(contract, 'services');
        const outputFilePath = path.join(outputDir, serviceFileNameGenerated);
        fs.writeFileSync(
            outputFilePath,
            this.removeExtraSpaces(serviceTemplateGenerated),
            'utf8',
        );

        //Service
        const serviceTemplate = `import { Service } from '@cmmv/core';

import { 
    ${serviceName}Generated 
} from "./${contract.controllerName.toLowerCase()}.service.generated";

import {
   ${importsFromModel.join(', \n   ')}
} from "${this.getImportPath(contract, 'models', modelName.toLowerCase() + '.model')}";

@Service("${contract.controllerName.toLowerCase()}")
export class ${serviceName} extends ${serviceName}Generated {
${contract.services
    .filter(service => service.createBoilerplate === true)
    .map(service => {
        return `    override async ${service.functionName}(payload: ${service.request}): Promise<${service.response}> {
        throw new Error("Function ${service.functionName} not implemented");
    }`;
    })
    .join('\n\n')}
}`;

        const outputFilePathFinal = path.join(outputDir, serviceFileName);

        if (!fs.existsSync(outputFilePathFinal))
            fs.writeFileSync(
                outputFilePathFinal,
                this.removeExtraSpaces(serviceTemplate),
                'utf8',
            );
    }

    private getControllerDecorators(
        { authRouter, hasCache, contract },
        medatada?: any,
        authRole = 'get',
    ) {
        let decoracotrs = '';

        if (authRouter === true)
            decoracotrs += `\n    @Auth("${contract.controllerName.toLowerCase()}:${authRole}")`;

        if (hasCache === true)
            decoracotrs += `\n    @Cache("${medatada.cacheKeyPrefix}getAll", { ttl: ${medatada.cacheTtl}, compress: ${medatada.cacheCompress}, schema: ${contract.controllerName}FastSchema })`;

        return decoracotrs;
    }

    private generateController(contract: IContract): void {
        const telemetry = Config.get<boolean>('app.telemetry');
        const controllerName = `${contract.controllerName}Controller`;
        const serviceName = `${contract.controllerName}Service`;
        const controllerFileNameGenerated = `${contract.controllerName.toLowerCase()}.controller.generated.ts`;
        const controllerFileName = `${contract.controllerName.toLowerCase()}.controller.ts`;

        const hasCache =
            contract.cache !== undefined && contract.cache !== null;
        const authRouter = contract.auth === true;
        const cacheKeyPrefix = hasCache
            ? contract.cache.key || `${contract.controllerName.toLowerCase()}:`
            : '';
        const cacheTtl = hasCache ? contract.cache.ttl || 300 : 0;
        const cacheCompress =
            hasCache && contract.cache.compress ? 'true' : 'false';
        const controllerPath = contract.controllerCustomPath
            ? contract.controllerCustomPath
            : contract.controllerName.toLowerCase();

        let importsFromModel = [];

        contract.services.map(service => {
            importsFromModel.push(service.request);
            importsFromModel.push(service.response);
        });

        importsFromModel = [...new Set(importsFromModel)];

        let controllerTemplateGenerated = `/**                                                                               
    **********************************************
    This script was generated automatically by CMMV.
    It is recommended not to modify this file manually, 
    as it may be overwritten by the application.
    **********************************************
**/

import { Telemetry } from "@cmmv/core";${hasCache ? `\nimport { Cache, CacheService } from "@cmmv/cache";` : ''}
${authRouter ? `import { Auth } from "@cmmv/auth";` : ''}

import { 
   Controller, Get, Post, Put, Delete, 
   Queries, Param, Body, Req
} from "@cmmv/http";

import { 
   ${contract.controllerName}, 
   ${contract.controllerName}FastSchema, ${importsFromModel.join(', \n   ')}
} from "${this.getImportPath(contract, 'models', contract.controllerName.toLowerCase() + '.model')}";

import { 
   ${serviceName} 
} from "${this.getImportPath(contract, 'services', contract.controllerName.toLowerCase() + '.service')}";

@Controller('${controllerPath}')
export class ${controllerName}Generated {
    constructor(private readonly ${serviceName.toLowerCase()}: ${serviceName}) {}

    @Get()${this.getControllerDecorators({ authRouter, hasCache, contract }, { cacheKeyPrefix, cacheTtl, cacheCompress }, 'get')}
    async getAll(@Queries() queries: any, @Req() req) {
        Telemetry.start('${controllerName}::GetAll', req.requestId);
        let result = await this.${serviceName.toLowerCase()}.getAll(queries, req);
        Telemetry.end('${controllerName}::GetAll', req.requestId);
        return result;
    }

    @Get(':id')${this.getControllerDecorators({ authRouter, hasCache: false, contract }, { cacheKeyPrefix, cacheTtl, cacheCompress }, 'get')}
    async getById(@Param('id') id: string, @Req() req) {
        Telemetry.start('${controllerName}::GetById', req.requestId);
        let result = await this.${serviceName.toLowerCase()}.getById(id, req);
        Telemetry.end('${controllerName}::GetById', req.requestId);
        return result;
    }

    @Get(':id/raw')${this.getControllerDecorators({ authRouter, hasCache: false, contract }, { cacheKeyPrefix, cacheTtl, cacheCompress }, 'get')}
    async getByIdRaw(@Param('id') id: string, @Req() req) {
        Telemetry.start('${controllerName}::GetById', req.requestId);
        let result = await this.${serviceName.toLowerCase()}.getById(id, req);
        Telemetry.end('${controllerName}::GetById', req.requestId);
        return ${contract.controllerName}FastSchema(result.data);
    }

    @Post()${this.getControllerDecorators({ authRouter, hasCache: false, contract }, { cacheKeyPrefix, cacheTtl, cacheCompress }, 'insert')}
    async add(@Body() item: ${contract.controllerName}, @Req() req) {
        Telemetry.start('${controllerName}::Add', req.requestId);
        let result = await this.${serviceName.toLowerCase()}.add(item, req);${hasCache ? `\n        CacheService.del("${cacheKeyPrefix}getAll");` : ''}
        Telemetry.end('${controllerName}::Add', req.requestId);
        return result;
    }

    @Put(':id')${this.getControllerDecorators({ authRouter, hasCache: false, contract }, { cacheKeyPrefix, cacheTtl, cacheCompress }, 'update')}
    async update(@Param('id') id: string, @Body() item: ${contract.controllerName}, @Req() req) {
        Telemetry.start('${controllerName}::Update', req.requestId);
        let result = await this.${serviceName.toLowerCase()}.update(id, item, req);${hasCache ? `\n        CacheService.del(\`${cacheKeyPrefix}\${id}\`);\n        CacheService.del("${cacheKeyPrefix}getAll");` : ''}
        Telemetry.end('${controllerName}::Update', req.requestId);
        return result;
    }

    @Delete(':id')${this.getControllerDecorators({ authRouter, hasCache: false, contract }, { cacheKeyPrefix, cacheTtl, cacheCompress }, 'delete')}
    async delete(@Param('id') id: string, @Req() req) {
        Telemetry.start('${controllerName}::Delete', req.requestId);
        let result = await this.${serviceName.toLowerCase()}.delete(id, req);${hasCache ? `\n        CacheService.del(\`${cacheKeyPrefix}\${id}\`);\n        CacheService.del("${cacheKeyPrefix}getAll");` : ''}
        Telemetry.end('${controllerName}::Delete', req.requestId);
        return result;
    }
${contract.services
    .filter(service => service.createBoilerplate === true)
    .map(service => {
        return `    @${this.getMethodFormated(service.method)}("${service.path}")${this.getControllerDecorators({ authRouter: service.auth, hasCache: service.cache, contract }, service.cache, service.method.toLowerCase())}
    async ${service.functionName}(@Body() payload: ${service.request}, @Req() req): Promise<${service.response}> {
        Telemetry.start('${controllerName}::${service.functionName}', req.requestId);
        let result = await this.${serviceName.toLowerCase()}.${service.functionName}(payload);
        Telemetry.end('${controllerName}::${service.functionName}', req.requestId);
        return result;
    }`;
    })
    .join('\n\n')}
}`;

        if (!telemetry)
            controllerTemplateGenerated = this.removeTelemetry(
                controllerTemplateGenerated,
            );

        const outputDir = this.getRootPath(contract, 'controllers');

        const outputFilePath = path.join(
            outputDir,
            controllerFileNameGenerated,
        );

        fs.writeFileSync(
            outputFilePath,
            this.removeExtraSpaces(controllerTemplateGenerated),
            'utf8',
        );

        //Controller
        const controllerTemplate = `import { 
   Controller
} from "@cmmv/http";

import { 
    ${controllerName}Generated 
} from "./${contract.controllerName.toLowerCase()}.controller.generated"; ${this.importServices(importsFromModel, contract)}

@Controller('${controllerPath}')
export class ${controllerName} extends ${controllerName}Generated {
        //Function ${controllerName} not implemented
}`;

        const outputFilePathFinal = path.join(outputDir, controllerFileName);

        if (!fs.existsSync(outputFilePathFinal))
            fs.writeFileSync(
                outputFilePathFinal,
                this.removeExtraSpaces(controllerTemplate),
                'utf8',
            );
    }

    private generateModule(
        controllers: Array<{ name: string; subPath: string }>,
        providers: Array<{ name: string; subPath: string }>,
    ): void {
        Application.appModule.controllers = [
            ...Application.appModule.controllers,
            ...controllers.map(({ name, subPath }) => {
                return {
                    name,
                    path: `./controllers${subPath}/${name.replace('Controller', '').toLowerCase()}.controller`,
                };
            }),
        ];

        Application.appModule.providers = [
            ...Application.appModule.providers,
            ...providers.map(({ name, subPath }) => {
                return {
                    name,
                    path: `./services${subPath}/${name.replace('Service', '').toLowerCase()}.service`,
                };
            }),
        ];
    }

    private getMethodFormated(raw: string): string {
        switch (raw.toLocaleLowerCase()) {
            case 'get':
                return 'Get';
            case 'post':
                return 'Post';
            case 'put':
                return 'Put';
            case 'delete':
                return 'Delete';
        }
    }

    private importServices(importsFromModel, contract: IContract): string {
        return importsFromModel.length
            ? `\n\nimport {
   ${importsFromModel.join(', \n   ')}
} from "${this.getImportPath(contract, 'models', contract.controllerName.toLowerCase() + '.model')}";`
            : '';
    }
}
