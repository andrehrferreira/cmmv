import * as fs from 'fs';
import * as path from 'path';
import * as UglifyJS from 'uglify-js';
import { ITranspile, Logger } from "@cmmv/core";

export class ViewTranspile implements ITranspile {
    private logger: Logger = new Logger('ViewTranspile');

    run(): void {
        // Reactivity
        const reactivity = fs.readFileSync(path.resolve(__dirname, "../node_modules/@cmmv/reactivity/dist/reactivity.iife.js"), "utf-8");
        const outputFileReactivity = path.resolve('public/core/0-reactivity.min.js');
        const minifiedJsReactivity = UglifyJS.minify(reactivity).code;
        fs.writeFileSync(outputFileReactivity, minifiedJsReactivity, 'utf8');

        // Frontend Controller 
        const content = fs.readFileSync(path.resolve(__dirname, "./cmmv.frontend.cjs"), "utf-8");
        const outputFile = path.resolve('public/core/1-cmmv.min.js');
        const minifiedJsContent = UglifyJS.minify(content).code;
        fs.writeFileSync(outputFile, minifiedJsContent, 'utf8');
    }
}