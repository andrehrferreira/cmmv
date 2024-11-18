import { AbstractContract } from '@cmmv/core';
export declare class AuthContract extends AbstractContract {
    username: string;
    password: string;
    googleId?: string;
    groups: string;
    customProto(): string;
    customTypes(): string;
}
