"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Application = void 0;
const fs = require("fs");
const path = require("path");
const fg = require("fast-glob");
const Terser = require("terser");
const _1 = require(".");
const decorators_1 = require("../decorators");
const transpilers_1 = require("../transpilers");
class Application {
    constructor(settings) {
        this.logger = new _1.Logger('Application');
        this.wSConnections = new Map();
        this.controllers = [];
        this.submodules = [];
        this.providersMap = new Map();
        this.logger.log('Initialize application');
        _1.Config.loadConfig();
        const env = _1.Config.get('env');
        this.httpOptions = settings.httpOptions || {};
        this.httpAdapter = new settings.httpAdapter();
        if (this.httpAdapter) {
            settings?.httpMiddlewares?.forEach(middleware => {
                this.httpAdapter.use(middleware);
            });
            if (settings.wsAdapter)
                this.wsAdapter = new settings.wsAdapter(this.httpAdapter);
            this.host = _1.Config.get('server.host') || '0.0.0.0';
            this.port = _1.Config.get('server.port') || 3000;
            this.transpilers = settings.transpilers || [];
            this.modules = settings.modules || [];
            this.contracts =
                settings.contracts?.map(contractClass => new contractClass()) ||
                    [];
            this.initialize(settings);
        }
        else {
            throw new Error('Unable to start HTTP adapter');
        }
    }
    async initialize(settings) {
        try {
            const env = _1.Config.get('env');
            this.loadModules(this.modules);
            this.processContracts();
            this.transpilers.push(transpilers_1.ApplicationTranspile);
            if (env === 'dev' || env === 'development' || env === 'build') {
                if (this.transpilers.length > 0) {
                    const transpile = new _1.Transpile(this.transpilers);
                    await transpile.transpile();
                    this.logger.log('All transpilers executed successfully.');
                }
                else {
                    this.logger.log('No transpilers provided.');
                }
                const appModel = await Application.generateModule();
                if (appModel)
                    this.loadModules([...this.modules, appModel]);
                this.createScriptBundle();
                this.createCSSBundle();
            }
            else {
                const tsconfig = new Function(`return(${fs.readFileSync(path.resolve('./tsconfig.json'), 'utf-8')})`)();
                const outputPath = path.resolve(tsconfig.compilerOptions.outDir, `app.module.js`);
                if (fs.existsSync(outputPath)) {
                    const { ApplicationModule } = await Promise.resolve(`${outputPath}`).then(s => require(s));
                    this.loadModules([...this.modules, ApplicationModule]);
                }
                else {
                    this.loadModules([...this.modules]);
                }
            }
            const servicesLoad = [];
            settings.services?.forEach(async (service) => {
                if (service && typeof service.loadConfig === 'function')
                    servicesLoad.push(service?.loadConfig(this));
            });
            await Promise.all(servicesLoad);
            await this.httpAdapter.init(this, this.httpOptions);
            Application.appModule.httpMiddlewares?.forEach(middleware => {
                this.httpAdapter.use(middleware);
            });
            if (this.wsAdapter)
                this.wsServer = this.wsAdapter.create(this.httpAdapter, this);
            await this.httpAdapter
                .listen(`${this.host}:${this.port}`)
                .then(() => {
                this.logger.log(`Server HTTP successfully started on ${this.host}:${this.port}`);
            })
                .catch(error => {
                this.logger.error(`Failed to start HTTP server on ${this.httpBind}: ${error.message || error}`);
            });
        }
        catch (error) {
            console.log(error);
            this.logger.error(`Failed to initialize application: ${error.message || error}`);
        }
    }
    async createScriptBundle() {
        const dirBuild = path.resolve('./public/assets');
        if (!fs.existsSync(dirBuild))
            fs.mkdirSync(dirBuild, { recursive: true });
        const finalbundle = path.resolve('./public/assets/bundle.min.js');
        const files = await fg(path.resolve('./public/core/*.min.js'), {
            ignore: ['node_modules/**'],
        });
        const lines = [];
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
            output: { beautify: false },
        });
        fs.writeFileSync(finalbundle, result.code, { encoding: 'utf-8' });
    }
    async createCSSBundle() {
        const dirBuild = path.resolve('./public/assets');
        if (!fs.existsSync(dirBuild))
            fs.mkdirSync(dirBuild, { recursive: true });
        const finalbundle = path.resolve('./public/assets/bundle.min.css');
        const files = await fg(path.resolve('./public/core/*.min.css'), {
            ignore: ['node_modules/**'],
        });
        const lines = [];
        lines.push('/* Generated automatically by CMMV */');
        files.forEach(file => {
            lines.push(fs.readFileSync(file, 'utf-8'));
            lines.push('');
        });
        const bundleContent = lines.join('\n');
        fs.writeFileSync(finalbundle, bundleContent, { encoding: 'utf-8' });
    }
    loadModules(modules) {
        modules.forEach(module => {
            this.transpilers.push(...module.getTranspilers());
            this.controllers.push(...module.getControllers());
            this.submodules.push(...module.getSubmodules());
            this.contracts.push(...module.getContracts());
            module.getProviders().forEach(provider => {
                const providerInstance = new provider();
                this.providersMap.set(provider.name, providerInstance);
            });
            if (module.getSubmodules().length > 0)
                this.loadModules(module.getSubmodules());
        });
    }
    processContracts() {
        this.contracts.forEach(contract => {
            const target = contract.constructor || contract;
            const prototype = target.prototype || contract.prototype;
            const controllerName = Reflect.getMetadata(decorators_1.CONTROLLER_NAME_METADATA, contract.constructor);
            const protoPath = Reflect.getMetadata(decorators_1.PROTO_PATH_METADATA, contract.constructor);
            const protoPackage = Reflect.getMetadata(decorators_1.PROTO_PACKAGE_METADATA, contract.constructor);
            const fields = Reflect.getMetadata(decorators_1.FIELD_METADATA, prototype);
            const directMessage = Reflect.getMetadata(decorators_1.DIRECTMESSAGE_METADATA, contract.constructor);
            const generateController = Reflect.getMetadata(decorators_1.GENERATE_CONTROLLER_METADATA, contract.constructor);
            const generateEntities = Reflect.getMetadata(decorators_1.GENERATE_ENTITIES_METADATA, contract.constructor);
            const auth = Reflect.getMetadata(decorators_1.AUTH_METADATA, contract.constructor);
            const controllerCustomPath = Reflect.getMetadata(decorators_1.CONTROLLER_CUSTOM_PATH_METADATA, contract.constructor);
            const imports = Reflect.getMetadata(decorators_1.CONTROLLER_IMPORTS, contract.constructor);
            const cache = Reflect.getMetadata(decorators_1.CONTROLLER_CACHE, contract.constructor);
            const viewForm = Reflect.getMetadata(decorators_1.CONTROLLER_VIEWFORM, contract.constructor);
            const viewPage = Reflect.getMetadata(decorators_1.CONTROLLER_VIEWPAGE, contract.constructor);
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
            _1.Scope.addToArray('__contracts', contractStructure);
        });
    }
    getHttpAdapter() {
        return this.httpAdapter;
    }
    getUnderlyingHttpServer() {
        this.httpAdapter.getHttpServer();
    }
    getWSServer() {
        return this.wsServer;
    }
    static create(settings) {
        return new Application(settings);
    }
    static async generateModule() {
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
            const { ApplicationModule } = await Promise.resolve(`${outputPath}`).then(s => require(s));
            return ApplicationModule;
        }
        catch (e) {
            console.error(e);
            new _1.Logger('Application').error(e.message, 'generateModule');
            return null;
        }
    }
    static setHTTPMiddleware(cb) {
        Application.appModule.httpMiddlewares.push(cb);
    }
    static setHTTPInterceptor(cb) {
        Application.appModule.httpInterceptors.push(cb);
    }
    static setHTTPAfterRender(cb) {
        Application.appModule.httpAfterRender.push(cb);
    }
}
exports.Application = Application;
Application.appModule = {
    controllers: [],
    providers: [],
    httpMiddlewares: [],
    httpInterceptors: [],
    httpAfterRender: [],
};
