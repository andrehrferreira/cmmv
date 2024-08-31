import * as fs from 'fs';
import * as path from 'path';

import { Directive } from "./cmmv.template";
import { Config } from "@cmmv/core";

export const sData: Directive = (templateText: string, data: Record<string, any>): string => {
    return templateText.replace(/<([^>]+)\s+s-data=["'](.+?)["']([^>]*)>(.*?)<\/\1>/g, (match, tagName, key, attributes, innerHTML) => {
        const value = data[key.trim()];
        
        if (value !== undefined) 
            return `<${tagName} ${attributes}>${value}</${tagName}>`;
        else 
            return `<!-- s-data not found: ${key} -->`;        
    });
};

export const sAttr: Directive = (templateText: string, data: Record<string, any>): string => {
    return templateText.replace(/<([^>]+)\s+s-attr=["'](.+?)["']([^>]*)>/g, (match, tagName, key, attributes) => {
        const value = data[key.trim()];

        if (value !== undefined) 
            return `<${tagName} ${attributes} ${key}="${value}">`;
        else 
            return `<!-- s-attr not found: ${key} -->`;        
    });
};

export const sServerData: Directive = (templateText: string, data: Record<string, any>): string => {
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

export const i18n: Directive = (templateText: string, data: Record<string, any>): string => {
    const locale = data.locale || Config.get<string>('i18n.default') || "en";
    const translations = loadLocaleFile(locale);

    return templateText.replace(/<([^>]+)\s+s-i18n=["'](.+?)["']([^>]*)>(.*?)<\/\1>/g, (match, tagName, key, attributes, innerHTML) => {
        const translation = translations[key.trim()];

        if (translation !== undefined) 
            return `<${tagName} ${attributes}>${translation}</${tagName}>`;
        else 
            return `<!-- s-i18n not found: ${key} -->`;        
    });
};

//Layout
export const extractSetupScript = (templateText: string, data: Record<string, any>): object | string => {
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