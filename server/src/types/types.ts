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