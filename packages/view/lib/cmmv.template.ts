'use strict';

import * as fs from 'fs';
import * as path from 'path';
import { cwd } from 'process';
import * as fg from 'fast-glob';
import * as UglifyJS from 'uglify-js';
import { minify } from 'html-minifier';

import { Config, Telemetry } from '@cmmv/core';

import { hasOwnOnlyObject, createNullProtoObjWherePossible } from './utils.cjs';
import { ViewRegistry } from '../registries/view.registry';

export type Directive = (
    templateText: string,
    data: Record<string, any>,
    template: Template,
) => string | object;

const templateCache: Record<string, string> = {};

export class Template {
    templateText: string;

    private directives: Directive[] = [];
    private nonce: string;
    private context: any = {};

    constructor(text?: string, optsParam?: any) {
        const opts = hasOwnOnlyObject(optsParam);
        const options = createNullProtoObjWherePossible();
        this.templateText = text;
        this.nonce = opts.nonce || '';
    }

    use(directives: Directive | Directive[]) {
        if (Array.isArray(directives)) {
            for (const key in directives) this.directives.push(directives[key]);
        } else this.directives.push(directives);
    }

    setContext(value: string, data: any) {
        this.context[value] = data;
    }

    getContext() {
        return this.context;
    }

    private async loadIncludes(templateText: string): Promise<string> {
        Telemetry.start('Load Includes', this.context.requestId);
        const includeRegex =
            /<!--\s*include\(\s*['"]([^'"]+)['"]\s*\);?\s*-->/g;
        let match;
        let resultText = templateText;

        while ((match = includeRegex.exec(templateText)) !== null) {
            const includePath = match[1];
            const resolvedPath = path.resolve(cwd(), includePath);
            const resolvedPathSimplifly = path.resolve(
                cwd(),
                'public',
                'views',
                includePath,
            );

            if (
                !templateCache[resolvedPath] &&
                !templateCache[resolvedPathSimplifly]
            ) {
                if (fs.existsSync(resolvedPath)) {
                    let includeContent = fs.readFileSync(resolvedPath, 'utf-8');
                    includeContent = await this.loadIncludes(includeContent);
                    templateCache[resolvedPath] = includeContent;
                } else if (fs.existsSync(`${resolvedPath}.html`)) {
                    let includeContent = fs.readFileSync(
                        `${resolvedPath}.html`,
                        'utf-8',
                    );
                    includeContent = await this.loadIncludes(includeContent);
                    templateCache[resolvedPath] = includeContent;
                } else if (fs.existsSync(resolvedPathSimplifly)) {
                    let includeContent = fs.readFileSync(
                        resolvedPathSimplifly,
                        'utf-8',
                    );
                    includeContent = await this.loadIncludes(includeContent);
                    templateCache[resolvedPathSimplifly] = includeContent;
                } else if (fs.existsSync(`${resolvedPathSimplifly}.html`)) {
                    let includeContent = fs.readFileSync(
                        `${resolvedPathSimplifly}.html`,
                        'utf-8',
                    );
                    includeContent = await this.loadIncludes(includeContent);
                    templateCache[resolvedPathSimplifly] = includeContent;
                }
            }

            const template =
                templateCache[resolvedPath] ||
                templateCache[resolvedPathSimplifly];

            resultText = resultText.replace(
                match[0],
                template ? template : `<!-- file not found: ${includePath} -->`,
            );
        }

        Telemetry.end('Load Includes', this.context.requestId);
        return resultText;
    }

    private async extractInlineScripts(html: string): Promise<string> {
        const extractScript = Config.get<boolean>('view.extractInlineScript');

        if (!extractScript) return html;

        const scriptRegex = /<script(?!.*src).*?>([\s\S]*?)<\/script>/gi;
        let match;
        let inlineScripts = '';
        let resultHtml = html;
        let scriptIndex = 0;

        const tempDir = path.resolve(cwd(), './public/assets');

        if (!fs.existsSync(tempDir)) {
            fs.mkdirSync(tempDir, { recursive: true });
        }

        while ((match = scriptRegex.exec(html)) !== null) {
            inlineScripts = match[1];
            const tempFilePath = path.resolve(
                tempDir,
                `i-${Date.now()}-${scriptIndex}.cached.js`,
            );
            scriptIndex++;

            fs.writeFileSync(tempFilePath, inlineScripts);
            resultHtml = resultHtml.replace(
                match[0],
                `<script src="${tempFilePath.replace(cwd(), '').replace('/public', '')}" nonce="${this.nonce}"></script>`,
            );
        }

        this.parseScripts();
        await this.cleanupExpiredFiles(tempDir, 60000);

        return resultHtml;
    }

    private async cleanupExpiredFiles(directory: string, maxAge: number) {
        Telemetry.start('Cleanup Expired Files', this.context.requestId);
        const files = await fg(`${directory}/*.cached.js`);
        const now = Date.now();

        files.forEach(file => {
            const stats = fs.statSync(file);
            const age = now - stats.mtimeMs;

            if (age > maxAge) {
                try {
                    fs.unlinkSync(file);
                } catch (error) {
                    console.error(
                        `Erro ao remover arquivo expirado: ${file}`,
                        error,
                    );
                }
            }
        });

        Telemetry.end('Cleanup Expired Files', this.context.requestId);
    }

    private async minifyHtml(html: string): Promise<string> {
        const minifyHtml = Config.get<boolean>('view.minifyHTML') || true;
        if (!minifyHtml) return html;

        return minify(html, {
            removeAttributeQuotes: true,
            collapseWhitespace: true,
            removeComments: true,
            minifyCSS: true,
            minifyJS: true,
            removeEmptyAttributes: true,
        });
    }

    async processSetup(result) {
        Telemetry.start('Process Setup', this.context.requestId);
        let pageContents = result.html;

        let data = {};

        if (result.setup) {
            if (result.setup.data && typeof result.setup.data === 'function') {
                try {
                    const config = Config.getAll();
                    data = result.setup.data();

                    data = Object.assign(
                        {
                            config: {
                                rpc: config.rpc,
                            },
                        },
                        data,
                        this.context,
                    );
                } catch (e) {
                    console.error(e);
                }
            }

            let methodsAsString = '';

            if (result.setup.methods) {
                methodsAsString = JSON.stringify(
                    Object.entries(result.setup.methods).reduce(
                        (acc, [key, func]) => {
                            const funcString = func.toString();
                            const funcArgs = funcString.slice(
                                funcString.indexOf('(') + 1,
                                funcString.indexOf(')'),
                            );
                            const functionBody = funcString.slice(
                                funcString.indexOf('{') + 1,
                                funcString.lastIndexOf('}'),
                            );

                            if (funcArgs.trim()) {
                                acc[key] =
                                    `function ${key}(${funcArgs}) {${functionBody}}`;
                            } else {
                                acc[key] =
                                    `function ${key}() {${functionBody}}`;
                            }

                            return acc;
                        },
                        {},
                    ),
                );
            }

            const mountedAsString = result.setup.mounted
                ? `function mounted() {${result.setup.mounted
                      .toString()
                      .slice(
                          result.setup.mounted.toString().indexOf('{') + 1,
                          result.setup.mounted.toString().lastIndexOf('}'),
                      )}}`
                : null;

            const createdAsString = result.setup.created
                ? `function created() {${result.setup.created
                      .toString()
                      .slice(
                          result.setup.created.toString().indexOf('{') + 1,
                          result.setup.created.toString().lastIndexOf('}'),
                      )}}`
                : null;

            const componentsAsString = {};
            if (result.setup.components) {
                for (const componentName in result.setup.components) {
                    componentsAsString[componentName] = {};

                    for (const field in result.setup.components[
                        componentName
                    ]) {
                        const fieldSyntax =
                            result.setup.components[componentName][field];
                        if (typeof fieldSyntax === 'function') {
                            componentsAsString[componentName][field] =
                                `function ${field}() {${fieldSyntax
                                    .toString()
                                    .slice(
                                        fieldSyntax.toString().indexOf('{') + 1,
                                        fieldSyntax.toString().lastIndexOf('}'),
                                    )}}`;
                        } else if (field === 'methods') {
                            for (const methodName in fieldSyntax) {
                                componentsAsString[componentName][methodName] =
                                    `function ${methodName}() {${fieldSyntax[
                                        methodName
                                    ]
                                        .toString()
                                        .slice(
                                            fieldSyntax[methodName]
                                                .toString()
                                                .indexOf('{') + 1,
                                            fieldSyntax
                                                .toString()
                                                .lastIndexOf('}'),
                                        )}}`;
                            }
                        } else {
                            componentsAsString[componentName][field] =
                                result.setup.components[componentName][field];
                        }
                    }
                }
            }

            let jsContent = `// Generated automatically by CMMV\n`;
            jsContent += `(function(global) {
                try {          
                    if(!global.cmmvSetup)
                        global.cmmvSetup = {};

                    global.cmmvSetup.__data = ${data ? JSON.stringify(data) : '{}'};
                    global.cmmvSetup.__components = ${componentsAsString ? JSON.stringify(componentsAsString) : '{}'};
                    global.cmmvSetup.__methods = ${methodsAsString ? methodsAsString : 'null'};
                    global.cmmvSetup.__mounted = ${mountedAsString ? JSON.stringify(mountedAsString) : 'null'};
                    global.cmmvSetup.__created = ${createdAsString ? JSON.stringify(createdAsString) : 'null'};
                    global.cmmvSetup.__styles = ${JSON.stringify(ViewRegistry.retrieveAll())}
                } catch (e) {
                    console.error("Error loading contracts or initializing app data:", e);
                }
                })(typeof window !== "undefined" ? window : global);`;

            pageContents += `<script nonce="{nonce}">${
                UglifyJS.minify(jsContent, {
                    compress: {
                        drop_console: true,
                        dead_code: true,
                        conditionals: true,
                    },
                    mangle: true,
                    output: {
                        beautify: false,
                    },
                }).code
            }</script>`;

            const cacheKey = result.setup.layout || 'default';

            //Parse Layout
            if (templateCache[cacheKey]) {
                pageContents = this.parseLayout(
                    templateCache[cacheKey],
                    pageContents,
                    result.setup,
                );
            } else {
                const file = path.resolve(
                    cwd(),
                    `./public/templates/${result.setup.layout}.html`,
                );
                const fileSubdir = path.resolve(
                    cwd(),
                    `./public/templates/**/${result.setup.layout}.html`,
                );
                const files = await fg([file, fileSubdir], {
                    ignore: ['node_modules/**'],
                });

                if (files.length > 0) {
                    const templateContent = fs.readFileSync(files[0], 'utf-8');
                    templateCache[cacheKey] = templateContent;
                    pageContents = this.parseLayout(
                        templateCache[cacheKey],
                        pageContents,
                        result.setup,
                    );
                }
            }
        }

        Telemetry.end('Process Setup', this.context.requestId);
        return pageContents;
    }

    parseLayout(template: string, pageContents: string, setup: any) {
        pageContents = template.replace(/<slot\s*\/?>/i, pageContents);

        //Headers
        let headers = this.parseHead(setup);
        const title = setup.title || Config.get('head').title;

        headers = `
            <title>${title}</title>\n
            ${headers}\n
            <script nonce="${this.nonce}">
                var process = { env: { NODE_ENV: '${process.env.NODE_ENV}' } };
            </script>
        `;

        pageContents = pageContents.replace(/<headers\s*\/?>/i, headers);

        const scripts = this.parseScripts();
        pageContents = pageContents.replace(/<scripts\s*\/?>/i, scripts);

        return pageContents;
    }

    parseHead(setup: any) {
        let headConfig = Config.get('head');
        headConfig = this.deepMerge({}, headConfig, setup.head);
        let headContent = '';

        if (headConfig.meta) {
            headConfig.meta.forEach((meta: Record<string, string>) => {
                let metaString = '<meta ';

                for (const [key, value] of Object.entries(meta))
                    metaString += `${key}="${value}" `;

                metaString += '/>\n';
                headContent += metaString;
            });
        }

        if (headConfig.link) {
            headConfig.link.forEach((link: Record<string, string>) => {
                let linkString = '<link ';

                for (const [key, value] of Object.entries(link))
                    linkString += `${key}="${value}" `;

                if (this.nonce) linkString += `nonce="${this.nonce}" `;

                linkString += '/>\n';
                headContent += linkString;
            });
        }

        return headContent;
    }

    parseScripts() {
        const scripts = Config.get('scripts');
        let scriptsContent = '';

        if (scripts) {
            scripts.forEach((script: Record<string, string>) => {
                let scriptString = '<script ';

                for (const [key, value] of Object.entries(script))
                    scriptString += `${key}="${value}" `;

                if (this.nonce) scriptString += `nonce="${this.nonce}" `;

                scriptString += '></script>\n';
                scriptsContent += scriptString;
            });
        }

        return scriptsContent;
    }

    deepMerge(target: any, ...sources: any[]): any {
        sources.forEach(source => {
            if (source instanceof Object && !Array.isArray(source)) {
                Object.entries(source).forEach(([key, value]) => {
                    if (Array.isArray(value)) {
                        if (!target[key]) target[key] = [];

                        if (key === 'meta' || key === 'link') {
                            value.forEach(item => {
                                if (
                                    !target[key].some((existingItem: any) =>
                                        this.isEqualObject(existingItem, item),
                                    )
                                ) {
                                    target[key].push(item);
                                }
                            });
                        } else {
                            target[key] = [
                                ...new Set([...target[key], ...value]),
                            ];
                        }
                    } else if (
                        value instanceof Object &&
                        !Array.isArray(value)
                    ) {
                        if (!target[key]) target[key] = {};

                        this.deepMerge(target[key], value);
                    } else {
                        target[key] = value;
                    }
                });
            }
        });

        return target;
    }

    isEqualObject(obj1: any, obj2: any): boolean {
        return JSON.stringify(obj1) === JSON.stringify(obj2);
    }

    compile() {
        const self = this;

        return async function (data: Record<string, any>) {
            Telemetry.start('Compile Template', data.requestId);
            self.context.requestId = data.requestId;

            let processedText = self.templateText;
            processedText = await self.loadIncludes(processedText);

            for (const directive of self.directives) {
                const result: any = await directive(processedText, data, self);

                if (typeof result === 'string') processedText = result;
                else if (typeof result === 'object')
                    processedText = await self.processSetup(result);
            }

            Telemetry.end('Compile Template', data.requestId);
            Telemetry.end('Request Process', data.requestId);

            if (process.env.NODE_ENV === 'dev') {
                processedText = processedText.replace(
                    `<\/body>`,
                    `<script nonce="${self.nonce}">
                (function(global) {
                    try {          
                        if(!global.cmmvTelemetry)
                            global.cmmvTelemetry = ${
                                process.env.NODE_ENV === 'dev'
                                    ? JSON.stringify(
                                          Telemetry.getTelemetry(
                                              data.requestId,
                                          ),
                                      )
                                    : '{}'
                            };
                    } catch (e) { }
                })(typeof window !== "undefined" ? window : global);
                </script>
                </body>`,
                );
            }

            processedText = await self.extractInlineScripts(processedText);
            processedText = await self.minifyHtml(processedText);
            Telemetry.clearTelemetry(data.requestId);

            return processedText;
        };
    }
}
