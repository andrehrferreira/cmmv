// Generated automatically by CMMV

export namespace User {
    export type username = string;
    export type password = string;
    export type googleId = string;
    export type groups = string;
    export type root = boolean;
}

export interface LoginRequest {
    username: string;
    password: string;
}

export interface LoginResponse {
    success: boolean;
    token: string;
    message: string;
}

export interface RegisterRequest {
    username: string;
    email: string;
    password: string;
}

export interface RegisterResponse {
    success: boolean;
    message: string;
}
