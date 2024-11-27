import { ITranspile } from '@cmmv/core';
export declare class ProtobufTranspile implements ITranspile {
    private logger;
    run(): void;
    private generateProtoContent;
    private generateTypes;
    private generateContractsJs;
    returnContractJs(): Promise<string>;
    private mapToProtoType;
    private mapToTsType;
}
