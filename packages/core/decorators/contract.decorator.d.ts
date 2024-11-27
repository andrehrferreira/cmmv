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
export declare const CONTRACT_WATERMARK: unique symbol;
export declare const CONTROLLER_NAME_METADATA: unique symbol;
export declare const PROTO_PATH_METADATA: unique symbol;
export declare const PROTO_PACKAGE_METADATA: unique symbol;
export declare const DATABASE_TYPE_METADATA: unique symbol;
export declare const FIELD_METADATA: unique symbol;
export declare const DIRECTMESSAGE_METADATA: unique symbol;
export declare const GENERATE_CONTROLLER_METADATA: unique symbol;
export declare const GENERATE_ENTITIES_METADATA: unique symbol;
export declare const AUTH_METADATA: unique symbol;
export declare const CONTROLLER_CUSTOM_PATH_METADATA: unique symbol;
export declare const CONTROLLER_IMPORTS: unique symbol;
export declare const CONTROLLER_CACHE: unique symbol;
export declare const CONTROLLER_VIEWFORM: unique symbol;
export declare const CONTROLLER_VIEWPAGE: unique symbol;
export declare function Contract(options?: ContractOptions): ClassDecorator;
export declare function ContractField(options: ContractFieldOptions): PropertyDecorator;
