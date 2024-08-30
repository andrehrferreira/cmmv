import * as fs from 'fs';
import * as path from 'path';
import * as UglifyJS from 'uglify-js';
import { ITranspile, Logger } from "@cmmv/core";

export class ViewTranspile implements ITranspile {
    private logger: Logger = new Logger('ViewTranspile');

    run(): void {
        const content = fs.readFileSync(path.resolve(__dirname, "./cmmv.frontend.cjs"), "utf-8");
        const outputFile = path.resolve('public/core/1-cmmv.min.js');
        const minifiedJsContent = UglifyJS.minify(content).code;
        fs.writeFileSync(outputFile, minifiedJsContent, 'utf8');
        //this.logger.log(`Generated public contracts JS file at ${outputFile}`);
    }
}