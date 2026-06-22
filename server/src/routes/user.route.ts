import { Router } from 'express'
import { loginUser, logoutUser, registerUser } from '../controllers/user.controller.ts'
import { verifyJWT } from '../middlewares/auth.middleware.ts'

const userRouter = Router();

userRouter.route('/register').post(registerUser);
userRouter.route('/login').post(loginUser);
userRouter.route('/logout').post(verifyJWT, logoutUser);

export default userRouter;