'use strict';

import * as fs from "fs";
import * as path from "path";
import { cwd } from "process";
import * as fg from "fast-glob";

import { Config } from "@cmmv/core";
import { hasOwnOnlyObject, createNullProtoObjWherePossible } from './utils.cjs';

export type Directive = (templateText: string, data: Record<string, any>) => string | object;

const templateCache: Record<string, string> = {};

export class Template {
    templateText: string;

    private directives: Directive[] = [];

    constructor(text: string, optsParam: any) {
        const opts = hasOwnOnlyObject(optsParam);
        const options = createNullProtoObjWherePossible();
        this.templateText = text;
    }

    use(directives: Directive | Directive[]) {
        if(Array.isArray(directives)){
            for(let key in directives)
                this.directives.push(directives[key]);
        }
        else
            this.directives.push(directives);
    }

    async processSetup(result) {
        let pageContents = result.html;

        if (result.setup) {
            if(result.setup.data && typeof result.setup.data === "function"){
                try{
                    const data = result.setup.data();

                    const methodsAsString = JSON.stringify(Object.entries(result.setup.methods).reduce((acc, [key, func]) => {
                        const funcString = func.toString();
                        const functionBody = funcString.slice(funcString.indexOf('{') + 1, funcString.lastIndexOf('}'));
                        
                        acc[key] = `function ${key}() {${functionBody}}`;
                        return acc;
                    }, {}));

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
                    <script nonce="{nonceData}">
                        let __data = ${JSON.stringify(data)};
                        let __methods = ${methodsAsString};
                        let __mounted = ${JSON.stringify(mountedAsString)};
                        let __created = ${JSON.stringify(createdAsString)};
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

            for (const directive of self.directives) {
                const result: any = directive(processedText, data);

                if(typeof result === "string")
                    processedText = result;
                else if(typeof result === "object") 
                    processedText = await self.processSetup(result);                                  
            }
                            
            return processedText;
        };
    }
}
