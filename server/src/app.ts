import express from 'express'
import type { Application } from 'express'
import cors from 'cors'
import conf from './conf/conf.ts'
import cookieParser from 'cookie-parser'



const app: Application = express();

app.use(cors({
    origin: conf.corsOrigin,
    credentials: true
}));

app.set('trust proxy', 1);

app.use(express.json({limit: '16kb'}));

app.use(express.urlencoded({extended: true, limit: '16kb'}));

app.use(express.static('public'));

app.use(cookieParser());

export { app }