import { convertCentsToCurrency } from './../../../../utils/convertCentsToCurrency';
import { AppError } from '../../../../errors';
import { client } from '../../../../prisma/client';
import { ParsedQs } from 'qs';

interface IFindAllProductsResquest {
  page: string | ParsedQs | string[] | ParsedQs[];
  limit: string | ParsedQs | string[] | ParsedQs[];
}

class FindProductsUseCase {
  async execute({ page, limit }: IFindAllProductsResquest) {
    const skip = Number(limit) * (Number(page) - 1);
    const take = Number(limit);

    const [products, total] = await client.$transaction([
      client.product.findMany({
        orderBy: {
          createdAt: 'desc'
        },
        skip,
        take,
        include: {
          user: {
            select: {
              name: true,
            },
          },
        },
      }),
      client.product.count(),
    ]);

    const totalPage = Math.ceil(total / take);

    const formattedProducts = products.map((product) => ({
      ...product,
      price: convertCentsToCurrency(Number(product.price)),
    }));

    return { products: formattedProducts, totalPage, productCount: total };
  }
}

export { FindProductsUseCase };
