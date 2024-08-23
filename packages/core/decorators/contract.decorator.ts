export interface ContractFieldOptions {
    protoType: string;
    defaultValue?: any;
    index?: boolean;
    unique?: boolean;
}

export interface ContractOptions {
    controllerName: string;
    protoPath: string;
    databaseType: 'mongodb' | 'typeorm';
}

const CONTRACT_WATERMARK = Symbol("contract_watermark");
const CONTROLLER_NAME_METADATA = Symbol("controller_name_metadata");
const PROTO_PATH_METADATA = Symbol("proto_path_metadata");
const DATABASE_TYPE_METADATA = Symbol("database_type_metadata");
const FIELD_METADATA = Symbol("contract_field_metadata");

export function Contract(options?: ContractOptions): ClassDecorator {
    const defaultControllerName = 'DefaultContract';
    const defaultProtoPath = 'contract.proto';
    const defaultDatabaseType = 'mongodb';

    const [controllerName, protoPath, databaseType] = !options
        ? [defaultControllerName, defaultProtoPath, defaultDatabaseType]
        : [
            options.controllerName || defaultControllerName,
            options.protoPath || defaultProtoPath,
            options.databaseType || defaultDatabaseType,
        ];

    return (target: object) => {
        Reflect.defineMetadata(CONTRACT_WATERMARK, true, target);
        Reflect.defineMetadata(CONTROLLER_NAME_METADATA, controllerName, target);
        Reflect.defineMetadata(PROTO_PATH_METADATA, protoPath, target);
        Reflect.defineMetadata(DATABASE_TYPE_METADATA, databaseType, target);
    };
}

export function ContractField(options: ContractFieldOptions): PropertyDecorator {
    return (
        target: object,
        propertyKey: string | symbol,
    ) => {
        const existingFields = Reflect.getMetadata(FIELD_METADATA, target) || [];
        const newField = { propertyKey, ...options };    
        Reflect.defineMetadata(FIELD_METADATA, [...existingFields, newField], target);
    };
}