export declare abstract class AbstractService {
    name?: string;
    removeUndefined(obj: any): {
        [k: string]: unknown;
    };
    fixId(item: any): any;
}
