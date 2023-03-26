import { Request, Response } from 'express';
import { CreateProductUseCase } from './CreateProductUseCase';

class CreateProductController {
  async handle(request: Request, response: Response) {
    const { name, price } = request.body;
    const { userId } = request;

    const createProductUseCase = new CreateProductUseCase();

    const product = await createProductUseCase.execute({ name, price, userId });

    return response.status(201).json(product);

  }
}

export { CreateProductController };
