import { Router } from 'express'
import { verifyJWT } from '../middlewares/auth.middleware.ts'
import { getDirectReferrals, getCompleteReferralTree } from '../controllers/referral.controller.ts'

const referralRouter = Router();

referralRouter.use(verifyJWT);

referralRouter.route('/direct-refs').get(getDirectReferrals);
referralRouter.route('/comp-ref-tree').get(getCompleteReferralTree);

export default referralRouter;