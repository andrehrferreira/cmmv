export interface AbstractHttpAdapter {
    listen(bind: string): Promise<void>;
}