import * as fs from 'fs';
import * as path from 'path';

import { ITranspile, Logger, Scope } from "@cmmv/core";

export class ExpressTranspile implements ITranspile {
    private logger: Logger = new Logger('ExpressTranspile');

    run(): void {
        const contracts = Scope.getArray<any>("__contracts");
        const moduleName = 'ApplicationModule';

        const controllers = [];
        const providers = [];

        contracts.forEach((contract: any) => {
            if(contract.generateController){
                this.generateModel(contract);
                this.generateService(contract);
                this.generateController(contract);
                controllers.push(`${contract.controllerName}Controller`);
                providers.push(`${contract.controllerName}Service`);
            }
        });

        this.generateModule(moduleName, controllers, providers);
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

import { ${modelName} } from '../models/${modelName.toLowerCase()}.model';

export class ${serviceName} {
    private items: ${modelName}[] = [];

    async getAll(): Promise<${modelName}[]> {
        return this.items;
    }

    async add(item: ${modelName}): Promise<${modelName}> {
        item['id'] = this.items.length + 1;
        this.items.push(item);
        return item;
    }

    async update(id: string, item: ${modelName}): Promise<${modelName}> {
        const index = this.items.findIndex(i => i.id === parseInt(id));
        if (index !== -1) {
            this.items[index] = { ...this.items[index], ...item };
            return this.items[index];
        }
        throw new Error('Item not found');
    }

    async delete(id: string): Promise<{ success: boolean }> {
        const index = this.items.findIndex(i => i.id === parseInt(id));
        if (index !== -1) {
            this.items.splice(index, 1);
            return { success: true };
        }
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

import { Controller, Get, Post, Put, Delete, Body, Param } from '@cmmv/http';
import { ${serviceName} } from '../services/${contract.controllerName.toLowerCase()}.service';
import { ${contract.controllerName} } from '../models/${contract.controllerName.toLowerCase()}.model';

@Controller('${contract.controllerName.toLowerCase()}')
export class ${controllerName} {
    constructor(private readonly ${serviceName.toLowerCase()}: ${serviceName}) {}

    @Get()
    async getAll(): Promise<${contract.controllerName}[]> {
        return this.${serviceName.toLowerCase()}.getAll();
    }

    @Post()
    async add(@Body() item: ${contract.controllerName}): Promise<${contract.controllerName}> {
        return this.${serviceName.toLowerCase()}.add(item);
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() item: ${contract.controllerName}): Promise<${contract.controllerName}> {
        return this.${serviceName.toLowerCase()}.update(id, item);
    }

    @Delete(':id')
    async delete(@Param('id') id: string): Promise<{ success: boolean }> {
        return this.${serviceName.toLowerCase()}.delete(id);
    }
}
`;
        const dirname = path.resolve(outputDir, '../controllers');

        if(!fs.existsSync(dirname))
            fs.mkdirSync(dirname, { recursive: true });

        const outputFilePath = path.join(outputDir, '../controllers', controllerFileName);
        fs.writeFileSync(outputFilePath, controllerTemplate, 'utf8');
    }

    private generateModule(moduleName: string, controllers: string[], providers: string[]): void {
        const outputPath = path.resolve('src', `app.module.ts`);

        const moduleTemplate = `// Generated automatically by CMMV

import { Module } from '@cmmv/core';
${controllers.map(controller => `import { ${controller} } from './controllers/${controller.toLowerCase().replace('controller', '')}.controller';`).join('\n')}
${providers.map(provider => `import { ${provider} } from './services/${provider.toLowerCase().replace('service', '')}.service';`).join('\n')}

export let ${moduleName} = new Module({
    controllers: [${controllers.join(', ')}],
    providers: [${providers.join(', ')}]
});
`;

        if (!fs.existsSync(path.dirname(outputPath)))
            fs.mkdirSync(path.dirname(outputPath), { recursive: true });

        fs.writeFileSync(outputPath, moduleTemplate, 'utf8');
        this.logger.log(`Generated module at ${outputPath}`);
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