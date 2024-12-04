export interface ConfigSchema {
    [key: string]: {
        [key: string]: {
            required: boolean;
            type: 'string' | 'number' | 'boolean' | 'object';
            default: any;
            properties?: ConfigSubPropsSchemas;
        };
    };
}

export interface ConfigSubPropsSchemas {
    [key: string]: {
        required: boolean;
        type: 'string' | 'number' | 'boolean' | 'object';
        default: any;
        properties?: ConfigSubPropsSchemas;
    };
}
