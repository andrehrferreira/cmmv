import * as fs from 'fs';
import * as path from 'path';

import { getValueFromKey } from './cmmv.utils';
import { Directive, Template } from './cmmv.template';
import { evaluate, evaluateAsync } from './cmmv.eval';
import { Config } from '@cmmv/core';

export const sData: Directive = async (
    templateText: string,
    data: Record<string, any>,
    template: Template,
): Promise<string> => {
    return templateText.replace(
        /<([^>]+)\s([^>]+)s-data=["'](.+?)["']([^>]*)>(.*?)<\/\1>/g,
        (match, tagName, attributesBefore, key, attributesAfter, innerHTML) => {
            const value = getValueFromKey(data, key.trim());

            if (value !== undefined)
                return `<${tagName} ${attributesBefore} ${attributesAfter}>${value}</${tagName}>`;
            else return `<!-- s-data not found: ${key} -->`;
        },
    );
};

export const sAttr: Directive = (
    templateText: string,
    data: Record<string, any>,
    template: Template,
): string => {
    return templateText.replace(
        /<([^>]+)\s+s-attr=["'](.+?)["']([^>]*)>/g,
        (match, tagName, key, attributes) => {
            const value = getValueFromKey(data, key.trim());

            if (value !== undefined)
                return `<${tagName} ${attributes} ${key}="${value}">`;
            else return `<!-- s-attr not found: ${key} -->`;
        },
    );
};

export const sServerData: Directive = (
    templateText: string,
    data: Record<string, any>,
    template: Template,
): string => {
    return templateText.replace(/\{(\w+)\}/g, (match, key) => {
        const value = getValueFromKey(data, key.trim());
        return value !== undefined ? value : '';
    });
};

// I18n
function loadLocaleFile(locale: string): Record<string, string> {
    const localePath = path.resolve(
        process.cwd(),
        Config.get<string>('i18n.localeFiles'),
        `${locale}.json`,
    );

    if (!fs.existsSync(localePath))
        throw new Error(`Locale file not found: ${localePath}`);

    const fileContent = fs.readFileSync(localePath, 'utf-8');
    return JSON.parse(fileContent);
}

export const i18n: Directive = (
    templateText: string,
    data: Record<string, any>,
    template: Template,
): string => {
    const locale = data.locale || Config.get<string>('i18n.default') || 'en';
    const translations = loadLocaleFile(locale);

    return templateText.replace(
        /<(\w+)([^>]*)\s+s-i18n=["'](.+?)["']([^>]*)>(.*?)<\/\1>/g,
        (match, tagName, beforeAttrs, key, afterAttrs, innerHTML) => {
            const translation = translations[key?.trim()];

            if (translation)
                return `<${tagName}${beforeAttrs}${afterAttrs}>${translation}</${tagName}>`;
            else return `<!-- s-i18n not found: ${key} -->`;
        },
    );
};

//Layout
export const extractSetupScript = (templateText: string): object | string => {
    const regex = /<script\s+[^>]*s-setup[^>]*>([\s\S]*?)<\/script>/;
    const scriptMatch = templateText.match(regex);
    let scriptObject = null;

    if (scriptMatch) {
        const scriptContent = scriptMatch[1].trim();

        try {
            const processedScript = scriptContent
                .replace(/export\s+default\s+/, '')
                .replace(/module\.exports\s*=/, '');
            const scriptFunction = new Function(`return (${processedScript})`);
            scriptObject = scriptFunction();

            if (
                scriptObject &&
                typeof scriptObject === 'object' &&
                scriptObject.default
            )
                return scriptObject.default;
        } catch (e) {}
    }

    if (scriptObject) {
        return {
            html: templateText.replace(regex, () => `<!-- setup -->`),
            setup: scriptObject,
        };
    } else {
        return templateText.replace(regex, () => `<!-- setup -->`);
    }
};

//SSR
function forSSR(templateText: string, template: Template) {
    const forDirectiveRegex =
        /<(\w[-\w]*)([^>]*)\s+(c-for|v-for)\s*=\s*["'](.*?)["']([^>]*)>(.*?)<\/\1>/gs;
    const attrDirectiveRegex =
        /\s+(c-text|c-html|:ref)\s*=\s*["']([^"']+)["']/g;
    const placeholder = 'c-ssr-for';
    let match: RegExpExecArray | null;

    while ((match = forDirectiveRegex.exec(templateText)) !== null) {
        const [
            fullMatch,
            tagName,
            beforeAttrs,
            directive,
            exp,
            afterAttrs,
            innerHTML,
        ] = match;

        const [_, variables] =
            exp.match(/^\s*\(([^)]+)\)\s+in\s+|^\s*([^ ]+)\s+of\s+/) || [];
        const [itemVar, keyVar] = variables
            ? variables.split(',').map(v => v.trim())
            : [variables, null];
        const listName = exp.match(/\b(?:in|of)\s+([^\s"']+)/i)?.[1];
        const context = template.getContext();
        const items = listName ? context[listName] : null;
        const renderTagMatch = /render-tag\s*=\s*["']([^"']+)["']/i.exec(
            fullMatch,
        );
        const renderTag = renderTagMatch ? renderTagMatch[1] : 'div';

        let renderedItems = '';

        if (Array.isArray(items)) {
            for (const item of items) {
                const itemData = { ...context, [itemVar]: item };

                if (keyVar) itemData[keyVar] = items.indexOf(item);

                let itemHTML = innerHTML.replace(
                    /\{\{\s*([\w.]+)\s*\}\}/g,
                    (_, key) => {
                        return getValueFromKey(itemData, key);
                    },
                );

                const beforeAttrsParsed = beforeAttrs.replace(
                    /render-tag\s*=\s*["']([^"']+)["']/i,
                    '',
                );
                const afterAttrsParsed = afterAttrs.replace(
                    /render-tag\s*=\s*["']([^"']+)["']/i,
                    '',
                );

                renderedItems += `<${renderTag}${beforeAttrsParsed}${afterAttrsParsed}>${itemHTML}</${renderTag}>`;
            }
        }

        renderedItems = renderedItems.replace(
            attrDirectiveRegex,
            (fullMatch, directive, expression) => {
                const value = getValueFromKey(
                    template.getContext(),
                    expression,
                );

                switch (directive) {
                    case 'c-text':
                        return fullMatch.replace(expression, value);
                    case 'c-html':
                        return fullMatch.replace(expression, value);
                    case ':ref':
                        return fullMatch.replace(expression, value);
                    default:
                        return fullMatch;
                }
            },
        );

        templateText = templateText.replace(
            fullMatch,
            `
            <div c-if="!loaded && !${listName}">${renderedItems}</div>
            <div c-else>${fullMatch
                .replace(
                    new RegExp(`(<\\/?\\s*)${tagName}(\\s*>)`, 'gi'),
                    `$1${renderTag}$2`,
                )
                .replace(/render-tag\s*=\s*["']([^"']+)["']/i, '')
                .replace(directive, placeholder)}</div>
            `,
        );
    }

    templateText = templateText.replace(new RegExp(placeholder, 'g'), 'c-for');
    return templateText;
}

function ifSSR(templateText: string, data: Record<string, any>) {
    const sIfRegex = /<s-if\s+exp=["']([^"']+)["']>(.*?)<\/s-if>/gs;
    const sElseRegex = /<s-else>(.*?)<\/s-else>/gs;

    return templateText.replace(sIfRegex, (match, exp, innerHTML) => {
        const condition = evaluate(data, exp);

        if (condition) {
            return innerHTML.replace(sElseRegex, '');
        } else {
            const elseMatch = sElseRegex.exec(templateText);
            if (elseMatch) return elseMatch[1];
            else return '';
        }
    });
}

export const ssrDirectives: Directive = async (
    templateText: string,
    data: Record<string, any>,
    template: Template,
): Promise<string> => {
    const sDirectiveRegex = /\s+s:([\w\d_]+)\s*=\s*["']([^"']+)["']/g;
    let match: RegExpExecArray | null;

    while ((match = sDirectiveRegex.exec(templateText)) !== null) {
        const [fullMatch, variableName, expression] = match;
        try {
            const result = await evaluateAsync(data, expression);
            template.setContext(variableName, result);
            templateText = templateText.replace(fullMatch, '');
        } catch (error) {
            console.error(
                `Error evaluating expression '${expression}':`,
                error,
            );
        }
    }

    let parsedTemplateText = ifSSR(templateText, template.getContext());
    parsedTemplateText = forSSR(parsedTemplateText, template);

    return parsedTemplateText;
};
