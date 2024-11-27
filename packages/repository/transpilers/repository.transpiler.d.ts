import { ITranspile } from '@cmmv/core';
export declare class RepositoryTranspile implements ITranspile {
    private logger;
    run(): void;
    private generateEntity;
    private generateService;
    private generateIndexes;
    private generateField;
    private generateColumnOptions;
    private mapToTsType;
    private mapToTypeORMType;
}
