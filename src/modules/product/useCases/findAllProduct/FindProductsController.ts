import { Request, Response } from 'express';
import { FindProductsUseCase } from './FindProductsUseCase';

class FindProductsController {
  async handle(request: Request, response: Response) {
    const { page, limit } = request.query;
    const findProductsUseCase = new FindProductsUseCase();

    const { products, totalPage, productCount } =
      await findProductsUseCase.execute({
        page,
        limit,
      });

    response.header('Access-Control-Expose-Headers', '*');
    return response
      .status(200)
      .header('X-total-count', String(productCount))
      .json({ products, totalPage });
  }
}

export { FindProductsController };
