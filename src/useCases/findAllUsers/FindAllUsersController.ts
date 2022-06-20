import { Request, Response } from 'express';
import { FindAllUsersUseCase } from './FindAllUsersUseCase';

class FindAllUsersController {
  async handle(request: Request, response: Response) {
    const findAllUsersUseCase = new FindAllUsersUseCase();
    const users = await findAllUsersUseCase.execute();

    return response.json(users);
  }
}

export { FindAllUsersController };
