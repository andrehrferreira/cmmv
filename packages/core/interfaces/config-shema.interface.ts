export interface ConfigSchema {
    [key: string]: ConfigSubPropsSchemas;
}

export interface ConfigSubPropsSchemas {
    [key: string]: {
        required: boolean;
        type: 'string' | 'number' | 'boolean' | 'object' | 'any' | 'function';
        default?: any;
        properties?: ConfigSubPropsSchemas;
    };
}
