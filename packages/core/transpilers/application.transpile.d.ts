import { ITranspile } from '../lib';
export declare class ApplicationTranspile implements ITranspile {
    private logger;
    run(): void;
    private generateModel;
    private generateClassImports;
    private generateClassField;
    private mapToTsType;
    private generateJsonSchemaField;
    private mapToJsonSchemaType;
}
