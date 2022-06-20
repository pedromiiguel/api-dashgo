import { Request, Response } from 'express';

import { RefreshTokenUserUserCase } from './refreshTokenUserUseCase';

class RefreshTokenUserController {
  async handle(request: Request, response: Response) {
    const { refresh_token } = request.body;

    const refreshTokenUserUseCase = new RefreshTokenUserUserCase();

    const token = await refreshTokenUserUseCase.execute(refresh_token);

    return response.json(token);
  }
}

export { RefreshTokenUserController };
