import { Router } from 'express';
import { AuthenticateUserController } from '../modules/authenticate/useCases/authenticateUser/AuthenticateUserController';
import { ForgotPasswordController } from '../modules/authenticate/useCases/forgotPassword/ForgotPasswordController';
import { RefreshTokenUserController } from '../modules/authenticate/useCases/refreshTokenUser/RefreshTokenUserController';
import { ResetPasswordController } from '../modules/authenticate/useCases/resetPassword/ResetPasswordController';

const authenticateUserController = new AuthenticateUserController();
const refreshTokenUserController = new RefreshTokenUserController();
const forgotPasswordController = new ForgotPasswordController();
const resetPasswordController = new ResetPasswordController();



const authenticateRouter = Router();

authenticateRouter.post('/login', authenticateUserController.handle);
authenticateRouter.post('/forgot-password', forgotPasswordController.handle);
authenticateRouter.post('/reset-password', resetPasswordController.handle);
authenticateRouter.post('/refresh-token', refreshTokenUserController.handle);

export { authenticateRouter };
