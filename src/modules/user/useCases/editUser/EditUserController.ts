import { Request, Response } from 'express';
import { EditUserUseCase } from './EditUserUseCase';

class EditUserController {
  async handle(request: Request, response: Response) {
    const { name, email } = request.body;
    const { id } = request.params;

    const editUserUseCase = new EditUserUseCase();

    const user = await editUserUseCase.execute({ name, email, id });

    return response.status(200).json(user);
  }
}

export { EditUserController };
