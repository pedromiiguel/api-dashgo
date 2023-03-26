import { AppError } from '../../../../errors';
import { client } from '../../../../prisma/client';
import { convertCurrencyToCents } from '../../../../utils/convertCurrencyToCents';

interface IUserResquest {
  name: string;
  price: number;
  userId: string;
}

class CreateProductUseCase {
  async execute({ name, price, userId }: IUserResquest) {
    const productAlreadyExists = await client.product.findFirst({
      where: { name },
    });

    if (productAlreadyExists) {
      throw new AppError('Produto já cadastrado.');
      return;
    }

    const product = await client.product.create({
      data: {
        name,
        price: convertCurrencyToCents(price),
        userId,
      },
    });

    return product;
  }
}

export { CreateProductUseCase };
