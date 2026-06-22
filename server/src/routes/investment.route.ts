import { Router } from 'express'
import { verifyJWT } from '../middlewares/auth.middleware.ts'
import { createInvestment } from '../controllers/investment.controller.ts'
import { validate } from '../middlewares/validate.middleware.ts';
import { createInvestmentSchema } from '../validators/investment.validator.ts';

const investmentRouter = Router();

investmentRouter.route('/create-investment').post(verifyJWT, validate(createInvestmentSchema), createInvestment);

export default investmentRouter;