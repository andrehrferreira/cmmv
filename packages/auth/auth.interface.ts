export interface IAuthSettings {
    roles: string[];
    groups: string[];
}

export interface IJWTDecoded {
    id: string;
    fingerprint: string;
    root: boolean;
    roles?: string[];
    groups?: string[];
}
