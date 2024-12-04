"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CONTROLLER_VIEWPAGE = exports.CONTROLLER_VIEWFORM = exports.CONTROLLER_CACHE = exports.CONTROLLER_IMPORTS = exports.CONTROLLER_CUSTOM_PATH_METADATA = exports.AUTH_METADATA = exports.GENERATE_ENTITIES_METADATA = exports.GENERATE_CONTROLLER_METADATA = exports.DIRECTMESSAGE_METADATA = exports.FIELD_METADATA = exports.DATABASE_TYPE_METADATA = exports.PROTO_PACKAGE_METADATA = exports.PROTO_PATH_METADATA = exports.CONTROLLER_NAME_METADATA = exports.CONTRACT_WATERMARK = void 0;
exports.Contract = Contract;
exports.ContractField = ContractField;
exports.CONTRACT_WATERMARK = Symbol('contract_watermark');
exports.CONTROLLER_NAME_METADATA = Symbol('controller_name_metadata');
exports.PROTO_PATH_METADATA = Symbol('proto_path_metadata');
exports.PROTO_PACKAGE_METADATA = Symbol('proto_package_metadata');
exports.DATABASE_TYPE_METADATA = Symbol('database_type_metadata');
exports.FIELD_METADATA = Symbol('contract_field_metadata');
exports.DIRECTMESSAGE_METADATA = Symbol('contract_directmessage_metadata');
exports.GENERATE_CONTROLLER_METADATA = Symbol('generate_controller_metadata');
exports.GENERATE_ENTITIES_METADATA = Symbol('generate_entities_metadata');
exports.AUTH_METADATA = Symbol('auth_metadata');
exports.CONTROLLER_CUSTOM_PATH_METADATA = Symbol('controller_custom_path_metadata');
exports.CONTROLLER_IMPORTS = Symbol('contract_imports');
exports.CONTROLLER_CACHE = Symbol('contract_cache');
exports.CONTROLLER_VIEWFORM = Symbol('contract_viewform');
exports.CONTROLLER_VIEWPAGE = Symbol('contract_viewpage');
function Contract(options) {
    const isValidClass = (value) => {
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
    const [controllerName, protoPath, directMessage, protoPackage, generateController, generateEntities, auth, controllerCustomPath, imports, cache, viewForm, viewPage,] = !options
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
    return (target) => {
        Reflect.defineMetadata(exports.CONTRACT_WATERMARK, true, target);
        Reflect.defineMetadata(exports.CONTROLLER_NAME_METADATA, controllerName, target);
        Reflect.defineMetadata(exports.PROTO_PATH_METADATA, protoPath, target);
        Reflect.defineMetadata(exports.PROTO_PACKAGE_METADATA, protoPackage, target);
        Reflect.defineMetadata(exports.DIRECTMESSAGE_METADATA, directMessage, target);
        Reflect.defineMetadata(exports.GENERATE_CONTROLLER_METADATA, generateController, target);
        Reflect.defineMetadata(exports.GENERATE_ENTITIES_METADATA, generateEntities, target);
        Reflect.defineMetadata(exports.AUTH_METADATA, auth, target);
        Reflect.defineMetadata(exports.CONTROLLER_CUSTOM_PATH_METADATA, controllerCustomPath, target);
        Reflect.defineMetadata(exports.CONTROLLER_IMPORTS, imports, target);
        Reflect.defineMetadata(exports.CONTROLLER_CACHE, cache, target);
        Reflect.defineMetadata(exports.CONTROLLER_VIEWFORM, viewForm, target);
        Reflect.defineMetadata(exports.CONTROLLER_VIEWPAGE, viewPage, target);
    };
}
function ContractField(options) {
    return (target, propertyKey) => {
        const existingFields = Reflect.getMetadata(exports.FIELD_METADATA, target) || [];
        const newField = { propertyKey, ...options };
        existingFields.push(newField);
        Reflect.defineMetadata(exports.FIELD_METADATA, existingFields, target);
    };
}
