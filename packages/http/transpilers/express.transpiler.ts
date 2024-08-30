import { ITranspile, Logger } from "@cmmv/core";

export class ExpressTranspile implements ITranspile {
    private logger: Logger = new Logger('ExpressTranspile');

    run(): void {
        this.logger.log("Run ExpressTranspile")
    }
}