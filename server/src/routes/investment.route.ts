import { Router } from 'express'
import { verifyJWT } from '../middlewares/auth.middleware.ts'
import { createInvestment, getUserInvestments } from '../controllers/investment.controller.ts'
import { validate } from '../middlewares/validate.middleware.ts';
import { createInvestmentSchema, getUserInvestmentSchema } from '../validators/investment.validator.ts';

const investmentRouter = Router();

investmentRouter.route('/create-investment').post(verifyJWT, validate(createInvestmentSchema), createInvestment);
investmentRouter.route('/get-my-investments').get(verifyJWT, validate(getUserInvestmentSchema), getUserInvestments);

export default investmentRouter;