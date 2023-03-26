import { Request, Response } from 'express';
import { ResetPasswordUseCase } from './ResetPasswordUseCase';

class ResetPasswordController {
  async handle(request: Request, response: Response) {
    const { token, password } = request.body;

    const resetPasswordUseCase = new ResetPasswordUseCase();

    await resetPasswordUseCase.execute({ token, password });

    return response.send();
  }
}

export { ResetPasswordController };
