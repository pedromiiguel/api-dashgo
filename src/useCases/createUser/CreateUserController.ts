import { Request, Response } from 'express';
import { CreateUserUseCase } from './CreateUserUseCase';

class CreateUserController {
  async handle(request: Request, response: Response) {
    const { email, password, name } = request.body;

    const createUseruseCase = new CreateUserUseCase();

    const user = await createUseruseCase.execute({ email, password, name });

    return response.json(user);
  }
}

export { CreateUserController };
