import * as fs from 'node:fs';
import * as path from 'node:path';
//import * as os from 'os';
import * as fg from 'fast-glob';
import * as Terser from 'terser';
//import { build } from 'esbuild';

import { IHTTPSettings, ConfigSchema } from './interfaces';

import { ITranspile, Logger, Scope, Transpile, Module, Config } from '.';

import {
    AbstractContract,
    AbstractHttpAdapter,
    AbstractWSAdapter,
} from './abstracts';

import {
    CONTROLLER_NAME_METADATA,
    DATABASE_TYPE_METADATA,
    FIELD_METADATA,
    PROTO_PATH_METADATA,
    DIRECTMESSAGE_METADATA,
    PROTO_PACKAGE_METADATA,
    GENERATE_CONTROLLER_METADATA,
    AUTH_METADATA,
    CONTROLLER_CUSTOM_PATH_METADATA,
    CONTROLLER_IMPORTS,
    CONTROLLER_CACHE,
    GENERATE_ENTITIES_METADATA,
    CONTROLLER_VIEWFORM,
    CONTROLLER_VIEWPAGE,
} from './decorators';

import { ApplicationTranspile } from './transpilers';

export interface IApplicationSettings {
    wsAdapter?: new (appOrHttpServer: any) => AbstractWSAdapter;
    httpAdapter?: new (instance?: any) => AbstractHttpAdapter;
    httpOptions?: IHTTPSettings;
    httpMiddlewares?: Array<any>;
    transpilers?: Array<new () => ITranspile>;
    modules?: Array<Module>;
    contracts?: Array<new () => any>;
    services?: Array<any>;
}

process.on('uncaughtException', err => {
    console.error(err);
});

export class Application {
    protected logger: Logger = new Logger('Application');

    public static appModule = {
        controllers: [],
        providers: [],
        httpMiddlewares: [],
        httpInterceptors: [],
        httpAfterRender: [],
    };

    protected httpAdapter: AbstractHttpAdapter;
    protected httpBind: string;
    protected httpOptions: IHTTPSettings;
    protected wsAdapter: AbstractWSAdapter;
    protected wsServer: any;
    public wSConnections: Map<string, any> = new Map<string, any>();
    protected modules: Array<Module>;
    protected transpilers: Array<new () => ITranspile>;
    protected controllers: Array<any> = [];
    protected submodules: Array<Module> = [];
    protected contracts: Array<any> = [];
    protected configs: Array<ConfigSchema> = [];
    public providersMap = new Map<string, any>();

    protected host: string;
    protected port: number;

    constructor(settings: IApplicationSettings) {
        this.logger.log('Initialize application');

        Config.loadConfig();

        const env = Config.get<string>('env');
        this.httpOptions = (settings && settings.httpOptions) || {};
        this.httpAdapter =
            settings && settings.httpAdapter
                ? new settings.httpAdapter()
                : null;

        if (this.httpAdapter) {
            settings?.httpMiddlewares?.forEach(middleware => {
                this.httpAdapter?.getInstance().use(middleware);
            });

            if (settings.wsAdapter)
                this.wsAdapter = new settings.wsAdapter(this.httpAdapter);

            this.host = Config.get<string>('server.host') || '0.0.0.0';
            this.port = Config.get<number>('server.port') || 3000;
            this.transpilers = settings.transpilers || [];
            this.modules = settings.modules || [];
            this.contracts =
                settings.contracts?.map(contractClass => new contractClass()) ||
                [];
            this.initialize(settings);
        } else if (settings && settings.contracts?.length > 0) {
            this.transpilers = (settings && settings.transpilers) || [];
            this.modules = (settings && settings.modules) || [];
            this.contracts =
                (settings &&
                    settings.contracts?.map(
                        contractClass => new contractClass(),
                    )) ||
                [];
            this.initialize(settings);
        }
    }

    protected async initialize(settings: IApplicationSettings): Promise<void> {
        try {
            const env = Config.get<string>('env', process.env.NODE_ENV);
            this.loadModules(this.modules);
            await Config.validateConfigs(this.configs);
            this.processContracts();

            this.transpilers.push(ApplicationTranspile);

            if (env === 'dev' || env === 'development' || env === 'build') {
                if (this.transpilers.length > 0) {
                    const transpile = new Transpile(this.transpilers);
                    await transpile.transpile();
                    this.logger.log('All transpilers executed successfully.');
                } else {
                    this.logger.log('No transpilers provided.');
                }

                if (this.httpAdapter) {
                    const appModel = await Application.generateModule();

                    if (appModel) this.loadModules([...this.modules, appModel]);

                    this.createScriptBundle();
                    this.createCSSBundle();
                }
            } else {
                const tsconfig: any = new Function(
                    `return(${fs.readFileSync(path.resolve('./tsconfig.json'), 'utf-8')})`,
                )();

                const outputPath = path.resolve(
                    tsconfig.compilerOptions.outDir,
                    `app.module.js`,
                );

                if (fs.existsSync(outputPath)) {
                    const { ApplicationModule } = await import(outputPath);
                    this.loadModules([...this.modules, ApplicationModule]);
                } else {
                    this.loadModules([...this.modules]);
                }
            }

            const servicesLoad = [];

            settings.services?.forEach(async service => {
                if (service && typeof service.loadConfig === 'function')
                    servicesLoad.push(service?.loadConfig(this));
            });

            await Promise.all(servicesLoad);

            if (this.httpAdapter) {
                await this.httpAdapter.init(this, this.httpOptions);

                Application.appModule.httpMiddlewares?.forEach(middleware => {
                    this.httpAdapter.use(middleware);
                });

                if (this.wsAdapter)
                    this.wsServer = this.wsAdapter.create(
                        this.httpAdapter,
                        this,
                    );

                await this.httpAdapter
                    .listen(`${this.host}:${this.port}`)
                    .then(() => {
                        this.logger.log(
                            `Server HTTP successfully started on ${this.host}:${this.port}`,
                        );
                    })
                    .catch(error => {
                        this.logger.error(
                            `Failed to start HTTP server on ${this.httpBind}: ${error.message || error}`,
                        );
                    });
            }
        } catch (error) {
            console.log(error);
            this.logger.error(
                `Failed to initialize application: ${error.message || error}`,
            );
        }
    }

    protected async createScriptBundle() {
        const dirBuild = path.resolve('./public/assets');

        if (!fs.existsSync(dirBuild))
            fs.mkdirSync(dirBuild, { recursive: true });

        const finalbundle = path.resolve('./public/assets/bundle.min.js');

        const files = await fg(path.resolve('./public/core/*.min.js'), {
            ignore: ['node_modules/**'],
        });

        const lines: string[] = [];
        lines.push('// Generated automatically by CMMV');

        files.forEach(file => {
            lines.push(fs.readFileSync(file, 'utf-8'));
            lines.push('');
        });

        const bundleContent = lines.join('\n');

        /*const tempFilePath = path.join(os.tmpdir(), 'temp-bundle.js');
        fs.writeFileSync(tempFilePath, bundleContent, 'utf8');
    
        await build({
            entryPoints: [tempFilePath],
            outfile: finalbundle,
            bundle: true,
            minify: false,
            platform: 'browser',
            format: 'esm',
            sourcemap: true,
            target: ['esnext'],
            external: ['vue', 'axios', 'moment'],
            define: {
                'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production'),
            },
            logLevel: 'silent',
            keepNames: true,
            ignoreAnnotations: true,
        });

        fs.unlinkSync(tempFilePath);*/

        const result = await Terser.minify(bundleContent, {
            compress: {
                dead_code: true,
                conditionals: true,
                unused: true,
                drop_debugger: true,
                drop_console: process.env.NODE_ENV !== 'dev',
            },
            mangle: { toplevel: true },
            output: {
                beautify: false,
            },
            sourceMap: {
                url: 'inline', // Gera o sourcemap diretamente embutido no arquivo
            },
        });

        fs.writeFileSync(finalbundle, result.code, { encoding: 'utf-8' });
    }

    protected async createCSSBundle() {
        const dirBuild = path.resolve('./public/assets');

        if (!fs.existsSync(dirBuild))
            fs.mkdirSync(dirBuild, { recursive: true });

        const finalbundle = path.resolve('./public/assets/bundle.min.css');

        const files = await fg(path.resolve('./public/core/*.min.css'), {
            ignore: ['node_modules/**'],
        });

        const lines: string[] = [];
        lines.push('/* Generated automatically by CMMV */');

        files.forEach(file => {
            lines.push(fs.readFileSync(file, 'utf-8'));
            lines.push('');
        });

        const bundleContent = lines.join('\n');
        fs.writeFileSync(finalbundle, bundleContent, { encoding: 'utf-8' });
    }

    protected loadModules(modules: Array<Module>): void {
        modules.forEach(module => {
            this.transpilers.push(...module.getTranspilers());
            this.controllers.push(...module.getControllers());
            this.submodules.push(...module.getSubmodules());
            this.contracts.push(...module.getContracts());
            this.configs.push(...module.getConfigsSchemas());

            module.getProviders().forEach(provider => {
                const providerInstance = new provider();
                this.providersMap.set(provider.name, providerInstance);
            });

            if (module.getSubmodules().length > 0)
                this.loadModules(module.getSubmodules());
        });
    }

    protected processContracts(): void {
        this.contracts.forEach(contract => {
            const target = contract.constructor || contract;
            const prototype = target.prototype || contract.prototype;

            const controllerName = Reflect.getMetadata(
                CONTROLLER_NAME_METADATA,
                contract.constructor,
            );
            const protoPath = Reflect.getMetadata(
                PROTO_PATH_METADATA,
                contract.constructor,
            );
            const protoPackage = Reflect.getMetadata(
                PROTO_PACKAGE_METADATA,
                contract.constructor,
            );
            const fields = Reflect.getMetadata(FIELD_METADATA, prototype);
            const directMessage = Reflect.getMetadata(
                DIRECTMESSAGE_METADATA,
                contract.constructor,
            );
            const generateController = Reflect.getMetadata(
                GENERATE_CONTROLLER_METADATA,
                contract.constructor,
            );
            const generateEntities = Reflect.getMetadata(
                GENERATE_ENTITIES_METADATA,
                contract.constructor,
            );
            const auth = Reflect.getMetadata(
                AUTH_METADATA,
                contract.constructor,
            );
            const controllerCustomPath = Reflect.getMetadata(
                CONTROLLER_CUSTOM_PATH_METADATA,
                contract.constructor,
            );
            const imports = Reflect.getMetadata(
                CONTROLLER_IMPORTS,
                contract.constructor,
            );
            const cache = Reflect.getMetadata(
                CONTROLLER_CACHE,
                contract.constructor,
            );
            const viewForm = Reflect.getMetadata(
                CONTROLLER_VIEWFORM,
                contract.constructor,
            );
            const viewPage = Reflect.getMetadata(
                CONTROLLER_VIEWPAGE,
                contract.constructor,
            );

            const contractStructure = {
                controllerName,
                protoPath,
                protoPackage,
                fields,
                directMessage,
                generateController,
                generateEntities,
                auth,
                controllerCustomPath,
                imports,
                cache,
                customProto: contract.customProto,
                customTypes: contract.customTypes,
                viewForm,
                viewPage,
            };

            Scope.addToArray('__contracts', contractStructure);
        });
    }

    public getHttpAdapter(): AbstractHttpAdapter {
        return this.httpAdapter as AbstractHttpAdapter;
    }

    public getUnderlyingHttpServer() {
        this.httpAdapter.getHttpServer();
    }

    public getWSServer(): AbstractWSAdapter {
        return this.wsServer as AbstractWSAdapter;
    }

    public static create(settings?: IApplicationSettings): Application {
        return new Application(settings);
    }

    protected static async generateModule(): Promise<Module> {
        try {
            const outputPath = path.resolve('src', `app.module.ts`);

            const moduleTemplate = `// Generated automatically by CMMV

import 'reflect-metadata';
import { Module, ApplicationTranspile } from '@cmmv/core';
${Application.appModule.controllers.map(controller => `import { ${controller.name} } from '${controller.path}';`).join('\n')}
${Application.appModule.providers.map(provider => `import { ${provider.name} } from '${provider.path}';`).join('\n')}

export let ApplicationModule = new Module("app", {
    controllers: [${Application.appModule.controllers.map(controller => controller.name).join(', ')}],
    providers: [${Application.appModule.providers.map(provider => provider.name).join(', ')}],
    transpilers: [ApplicationTranspile]
});`;

            if (!fs.existsSync(path.dirname(outputPath)))
                fs.mkdirSync(path.dirname(outputPath), { recursive: true });

            await fs.writeFileSync(outputPath, moduleTemplate, 'utf8');

            const { ApplicationModule } = await import(outputPath);
            return ApplicationModule as Module;
        } catch (e) {
            console.error(e);
            new Logger('Application').error(e.message, 'generateModule');
            return null;
        }
    }

    public static setHTTPMiddleware(cb: Function) {
        Application.appModule.httpMiddlewares.push(cb);
    }

    public static setHTTPInterceptor(cb: Function) {
        Application.appModule.httpInterceptors.push(cb);
    }

    public static setHTTPAfterRender(cb: Function) {
        Application.appModule.httpAfterRender.push(cb);
    }
}
