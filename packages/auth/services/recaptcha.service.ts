import { Service, AbstractService } from '@cmmv/core';

import { HttpService } from '@cmmv/http';

@Service('recaptcha')
export class AuthRecaptchaService extends AbstractService {
    constructor(private readonly httpService: HttpService) {
        super();
    }

    public async validateRecaptcha(
        secret: string,
        validation: string,
    ): Promise<boolean> {
        try {
            const response = await fetch(
                'https://www.google.com/recaptcha/api/siteverify',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    body: new URLSearchParams({
                        secret,
                        response: validation,
                    }).toString(),
                },
            );

            const data = await response.json();
            return data.success === true;
        } catch (error) {
            return false;
        }
    }
}
