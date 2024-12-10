import * as fs from 'node:fs';
import * as path from 'node:path';
import * as UglifyJS from 'uglify-js';
import { execSync } from 'node:child_process';

import { Config, ITranspile, Logger } from '@cmmv/core';

export class ViewTranspile implements ITranspile {
    private logger: Logger = new Logger('ViewTranspile');

    run(): void {
        const useTailwind = Config.get<boolean>('view.tailwind', false);

        // Frontend Controller
        const content = fs.readFileSync(
            path.resolve(__dirname, './lib/cmmv.frontend.cjs'),
            'utf-8',
        );

        const outputFile = path.resolve('public/core/1-cmmv.min.js');
        const minifiedJsContent = UglifyJS.minify(content).code;
        fs.writeFileSync(outputFile, minifiedJsContent, 'utf8');

        // Tailwind
        if (useTailwind) {
            const tailwindConfigPath = path.resolve('tailwind.config.ts');
            const outputCSSTailwind = path.resolve(
                'public/core/0-tailwind.min.css',
            );
            const inputCSSFile = path.resolve('public/tailwind.css');
            const inputCSSFileSrc = path.resolve('src/tailwind.css');

            if (fs.existsSync(inputCSSFile)) {
                execSync(
                    `npx tailwindcss -i ${inputCSSFile} -o ${outputCSSTailwind} --config ${tailwindConfigPath} --minify`,
                    { stdio: 'ignore' },
                );
                this.logger.log('Tailwind CSS compiled successfully');
            } else if (fs.existsSync(inputCSSFileSrc)) {
                execSync(
                    `npx tailwindcss -i ${inputCSSFileSrc} -o ${outputCSSTailwind} --config ${tailwindConfigPath} --minify`,
                    { stdio: 'ignore' },
                );
                this.logger.log('Tailwind CSS compiled successfully');
            } else {
                this.logger.warning(
                    'Unable to generate Tailwind file because input not found in /public/tailwind.css or /src/tailwind.css',
                );
            }
        }
    }
}
