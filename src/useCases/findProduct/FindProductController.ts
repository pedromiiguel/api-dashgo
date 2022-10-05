import { Request, Response } from 'express';
import { FindProductUseCase } from './FindProductUseCase';

class FindProductController {
  async handle(request: Request, response: Response) {
    const findProductUseCase = new FindProductUseCase();

    const products = await findProductUseCase.execute();

    return response.status(201).json(products);
  }
}

export { FindProductController };
