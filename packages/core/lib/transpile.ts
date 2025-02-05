import * as path from 'node:path';
import * as fs from 'node:fs';

import { Logger } from './logger';

export interface ITranspile {
    run(): void;
}

export abstract class AbstractTranspile {
    public getRootPath(contract: any, context: string): string {
        let outputDir = contract.subPath
            ? path.join('src', context, contract.subPath)
            : path.join('src', context);

        if (!fs.existsSync(outputDir))
            fs.mkdirSync(outputDir, { recursive: true });

        return outputDir;
    }

    public getImportPath(contract: any, context: string, filename: string) {
        return contract.subPath
            ? `${contract.subPath
                  .split('/')
                  .map(() => '../')
                  .join('')}${context}${contract.subPath}/${filename}`
            : `../${context}/${filename}`;
    }

    public getImportPathWithoutSubPath(
        contract: any,
        context: string,
        filename: string,
    ) {
        return contract.subPath
            ? `${contract.subPath
                  .split('/')
                  .map(() => '../')
                  .join('')}${context}/${filename}`
            : `../${context}/${filename}`;
    }

    public getImportPathRelative(
        contract: any,
        contractTo: any,
        context: string,
        filename: string,
        baseFilename?: string,
    ) {
        if (contractTo.subPath === contractTo.subPath) return `./${filename}`;

        let relativePath = contractTo.subPath
            ? `${contractTo.subPath
                  .split('/')
                  .map(() => '../')
                  .join('')}${context}${contractTo.subPath}/${filename}`
            : `../${context}/${filename}`;

        return relativePath;
    }

    public removeExtraSpaces(code: string): string {
        return code
            .replace(/\n{3,}/g, '\n\n')
            .replace(/(\n\s*\n\s*\n)/g, '\n\n');
    }

    public removeTelemetry(code: string): string {
        const lines = code.split('\n');
        const filteredLines = lines.filter(
            line =>
                !line.includes('Telemetry.') && !line.includes('{ Telemetry }'),
        );
        return filteredLines.join('\n');
    }
}

export class Transpile {
    private logger: Logger = new Logger('Transpile');
    private transpilers: Array<new () => ITranspile>;

    constructor(transpilers: Array<new () => ITranspile> = []) {
        this.transpilers = transpilers;
    }

    public add(transpiler: new () => ITranspile): void {
        this.transpilers.push(transpiler);
    }

    public async transpile(): Promise<any[]> {
        try {
            const transpilePromises = this.transpilers.map(TranspilerClass => {
                if (typeof TranspilerClass == 'function') {
                    const transpiler = new TranspilerClass();
                    return transpiler.run();
                }
            });

            return Promise.all(transpilePromises);
        } catch (error) {
            console.error(error);
            this.logger.error(error);
            throw error;
        }
    }
}
