import { AbstractHttpAdapter, IHTTPSettings } from "./interfaces";
import { ITranspile, Logger, Transpile } from './utils';
import { IModule } from "./module";

export interface IApplicationSettings {
    httpAdapter: new (settings: IHTTPSettings) => AbstractHttpAdapter,
    httpBind: string,
    httpOptions?: IHTTPSettings;
    transpilers?: Array<new () => ITranspile>;
    modules?: Array<IModule>;
}

export class Application {
    private logger: Logger = new Logger('Application');
    private httpAdapter: AbstractHttpAdapter;
    private httpBind: string;
    private httpOptions: IHTTPSettings;
    private modules: Array<IModule>;
    private transpilers: Array<new () => ITranspile>;
    
    private constructor(settings: IApplicationSettings) {
        this.httpOptions = settings.httpOptions || {};
        this.httpAdapter = new settings.httpAdapter(this.httpOptions);
        this.httpBind = settings.httpBind;
        this.transpilers = settings.transpilers || [];
        this.modules = settings.modules || [];
        this.initialize();
    }

    private async initialize(): Promise<void> {
        try {
            if (this.transpilers.length > 0) {
                const transpile = new Transpile(this.transpilers);
                await transpile.transpile();
                this.logger.log("All transpilers executed successfully.");
            } 
            else {
                this.logger.log("No transpilers provided.");
            }

            await this.httpAdapter.listen(this.httpBind).then(() => {
                this.logger.log(`Server HTTP successfully started on ${this.httpBind}`);
            }).catch((error) => {
                this.logger.error(`Failed to start HTTP server on ${this.httpBind}: ${error.message || error}`);
            });
        } 
        catch (error) {
            this.logger.error(`Failed to initialize application: ${error.message || error}`);
        }
    }

    public static create(settings: IApplicationSettings): Application {
        return new Application(settings);
    }
}
