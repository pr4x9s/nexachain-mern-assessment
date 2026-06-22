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

export interface RegisterReqBody {
    fullName: string;
    email: string;
    mobileNumber: string;
    password: string;
    referralCodeUsed?: string;
}

export interface LoginReqBody extends Pick<RegisterReqBody, 'email' | 'password'> {}