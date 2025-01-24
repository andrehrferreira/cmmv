export type ValidationType = string | Map<string, any> | [string, ...any[]];

export interface ValidationOption {
    type: ValidationType;
    message?: string;
    context?: any;
    value?: any;
}

export interface CacheOptions {
    key: string;
    ttl?: number;
    compress?: boolean;
}

export interface ContractFieldOptions {
    protoType: string;
    protoRepeated?: boolean;
    defaultValue?: any;
    index?: boolean;
    unique?: boolean;
    exclude?: boolean;
    nullable?: boolean;
    toClassOnly?: boolean;
    transform?: Function;
    toObject?: Function;
    toPlain?: Function;
    objectType?: string;
    validations?: ValidationOption[];
}

export interface ContractOptions {
    controllerName: string;
    controllerCustomPath?: string;
    protoPath: string;
    protoPackage?: string;
    directMessage?: boolean;
    generateController?: boolean;
    generateEntities?: boolean;
    auth?: boolean;
    imports?: Array<string>;
    cache?: CacheOptions;
    viewForm?: new () => any;
    viewPage?: new () => any;
}

export interface ContractMessageProperty {
    type:
        | 'string'
        | 'bool'
        | 'int'
        | 'float'
        | 'bytes'
        | 'date'
        | 'timestamp'
        | 'json'
        | 'simpleArray'
        | 'bigint'
        | 'any';
    required: boolean;
    default?: string;
}

export interface ContractOptionsMessage {
    name: string;
    properties: Record<string, ContractMessageProperty>;
}

export interface ContractOptionsService {
    path: string;
    method: 'GET' | 'POST' | 'PUT' | 'DELETE';
    name: string;
    request: string;
    response: string;
    auth?: boolean;
    createBoilerplate: boolean;
    functionName: string;
    functionBoilerplate: string;
}

export const CONTRACT_WATERMARK = Symbol('contract_watermark');
export const CONTROLLER_NAME_METADATA = Symbol('controller_name_metadata');
export const PROTO_PATH_METADATA = Symbol('proto_path_metadata');
export const PROTO_PACKAGE_METADATA = Symbol('proto_package_metadata');
export const DATABASE_TYPE_METADATA = Symbol('database_type_metadata');
export const FIELD_METADATA = Symbol('contract_field_metadata');
export const MESSAGE_METADATA = Symbol('contract_message_metadata');
export const SERVICE_METADATA = Symbol('contract_service_metadata');
export const DIRECTMESSAGE_METADATA = Symbol('contract_directmessage_metadata');
export const GENERATE_CONTROLLER_METADATA = Symbol(
    'generate_controller_metadata',
);
export const GENERATE_ENTITIES_METADATA = Symbol('generate_entities_metadata');
export const AUTH_METADATA = Symbol('auth_metadata');
export const CONTROLLER_CUSTOM_PATH_METADATA = Symbol(
    'controller_custom_path_metadata',
);
export const CONTROLLER_IMPORTS = Symbol('contract_imports');
export const CONTROLLER_CACHE = Symbol('contract_cache');
export const CONTROLLER_VIEWFORM = Symbol('contract_viewform');
export const CONTROLLER_VIEWPAGE = Symbol('contract_viewpage');

export function Contract(options?: ContractOptions): ClassDecorator {
    const isValidClass = (value: any) => {
        return typeof value === 'function' && value.prototype;
    };

    if (options?.viewForm && !isValidClass(options.viewForm)) {
        throw new Error(`Invalid viewForm provided: ${options.viewForm}`);
    }

    if (options?.viewPage && !isValidClass(options.viewPage)) {
        throw new Error(`Invalid viewPage provided: ${options.viewPage}`);
    }

    const defaultControllerName = 'DefaultContract';
    const defaultProtoPath = 'contract.proto';
    const defaultProtoPackage = '';
    const defaultDirectMessage = false;
    const defaultGenerateController = true;
    const defaultGenerateEntities = true;
    const defaultAuth = true;
    const defaultControllerCustomPath = '';
    const defaultImports = [];
    const defaultCache = null;
    const defaultViewForm = null;
    const defaultViewPage = null;

    const [
        controllerName,
        protoPath,
        directMessage,
        protoPackage,
        generateController,
        generateEntities,
        auth,
        controllerCustomPath,
        imports,
        cache,
        viewForm,
        viewPage,
    ] = !options
        ? [
              defaultControllerName,
              defaultProtoPath,
              defaultDirectMessage,
              defaultProtoPackage,
              defaultGenerateController,
              defaultGenerateEntities,
              defaultAuth,
              defaultControllerCustomPath,
              defaultImports,
              defaultCache,
              defaultViewForm,
              defaultViewPage,
          ]
        : [
              options.controllerName || defaultControllerName,
              options.protoPath || defaultProtoPath,
              options.directMessage || defaultDirectMessage,
              options.protoPackage || defaultProtoPackage,
              options.generateController ?? defaultGenerateController,
              options.generateEntities ?? defaultGenerateEntities,
              options.auth ?? defaultAuth,
              options.controllerCustomPath || defaultControllerCustomPath,
              options.imports || defaultImports,
              options.cache || defaultCache,
              options.viewForm || defaultViewForm,
              options.viewPage || defaultViewPage,
          ];

    return (target: object) => {
        Reflect.defineMetadata(CONTRACT_WATERMARK, true, target);
        Reflect.defineMetadata(
            CONTROLLER_NAME_METADATA,
            controllerName,
            target,
        );
        Reflect.defineMetadata(PROTO_PATH_METADATA, protoPath, target);
        Reflect.defineMetadata(PROTO_PACKAGE_METADATA, protoPackage, target);
        Reflect.defineMetadata(DIRECTMESSAGE_METADATA, directMessage, target);
        Reflect.defineMetadata(
            GENERATE_CONTROLLER_METADATA,
            generateController,
            target,
        );
        Reflect.defineMetadata(
            GENERATE_ENTITIES_METADATA,
            generateEntities,
            target,
        );
        Reflect.defineMetadata(AUTH_METADATA, auth, target);
        Reflect.defineMetadata(
            CONTROLLER_CUSTOM_PATH_METADATA,
            controllerCustomPath,
            target,
        );
        Reflect.defineMetadata(CONTROLLER_IMPORTS, imports, target);
        Reflect.defineMetadata(CONTROLLER_CACHE, cache, target);
        Reflect.defineMetadata(CONTROLLER_VIEWFORM, viewForm, target);
        Reflect.defineMetadata(CONTROLLER_VIEWPAGE, viewPage, target);
    };
}

export function ContractField(
    options: ContractFieldOptions,
): PropertyDecorator {
    return (target: object, propertyKey: string | symbol) => {
        const existingFields =
            Reflect.getMetadata(FIELD_METADATA, target) || [];

        const newField = { propertyKey, ...options };
        existingFields.push(newField);

        Reflect.defineMetadata(FIELD_METADATA, existingFields, target);
    };
}

export function ContractMessage(
    options?: ContractOptionsMessage,
): PropertyDecorator {
    return (target: object, propertyKey: string | symbol) => {
        const existingFields =
            Reflect.getMetadata(MESSAGE_METADATA, target) || [];

        const newField = { propertyKey, ...options };
        existingFields.push(newField);

        Reflect.defineMetadata(MESSAGE_METADATA, existingFields, target);
    };
}

export function ContractService(
    options?: ContractOptionsService,
): PropertyDecorator {
    return (target: object, propertyKey: string | symbol) => {
        const existingFields =
            Reflect.getMetadata(SERVICE_METADATA, target) || [];

        const newField = { propertyKey, ...options };
        existingFields.push(newField);

        Reflect.defineMetadata(SERVICE_METADATA, existingFields, target);
    };
}
