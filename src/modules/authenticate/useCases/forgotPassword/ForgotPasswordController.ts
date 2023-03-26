import { Request, Response } from 'express';
import { ForgotPasswordUseCase } from './ForgotPasswordUseCase';

class ForgotPasswordController {
  async handle(request: Request, response: Response) {
    const { email } = request.body;

    const forgotPasswordUseCase = new ForgotPasswordUseCase();

    await forgotPasswordUseCase.execute({ email });

    return response.send();
  }
}

export { ForgotPasswordController };
