import * as fs from 'fs';
import * as path from 'path';

import { Application, ITranspile, Logger, Scope } from "@cmmv/core";

export class ExpressTranspile implements ITranspile {
    private logger: Logger = new Logger('ExpressTranspile');

    run(): void {
        const contracts = Scope.getArray<any>("__contracts");
        const controllers = [];
        const providers = [];

        contracts?.forEach((contract: any) => {
            if(contract.generateController){
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
        const modelFileName = `${modelName.toLowerCase()}.model.ts`;

        const modelTemplate = `// Generated automatically by CMMV
        
export interface ${modelName} {
    id?: any;
${contract.fields.map((field: any) => `    ${field.propertyKey}: ${this.mapToTsType(field.protoType)};`).join('\n')}
}
`;

        const dirname = path.resolve(outputDir, '../models');

        if(!fs.existsSync(dirname))
            fs.mkdirSync(dirname, { recursive: true });

        const outputFilePath = path.join(outputDir, '../models', modelFileName);
        fs.writeFileSync(outputFilePath, modelTemplate, 'utf8');
    }

    private generateService(contract: any): void {
        const outputPath = path.resolve(contract.protoPath);
        const outputDir = path.dirname(outputPath); 
        const serviceName = `${contract.controllerName}Service`;
        const modelName = `${contract.controllerName}`;
        const serviceFileName = `${contract.controllerName.toLowerCase()}.service.ts`;
    
        const serviceTemplate = `// Generated automatically by CMMV
import { AbstractService, Service } from '@cmmv/http';
import { ${modelName} } from '../models/${modelName.toLowerCase()}.model';

@Service("${contract.controllerName.toLowerCase()}")
export class ${serviceName} extends AbstractService {
    public override name = "${contract.controllerName.toLowerCase()}";
    private items: ${modelName}[] = [];

    async getAll(queries?: any, req?: any): Promise<${modelName}[]> {
        return this.items.filter(item => 
            Object.keys(queries).every(key => item[key] === queries[key])
        );
    }

    async getById(id: string, req?: any): Promise<${modelName}> {
        const item = this.items.find(i => i.id === id);

        if (item) 
            return item;
        
        throw new Error('Item not found');
    }

    async add(item: ${modelName}, req?: any): Promise<${modelName}> {
        item['id'] = this.items.length + 1;
        this.items.push(item);
        return item;
    }

    async update(id: string, item: ${modelName}, req?: any): Promise<${modelName}> {
        const index = this.items.findIndex(i => i.id === parseInt(id));

        if (index !== -1) 
            this.items[index] = { ...this.items[index], ...item };
            return this.items[index];
        
        throw new Error('Item not found');
    }

    async delete(id: string, req?: any): Promise<{ success: boolean, affected: number }> {
        const index = this.items.findIndex(i => i.id === parseInt(id));

        if (index !== -1) 
            this.items.splice(index, 1);
            return { success: true, affected: 1 };
        
        throw new Error('Item not found');
    }
}
`;
    
        const dirname = path.resolve(outputDir, '../services');
    
        if(!fs.existsSync(dirname))
            fs.mkdirSync(dirname, { recursive: true });
    
        const outputFilePath = path.join(outputDir, '../services', serviceFileName);        
        fs.writeFileSync(outputFilePath, serviceTemplate, 'utf8');
    }
    
    private generateController(contract: any): void {        
        const outputPath = path.resolve(contract.protoPath);
        const outputDir = path.dirname(outputPath); 
        const controllerName = `${contract.controllerName}Controller`;
        const serviceName = `${contract.controllerName}Service`;
        const controllerFileName = `${contract.controllerName.toLowerCase()}.controller.ts`;
    
        const controllerTemplate = `// Generated automatically by CMMV
    
import { Telemetry } from "@cmmv/core";  
import { Controller, Get, Post, Put, Delete, Queries, Param, Body, Request } from '@cmmv/http';
import { ${serviceName} } from '../services/${contract.controllerName.toLowerCase()}.service';
import { ${contract.controllerName} } from '../models/${contract.controllerName.toLowerCase()}.model';

@Controller('${contract.controllerName.toLowerCase()}')
export class ${controllerName} {
    constructor(private readonly ${serviceName.toLowerCase()}: ${serviceName}) {}

    @Get()
    async getAll(@Queries() queries: any, @Request() req): Promise<${contract.controllerName}[]> {
        Telemetry.start('${controllerName}::GetAll', req.requestId);
        let result = await this.${serviceName.toLowerCase()}.getAll(queries, req);
        Telemetry.end('${controllerName}::GetAll', req.requestId);
        return result;
    }

    @Get(':id')
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
        Telemetry.end('${controllerName}::Add', req.requestId);
        return result;
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() item: ${contract.controllerName}, @Request() req): Promise<${contract.controllerName}> {
        Telemetry.start('${controllerName}::Update', req.requestId);
        let result = await this.${serviceName.toLowerCase()}.update(id, item, req);
        Telemetry.end('${controllerName}::Update', req.requestId);
        return result;
    }

    @Delete(':id')
    async delete(@Param('id') id: string, @Request() req): Promise<{ success: boolean, affected: number }> {
        Telemetry.start('${controllerName}::Delete', req.requestId);
        let result = await this.${serviceName.toLowerCase()}.delete(id, req);
        Telemetry.end('${controllerName}::Delete', req.requestId);
        return result;
    }
}
`;
        const dirname = path.resolve(outputDir, '../controllers');
    
        if(!fs.existsSync(dirname))
            fs.mkdirSync(dirname, { recursive: true });
    
        const outputFilePath = path.join(outputDir, '../controllers', controllerFileName);
        fs.writeFileSync(outputFilePath, controllerTemplate, 'utf8');
    }
    
    private generateModule(controllers: string[], providers: string[]): void {
        Application.appModule.controllers = [...Application.appModule.controllers, ...controllers.map((name) => {
            return { name, path: `./controllers/${name.replace("Controller", "").toLowerCase()}.controller` }
        })];
        Application.appModule.providers = [...Application.appModule.providers, ...providers.map((name) => {
            return { name, path: `./services/${name.replace("Service", "").toLowerCase()}.service` }
        })];
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