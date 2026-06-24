import { Router } from 'express'
import { verifyJWT } from '../middlewares/auth.middleware.ts'
import { getUserDashboardStats } from '../controllers/dashboard.controller.ts'

const dashboardRouter = Router();

dashboardRouter.route('/stats').get(verifyJWT, getUserDashboardStats);

export default dashboardRouter;