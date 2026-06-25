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




import { errorHandler } from './middlewares/error.middleware.ts'
import { userRouter, investmentRouter, adminRouter, dashboardRouter, referralRouter } from './routes/index.ts'
import swaggerUi from 'swagger-ui-express'
import { load } from 'js-yaml'
import fs from 'node:fs'

let swaggerDocument;

try {
    swaggerDocument = load(fs.readFileSync('./swaggerOpenapiDocs.yaml', 'utf-8'));
}
catch (error) {
    console.error('Failed to load Swagger Document: ', error);
}

app.use('/api/v1/users', userRouter);
app.use('/api/v1/investments', investmentRouter);
app.use('/api/v1/admin', adminRouter);
app.use('/api/v1/dashboard', dashboardRouter);
app.use('/api/v1/referrals', referralRouter);

if (swaggerDocument) {
    app.use('/api/v1/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, {
        explorer: true
    }));
}
else {
    console.error('Swagger Document does not exist');
}

app.use(errorHandler);


export { app }