import { ITranspile } from "@cmmv/core";

export class ExpressTranspile implements ITranspile {
    run(): Promise<any> {
        throw new Error("Method not implemented.");
    }
}