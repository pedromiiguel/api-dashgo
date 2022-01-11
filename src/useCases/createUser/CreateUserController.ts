import { Request, Response } from 'express';
import { CreateUserUseCase } from './CreateUserUseCase';

class CreateUserController {
  async handle(request: Request, response: Response) {
    const { username, password, name } = request.body;

    const createUseruseCase = new CreateUserUseCase();

    const user = await createUseruseCase.execute({ username, password, name });

    return response.json(user);
  }
}

export { CreateUserController };
