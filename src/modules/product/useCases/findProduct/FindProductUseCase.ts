import { AppError } from '../../../../errors';
import { client } from '../../../../prisma/client';
import { convertCentsToCurrency } from '../../../../utils/convertCentsToCurrency';

class FindProductUseCase {
  async execute(productId: string) {
    try {
      const product = await client.product.findFirst({
        where: { id: productId },
        select: {
          name: true,
          price: true,
        },
      });

      if (!product) {
        throw new AppError('Produto não encontrado.');
      }

      const formattedProduct = {
        ...product,
        price: convertCentsToCurrency(Number(product.price)),
      };

      return formattedProduct;
    } catch (error) {
      throw new AppError('Ocorreu um erro ao busca o produto.');
    }
  }
}

export { FindProductUseCase };
