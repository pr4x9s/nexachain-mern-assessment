import { Router } from 'express'
import { registerUser } from '../controllers/user.controller.ts'

const userRouter = Router();

userRouter.route('/register').post(registerUser);

export default userRouter;