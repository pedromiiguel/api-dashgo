import { Request, Response } from 'express';
import { FindProductUseCase } from './FindProductUseCase';

class FindProductController {
  async handle(request: Request, response: Response) {
    const { id } = request.params;

    const findProductUseCase = new FindProductUseCase();
    const product = await findProductUseCase.execute(id);

    return response.json(product);
  }
}

export { FindProductController };
