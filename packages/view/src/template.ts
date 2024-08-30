export class Template {
    private templateText: string;

    constructor(text, optsParam){
        this.templateText = text;
    }

    compile() {
        return ((data) => {
            console.log(this.templateText);
            return this.templateText
            .replace(/<([^>]+)\s+s-data=["'](.+?)["']([^>]*)>(.*?)<\/\1>/g, (match, tagName, key, attributes, innerHTML) => {
                const value = data[key.trim()];
                if (value !== undefined) {
                    return `<${tagName} ${attributes}>${value}</${tagName}>`;
                } else {
                    return `<!-- s-data not found: ${key} -->`;
                }
            });
        });
    }
}