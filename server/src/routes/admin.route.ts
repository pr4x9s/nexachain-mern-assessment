import { Router } from 'express'
import { verifyJWT } from '../middlewares/auth.middleware';
import { triggerDailyPayoutManually } from '../controllers/admin.controller.ts'

const adminRouter = Router();

adminRouter.route('/payout/trigger').post(verifyJWT, triggerDailyPayoutManually);

export default adminRouter;