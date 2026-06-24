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
import userRouter from './routes/user.route.ts'
import investmentRouter from './routes/investment.route.ts'
import adminRouter from './routes/admin.route.ts'
import dashboardRouter from './routes/dashboard.route.ts'
import referralRouter from './routes/referral.route.ts'

app.use('/api/v1/users', userRouter);
app.use('/api/v1/investments', investmentRouter);
app.use('/api/v1/admin', adminRouter);
app.use('/api/v1/dashboard', dashboardRouter);
app.use('/api/v1/referrals', referralRouter);

app.use(errorHandler);


export { app }