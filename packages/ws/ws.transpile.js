"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WSTranspile = void 0;
const fs = require("node:fs");
const path = require("node:path");
const core_1 = require("@cmmv/core");
class WSTranspile {
    run() {
        const contracts = core_1.Scope.getArray('__contracts');
        contracts?.forEach((contract) => {
            if (contract.generateController)
                this.generateGateway(contract);
        });
    }
    generateGateway(contract) {
        const outputPath = path.resolve(contract.protoPath);
        const outputDir = path.dirname(outputPath);
        const gatewayName = `${contract.controllerName}Gateway`;
        const serviceName = `${contract.controllerName}Service`;
        const gatewayFileName = `${contract.controllerName.toLowerCase()}.gateway.ts`;
        const hasCache = contract.cache !== undefined && contract.cache !== null;
        const cacheKeyPrefix = hasCache
            ? contract.cache?.key || `${contract.controllerName.toLowerCase()}:`
            : '';
        const cacheTtl = hasCache ? contract.cache.ttl || 300 : 0;
        const cacheCompress = hasCache && contract.cache.compress ? 'true' : 'false';
        const serviceTemplate = `// Generated automatically by CMMV
    
import { Rpc, Message, Data, Socket, RpcUtils } from "@cmmv/ws";
import { plainToClass } from 'class-transformer';
import { ${contract.controllerName}Entity } from '../entities/${contract.controllerName.toLowerCase()}.entity';
${hasCache ? `import { Cache, CacheService } from "@cmmv/cache";` : ''}

import { 
    Add${contract.controllerName}Request, 
    Update${contract.controllerName}Request,   
    Delete${contract.controllerName}Request 
} from "../protos/${contract.controllerName.toLowerCase()}";

import { ${serviceName} } from '../services/${contract.controllerName.toLowerCase()}.service';

@Rpc("${contract.controllerName.toLowerCase()}")
export class ${gatewayName} {
    constructor(private readonly ${serviceName.toLowerCase()}: ${serviceName}) {}

    @Message("GetAll${contract.controllerName}Request")
    ${hasCache ? `@Cache("${cacheKeyPrefix}getAll", { ttl: ${cacheTtl}, compress: ${cacheCompress} })` : ''}
    async getAll(@Socket() socket){
        try{
            const items = await this.${serviceName.toLowerCase()}.getAll();
            const response = await RpcUtils.pack("${contract.controllerName.toLowerCase()}", "GetAll${contract.controllerName}Response", items);

            if(response)
                socket.send(response);
        }
        catch(e){}
    }

    @Message("Add${contract.controllerName}Request")
    async add(@Data() data: Add${contract.controllerName}Request, @Socket() socket){
        try{
            const entity = plainToClass(${contract.controllerName}Entity, data.item);
            const result = await this.${serviceName.toLowerCase()}.add(entity);
            const response = await RpcUtils.pack("${contract.controllerName.toLowerCase()}", "Add${contract.controllerName}Response", { item: result, id: ${core_1.Config.get('repository.type') === 'mongodb' ? `result._id` : `result.id`} });
            ${hasCache ? `CacheService.set(\`${cacheKeyPrefix}\${${core_1.Config.get('repository.type') === 'mongodb' ? `result._id` : `result.id`}}\`, JSON.stringify(result), ${cacheTtl});` : ''}
            ${hasCache ? `CacheService.del("${cacheKeyPrefix}getAll");` : ''}

            if(response)
                socket.send(response);
        }
        catch(e){}
    }

    @Message("Update${contract.controllerName}Request")
    async update(@Data() data: Update${contract.controllerName}Request, @Socket() socket){
        try{
            const entity = plainToClass(${contract.controllerName}Entity, data.item);
            const result = await this.${serviceName.toLowerCase()}.update(data.id, entity);
            const response = await RpcUtils.pack("${contract.controllerName.toLowerCase()}", "Update${contract.controllerName}Response", { item: result, id: ${core_1.Config.get('repository.type') === 'mongodb' ? `result._id` : `result.id`} });
            ${hasCache ? `CacheService.set(\`${cacheKeyPrefix}\${${core_1.Config.get('repository.type') === 'mongodb' ? `result._id` : `result.id`}}\`, JSON.stringify(result), ${cacheTtl});` : ''}
            ${hasCache ? `CacheService.del("${cacheKeyPrefix}getAll");` : ''}

            if(response)
                socket.send(response);
        }
        catch(e){}
    }

    @Message("Delete${contract.controllerName}Request")
    async delete(@Data() data: Delete${contract.controllerName}Request, @Socket() socket){
        try{
            const result = (await this.${serviceName.toLowerCase()}.delete(data.id));
            const response = await RpcUtils.pack(
                "${contract.controllerName.toLowerCase()}", 
                "Delete${contract.controllerName}Response", 
                { 
                    success: result.success, 
                    affected: result.affected, 
                    id: data.id 
                }
            );
            ${hasCache ? `CacheService.del(\`${cacheKeyPrefix}\${data.id}\`);` : ''}
            ${hasCache ? `CacheService.del("${cacheKeyPrefix}getAll");` : ''}
            
            if(response)
                socket.send(response);
        }
        catch(e){}
    }
}`;
        core_1.Application.appModule.providers.push({
            name: gatewayName,
            path: `./gateways/${contract.controllerName.toLowerCase()}.gateway`,
        });
        const dirname = path.resolve(outputDir, '../gateways');
        if (!fs.existsSync(dirname))
            fs.mkdirSync(dirname, { recursive: true });
        const outputFilePath = path.join(outputDir, '../gateways', gatewayFileName);
        fs.writeFileSync(outputFilePath, serviceTemplate, 'utf8');
    }
}
exports.WSTranspile = WSTranspile;
