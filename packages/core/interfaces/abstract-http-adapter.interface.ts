import { IHTTPSettings } from "./http-settings.interface";

export interface AbstractHttpAdapter {
    use(middlaware: any);
    listen(bind: string): Promise<void>;
    getHttpServer(): any;
}