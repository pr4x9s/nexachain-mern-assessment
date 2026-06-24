import { Router } from 'express'
import { verifyJWT } from '../middlewares/auth.middleware.ts'
import { getDirectReferrals, getCompleteReferralTree } from '../controllers/referral.controller.ts'

const referralRouter = Router();

referralRouter.route('/direct-refs').get(verifyJWT, getDirectReferrals);
referralRouter.route('/comp-ref-tree').get(verifyJWT, getCompleteReferralTree);

export default referralRouter;