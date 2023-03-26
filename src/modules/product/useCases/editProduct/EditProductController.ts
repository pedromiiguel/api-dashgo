import { Request, Response } from 'express';
import { EditProductUseCase } from './EditProductUseCase';

class EditProductController {
  async handle(request: Request, response: Response) {
    const { name, price } = request.body;
    const { id } = request.params;

    const editProductUseCase = new EditProductUseCase();

    const product = await editProductUseCase.execute({ name, price, id });

    return response.status(200).json(product);
  }
}

export { EditProductController };
