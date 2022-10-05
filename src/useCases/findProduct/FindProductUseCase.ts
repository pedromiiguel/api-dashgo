import { AppError } from '../../errors';
import { client } from '../../prisma/client';

interface IUserResquest {
  name: string;
  price: number;
  userId: string;
}

class FindProductUseCase {
  async execute() {
    const products = await client.product.findMany({
      include: {
        user: true,
      },
    });

    return products;
  }
}

export { FindProductUseCase };
