import { Request, Response } from 'express';
import { FindAllUsersUseCase } from './FindAllUsersUseCase';

class FindAllUsersController {
  async handle(request: Request, response: Response) {
    const { page, limit } = request.query;

    const findAllUsersUseCase = new FindAllUsersUseCase();
    const { users, totalPage, userCount } = await findAllUsersUseCase.execute({
      page,
      limit,
    });

    response.header('Access-Control-Expose-Headers', '*');
    return response
      .header('X-total-count', String(userCount))
      .json({ users, totalPage });
  }
}

export { FindAllUsersController };
