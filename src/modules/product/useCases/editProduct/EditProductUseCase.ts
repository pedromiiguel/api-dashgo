import { AppError } from '../../../../errors';
import { client } from '../../../../prisma/client';
import { convertCentsToCurrency } from '../../../../utils/convertCentsToCurrency';
import { convertCurrencyToCents } from '../../../../utils/convertCurrencyToCents';

interface IEditProductResquest {
  id: string;
  name: string;
  price: string;
}

class EditProductUseCase {
  async execute({ name, price, id }: IEditProductResquest) {
    try {
      const product = await client.product.update({
        where: { id },
        data: { name, price: convertCurrencyToCents(Number(price)) },
        select: { name: true, price: true },
      });

      const formattedProduct = {
        ...product,
        price: convertCentsToCurrency(Number(product.price)),
      };

      return formattedProduct;
    } catch (err) {
      if (err.code === 'P2025') {
        throw new AppError('Produto não encontrado.');
      }

      if (err.code === 'P2002') {
        throw new AppError('Produto já cadastrado.', 400);
      }
    }
  }
}

export { EditProductUseCase };
