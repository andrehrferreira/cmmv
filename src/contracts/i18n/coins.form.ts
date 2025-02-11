import { Form, FormElement, ElementType } from '@cmmv/form';

@Form('I18nCoins', {
    contract: 'I18nCoinsContract',
    customPath: '/i18n/coins',
})
export class I18nCoinsForm {
    @FormElement({
        type: ElementType.Input,
    })
    code: string;
}
