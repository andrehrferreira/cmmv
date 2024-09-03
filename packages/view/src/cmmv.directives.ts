import * as fs from 'fs';
import * as path from 'path';

import { Directive, Template } from "./cmmv.template";
import { evaluate } from "./cmmv.eval";
import { Config } from "@cmmv/core";

export const sData: Directive = (templateText: string, data: Record<string, any>, template: Template): string => {
    return templateText.replace(/<([^>]+)\s+s-data=["'](.+?)["']([^>]*)>(.*?)<\/\1>/g, (match, tagName, key, attributes, innerHTML) => {
        const value = data[key.trim()];
        
        if (value !== undefined) 
            return `<${tagName} ${attributes}>${value}</${tagName}>`;
        else 
            return `<!-- s-data not found: ${key} -->`;        
    });
};

export const sAttr: Directive = (templateText: string, data: Record<string, any>, template: Template): string => {
    return templateText.replace(/<([^>]+)\s+s-attr=["'](.+?)["']([^>]*)>/g, (match, tagName, key, attributes) => {
        const value = data[key.trim()];

        if (value !== undefined) 
            return `<${tagName} ${attributes} ${key}="${value}">`;
        else 
            return `<!-- s-attr not found: ${key} -->`;        
    });
};

export const sServerData: Directive = (templateText: string, data: Record<string, any>, template: Template): string => {
    return templateText.replace(/\{(\w+)\}/g, (match, key) => {
        const value = data[key.trim()];
        return (value !== undefined)  ? value : "";
    });
};

// I18n
function loadLocaleFile(locale: string): Record<string, string> {
    const localePath = path.resolve(process.cwd(), Config.get<string>('i18n.localeFiles'), `${locale}.json`);

    if (!fs.existsSync(localePath)) {
        throw new Error(`Locale file not found: ${localePath}`);
    }

    const fileContent = fs.readFileSync(localePath, 'utf-8');
    return JSON.parse(fileContent);
}

export const i18n: Directive = (templateText: string, data: Record<string, any>, template: Template): string => {
    const locale = data.locale || Config.get<string>('i18n.default') || "en";
    const translations = loadLocaleFile(locale);

    return templateText.replace(/<(\w+)([^>]*)\s+s-i18n=["'](.+?)["']([^>]*)>(.*?)<\/\1>/g, (match, tagName, beforeAttrs, key, afterAttrs, innerHTML) => {
        const translation = translations[key.trim()];

        if (translation !== undefined) 
            return `<${tagName}${beforeAttrs}${afterAttrs}>${translation}</${tagName}>`;
        else 
            return `<!-- s-i18n not found: ${key} -->`;        
    });
};

//Layout
export const extractSetupScript = (templateText: string): object | string => {
    const regex = /<script\s+[^>]*s-setup[^>]*>([\s\S]*?)<\/script>/;
    const scriptMatch = templateText.match(regex);
    let scriptObject = null;

    if (scriptMatch) {
        const scriptContent = scriptMatch[1].trim();

        try {
            const processedScript = scriptContent.replace(/export\s+default\s+/, '').replace(/module\.exports\s*=/, '');
            const scriptFunction = new Function(`return (${processedScript})`);
            scriptObject = scriptFunction();

            if (scriptObject && typeof scriptObject === 'object' && scriptObject.default)
                return scriptObject.default;            
        } catch (e) {  }
    } 
    
    if(scriptObject){
        return { 
            html: templateText.replace(regex, () => `<!-- setup -->`),
            setup: scriptObject
        };
    }
    else {
        return templateText.replace(regex, () => `<!-- setup -->`);
    }
};

//SSR
export const ssrDirectives: Directive = async (templateText: string, data: Record<string, any>, template: Template): Promise<string> => {
    const sDirectiveRegex = /\s+s:([\w\d_]+)\s*=\s*["']([^"']+)["']/g;
    const forDirectiveRegex = /<(\w+)([^>]*)\s+(c-for|v-for)\s*=\s*["'](.*?)["']([^>]*)>(.*?)<\/\1>/gs;
    const placeholder = 'c-ssr-for';
    
    let match: RegExpExecArray | null;

    while ((match = sDirectiveRegex.exec(templateText)) !== null) {
        const [fullMatch, variableName, expression] = match;
        const result = await evaluate(data, expression);    
        template.setContext(variableName, result);
        templateText = templateText.replace(fullMatch, '');
    }

    while ((match = forDirectiveRegex.exec(templateText)) !== null) {
        const [fullMatch, tagName, beforeAttrs, directive, exp, afterAttrs, innerHTML] = match;
        const listNameMatch = exp.match(/\b(?:in|of)\s+([^\s"']+)/i);
        const listName = listNameMatch ? listNameMatch[1] : null;
        const context = template.getContext();
        const items = listName ? context[listName] : null;

        let renderedItems = '';

        if (Array.isArray(items)) {
            for (const item of items) {
                const itemData = { ...template.getContext(), item }; // Vincula item ao contexto de dados
                let itemHTML = innerHTML.replace(/\{\{\s*item\.(\w+)\s*\}\}/g, (_, key) => {
                    return item[key];
                });
                renderedItems += `<${tagName}${beforeAttrs}${afterAttrs}>${itemHTML}</${tagName}>`;
            }
        }

        renderedItems = `
        <div c-if="!loaded && !${listName}">${renderedItems}</div>
        <div c-else>${fullMatch.replace(directive, placeholder)}</div>
        `;  

        templateText = templateText.replace(fullMatch, renderedItems);
    }

    templateText = templateText.replace(new RegExp(placeholder, 'g'), 'c-for');

    return templateText;
};
