import type { IUser } from '../models/user.model.ts'

export interface Config {
    port: number;
    mongodbUri: string;
    corsOrigin: string;
    accessTokenSecret: string;
    accessTokenExpiry: string;
    refreshTokenSecret: string;
    refreshTokenExpiry: string;
}

export interface TokenResponse {
    accessToken: string;
    refreshToken: string;
}

export interface ReferredBySummary {
    _id: string;
    fullName: string;
    email: string;
}

export interface AuthUserResponse extends Omit<IUser, 'referredBy' | 'password' | 'refreshToken'> {
    referredBy: ReferredBySummary | null;
}