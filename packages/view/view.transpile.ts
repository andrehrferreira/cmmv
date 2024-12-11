import * as fs from 'node:fs';
import * as path from 'node:path';
import * as UglifyJS from 'uglify-js';
import { execSync } from 'node:child_process';

import { Config, ITranspile, Logger } from '@cmmv/core';

export class ViewTranspile implements ITranspile {
    private logger: Logger = new Logger('ViewTranspile');

    run(): void {
        // Frontend Controller
        const content = fs.readFileSync(
            path.resolve(__dirname, './lib/cmmv.frontend.cjs'),
            'utf-8',
        );

        const outputFile = path.resolve('public/core/1-cmmv.min.js');
        const minifiedJsContent = UglifyJS.minify(content).code;
        fs.writeFileSync(outputFile, minifiedJsContent, 'utf8');
    }
}
