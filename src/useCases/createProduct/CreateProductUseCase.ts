import { AppError } from '../../errors';
import { client } from '../../prisma/client';

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

    console.log(productAlreadyExists)

    if (productAlreadyExists) {
      throw new AppError('Produto já cadastrado.');
      return
    }

    const product = await client.product.create({
      data: {
        name,
        price,
        userId,
      },
    });

    return product;
  }
}

export { CreateProductUseCase };
