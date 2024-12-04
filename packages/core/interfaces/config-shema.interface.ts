export interface ConfigSchema {
    [key: string]: {
        required: boolean;
        type: string;
        default: any;
    };
}
