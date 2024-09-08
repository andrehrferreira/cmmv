export type ValidationType = string | Map<string, any> | [string, ...any[]];

export interface ValidationOption {
    type: ValidationType;
    message?: string;
    context?: any;
}

export interface ContractFieldOptions {
    protoType: string;
    protoRepeated?: boolean;
    defaultValue?: any;
    index?: boolean;
    unique?: boolean;
    exclude?: boolean;
    toClassOnly?: boolean;
    transform?: Function;
    validations?: ValidationOption[];
}

export interface ContractOptions {
    controllerName: string;
    controllerCustomPath?: string;
    protoPath: string;
    protoPackage?: string;
    directMessage?: boolean;
    generateController?: boolean;
    auth?: boolean;
    imports?: Array<string>;
}

export const CONTRACT_WATERMARK = Symbol('contract_watermark');
export const CONTROLLER_NAME_METADATA = Symbol('controller_name_metadata');
export const PROTO_PATH_METADATA = Symbol('proto_path_metadata');
export const PROTO_PACKAGE_METADATA = Symbol('proto_package_metadata');
export const DATABASE_TYPE_METADATA = Symbol('database_type_metadata');
export const FIELD_METADATA = Symbol('contract_field_metadata');
export const DIRECTMESSAGE_METADATA = Symbol('contract_directmessage_metadata');
export const GENERATE_CONTROLLER_METADATA = Symbol(
    'generate_controller_metadata',
);
export const AUTH_METADATA = Symbol('auth_metadata');
export const CONTROLLER_CUSTOM_PATH_METADATA = Symbol(
    'controller_custom_path_metadata',
);
export const CONTROLLER_IMPORTS = Symbol('contract_imports');

export function Contract(options?: ContractOptions): ClassDecorator {
    const defaultControllerName = 'DefaultContract';
    const defaultProtoPath = 'contract.proto';
    const defaultProtoPackage = '';
    const defaultDirectMessage = false;
    const defaultGenerateController = true;
    const defaultAuth = true;
    const defaultControllerCustomPath = '';
    const defaultImports = [];

    const [
        controllerName,
        protoPath,
        directMessage,
        protoPackage,
        generateController,
        auth,
        controllerCustomPath,
        imports,
    ] = !options
        ? [
              defaultControllerName,
              defaultProtoPath,
              defaultDirectMessage,
              defaultProtoPackage,
              defaultGenerateController,
              defaultAuth,
              defaultControllerCustomPath,
              defaultImports,
          ]
        : [
              options.controllerName || defaultControllerName,
              options.protoPath || defaultProtoPath,
              options.directMessage || defaultDirectMessage,
              options.protoPackage || defaultProtoPackage,
              options.generateController ?? defaultGenerateController,
              options.auth ?? defaultAuth,
              options.controllerCustomPath || defaultControllerCustomPath,
              options.imports || defaultImports,
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
        Reflect.defineMetadata(AUTH_METADATA, auth, target);
        Reflect.defineMetadata(
            CONTROLLER_CUSTOM_PATH_METADATA,
            controllerCustomPath,
            target,
        );
        Reflect.defineMetadata(CONTROLLER_IMPORTS, imports, target);
    };
}

export function ContractField(
    options: ContractFieldOptions,
): PropertyDecorator {
    return (target: object, propertyKey: string | symbol) => {
        const existingFields =
            Reflect.getMetadata(FIELD_METADATA, target) || [];
        const newField = { propertyKey, ...options };
        Reflect.defineMetadata(
            FIELD_METADATA,
            [...existingFields, newField],
            target,
        );
    };
}
