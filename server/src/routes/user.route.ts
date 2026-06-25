import { Router } from 'express'
import { loginUser, logoutUser, refreshTheAccessToken, registerUser } from '../controllers/user.controller.ts'
import { verifyJWT } from '../middlewares/auth.middleware.ts'
import { validate } from '../middlewares/validate.middleware.ts';
import { loginUserSchema, registerUserSchema } from '../validators/auth.validator.ts';

const userRouter = Router();

userRouter.route('/register').post(validate(registerUserSchema), registerUser);
userRouter.route('/login').post(validate(loginUserSchema), loginUser);
userRouter.route('/refresh-token').post(refreshTheAccessToken);
userRouter.route('/logout').post(verifyJWT, logoutUser);

export default userRouter;