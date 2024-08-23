export class Template {
    private templateText: string;

    constructor(text, optsParam){
        this.templateText = text;
    }

    compile() {
        return ((data) => {
            return this.templateText;
        });
    }
}