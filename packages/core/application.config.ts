import { ConfigSchema } from './interfaces/config-shema.interface';

export const ApplicationConfig: ConfigSchema = {
    app: {
        telemetry: {
            required: true,
            type: 'boolean',
            default: true,
        },
    },
};
