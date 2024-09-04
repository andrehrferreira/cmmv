'use strict';

import * as fs from "fs";
import * as path from "path";
import { cwd } from "process";
import * as fg from "fast-glob";
import { minify } from 'html-minifier';

import { Config } from "@cmmv/core";
import { hasOwnOnlyObject, createNullProtoObjWherePossible } from './utils.cjs';

export type Directive = (templateText: string, data: Record<string, any>, template: Template) => string | object;

const templateCache: Record<string, string> = {};

export class Template {
    templateText: string;

    private directives: Directive[] = [];
    private nonce: string;
    private context: {} = {};

    constructor(text: string, optsParam: any) {
        const opts = hasOwnOnlyObject(optsParam);
        const options = createNullProtoObjWherePossible();
        this.templateText = text;
        this.nonce = opts.nonce || '';
    }

    use(directives: Directive | Directive[]) {
        if(Array.isArray(directives)){
            for(let key in directives)
                this.directives.push(directives[key]);
        }
        else
            this.directives.push(directives);
    }

    setContext(value: string, data: any) {
        this.context[value] = data;
    }

    getContext() {
        return this.context;
    }

    private async loadIncludes(templateText: string): Promise<string> {
        const includeRegex = /<!--\s*include\(\s*['"]([^'"]+)['"]\s*\);?\s*-->/g;
        let match;
        let resultText = templateText;

        while ((match = includeRegex.exec(templateText)) !== null) {
            const includePath = match[1];
            const resolvedPath = path.resolve(cwd(), includePath);

            if (!templateCache[resolvedPath]) {
                if (fs.existsSync(resolvedPath)) {
                    let includeContent = fs.readFileSync(resolvedPath, 'utf-8');
                    includeContent = await this.loadIncludes(includeContent);
                    templateCache[resolvedPath] = includeContent;
                }
                if (fs.existsSync(`${resolvedPath}.html`)) {
                    let includeContent = fs.readFileSync(`${resolvedPath}.html`, 'utf-8');
                    includeContent = await this.loadIncludes(includeContent);
                    templateCache[resolvedPath] = includeContent;
                }
            }

            resultText = resultText.replace(match[0], (templateCache[resolvedPath]) ? 
                templateCache[resolvedPath] : 
                `<!-- file not found: ${includePath} -->`
            );
        }

        return resultText;
    }

    private async extractInlineScripts(html: string): Promise<string> {
        const extractScript = Config.get<boolean>("view.extractInlineScript");

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
            const tempFilePath = path.resolve(tempDir, `i-${Date.now()}.cached.js`);
            scriptIndex++;
    
            fs.writeFileSync(tempFilePath, inlineScripts);
            resultHtml = resultHtml.replace(match[0], `<script src="${tempFilePath.replace(cwd(), '').replace('/public', '')}" nonce="${this.nonce}"></script>`);
        }
    
        this.parseScripts();
        await this.cleanupExpiredFiles(tempDir, 60000);
    
        return resultHtml;
    }

    private async cleanupExpiredFiles(directory: string, maxAge: number) {
        const files = await fg(`${directory}/*.cached.js`);
        const now = Date.now();

        files.forEach(file => {
            const stats = fs.statSync(file);
            const age = now - stats.mtimeMs;

            if (age > maxAge) {
                try {
                    fs.unlinkSync(file);
                } catch (error) {
                    console.error(`Erro ao remover arquivo expirado: ${file}`, error);
                }
            }
        });
    }

    private async minifyHtml(html: string): Promise<string> {
        const minifyHtml = Config.get<boolean>("view.minifyHTML") || true;
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
        let pageContents = result.html;

        if (result.setup) {
            if(result.setup.data && typeof result.setup.data === "function"){
                try{
                    let data = result.setup.data();
                    data = Object.assign({}, data, this.context);
                    let methodsAsString =""

                    if(result.setup.methods) {                        
                        methodsAsString = JSON.stringify(Object.entries(result.setup.methods).reduce((acc, [key, func]) => {
                            const funcString = func.toString();
                            const funcArgs = funcString.slice(funcString.indexOf('(') + 1, funcString.indexOf(')'));
                            const functionBody = funcString.slice(funcString.indexOf('{') + 1, funcString.lastIndexOf('}'));
                            
                            if (funcArgs.trim()) {
                                acc[key] = `function ${key}(${funcArgs}) {${functionBody}}`;
                            } else {
                                acc[key] = `function ${key}() {${functionBody}}`;
                            }
                            
                            return acc;
                        }, {}));
                    }
                    
                    const mountedAsString = result.setup.mounted 
                        ? `function mounted() {${result.setup.mounted.toString().slice(
                            result.setup.mounted.toString().indexOf('{') + 1, 
                            result.setup.mounted.toString().lastIndexOf('}')
                        )}}`
                        : null;

                    const createdAsString = result.setup.created 
                        ? `function created() {${result.setup.created.toString().slice(
                            result.setup.created.toString().indexOf('{') + 1, 
                            result.setup.created.toString().lastIndexOf('}')
                        )}}`
                        : null;

                    pageContents += `\r\n
    <script nonce="{nonce}">
        let __data = ${data ? JSON.stringify(data) : "{}"};
        let __methods = ${methodsAsString ? methodsAsString : "null"};
        let __mounted = ${mountedAsString ? JSON.stringify(mountedAsString) : "null"};
        let __created = ${createdAsString ? JSON.stringify(createdAsString) : "null"};
    </script>`;

                }
                catch { }
            }
            
            const cacheKey = result.setup.layout || "default";
            
            //Parse Layout
            if (templateCache[cacheKey]) {
                pageContents = this.parseLayout(templateCache[cacheKey], pageContents, result.setup);
            } 
            else {
                const file = path.resolve(cwd(), `./public/templates/${result.setup.layout}.html`);
                const fileSubdir = path.resolve(cwd(), `./public/templates/**/${result.setup.layout}.html`);
                const files = await fg([file, fileSubdir], { ignore: ["node_modules/**"] });

                if (files.length > 0) {
                    let templateContent = fs.readFileSync(files[0], "utf-8");
                    templateCache[cacheKey] = templateContent;
                    pageContents = this.parseLayout(templateCache[cacheKey], pageContents, result.setup);
                }
            }
        }

        return pageContents;
    }

    parseLayout(template: string, pageContents: string, setup: any) {
        pageContents = template.replace(/<slot\s*\/?>/i, pageContents);
        
        //Headers
        let headers = this.parseHead(setup);
        let title = setup.title || Config.get("head").title;
        headers = `<title>${title}</title>\n${headers}`;
  
        pageContents = pageContents.replace(/<headers\s*\/?>/i, headers);

        const scripts = this.parseScripts();
        pageContents = pageContents.replace(/<scripts\s*\/?>/i, scripts);

        return pageContents;
    }

    parseHead(setup: any) {
        let headConfig = Config.get("head");
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

                if (this.nonce) 
                    linkString += `nonce="${this.nonce}" `;
                                
                linkString += '/>\n';
                headContent += linkString;
            });
        }
    
        return headContent;
    }

    parseScripts() {
        const scripts = Config.get("scripts");
        let scriptsContent = '';
    
        if (scripts) {
            scripts.forEach((script: Record<string, string>) => {
                let scriptString = '<script ';
                
                for (const [key, value] of Object.entries(script)) 
                    scriptString += `${key}="${value}" `;

                if (this.nonce) 
                    scriptString += `nonce="${this.nonce}" `;
                                
                scriptString += '></script>\n';
                scriptsContent += scriptString;
            });
        }
    
        return scriptsContent;
    }

    deepMerge(target: any, ...sources: any[]): any {
        sources.forEach(source => {
            if (source instanceof Object) {
                Object.entries(source).forEach(([key, value]) => {
                    if (value instanceof Object && key in target) 
                        Object.assign(value, this.deepMerge(target[key], value));
                    
                    target[key] = value;
                });
            }
        });

        return target;
    }

    compile() {
        const self = this;

        return async function(data: Record<string, any>) {
            let processedText = self.templateText;
            processedText = await self.loadIncludes(processedText);

            for (const directive of self.directives) {
                const result: any = await directive(processedText, data, self);

                if(typeof result === "string")
                    processedText = result;
                else if(typeof result === "object") 
                    processedText = await self.processSetup(result);                                  
            }

            processedText = await self.extractInlineScripts(processedText);
            processedText = await self.minifyHtml(processedText);
                            
            return processedText;
        };
    }
}
