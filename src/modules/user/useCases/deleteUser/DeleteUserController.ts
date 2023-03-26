import { Request, Response } from 'express';
import { DeleteUserUseCase } from './DeleteUserUseCase';

class DeleteUserController {
  async handle(request: Request, response: Response) {
    const { id } = request.params;

    const deleteUserUseCase = new DeleteUserUseCase();

    await deleteUserUseCase.execute({ id });

    return response.status(200);
  }
}

export { DeleteUserController };
