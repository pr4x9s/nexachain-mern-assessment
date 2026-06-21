import type { Config } from '../types/types.ts'
import dotenv from 'dotenv'

dotenv.config({
    path: './.env'
});

const conf: Config = {
    port: Number(process.env.PORT),
    mongodbUri: process.env.MONGODB_URI!,
    corsOrigin: process.env.CORS_ORIGIN!,
    accessTokenSecret: process.env.ACCESS_TOKEN_SECRET!,
    accessTokenExpiry: process.env.ACCESS_TOKEN_EXPIRY!,
    refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET!,
    refreshTokenExpiry: process.env.REFRESH_TOKEN_EXPIRY!,
};

export default conf;