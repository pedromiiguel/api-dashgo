import { client } from '../../../../prisma/client';

interface IDeleteProductResquest {
  id: string;
}

class DeleteProductUseCase {
  async execute({ id }: IDeleteProductResquest) {
    try {
      await client.product.delete({
        where: {
          id,
        },
      });
    } catch (error) {
      console.log(error);
    }

    return;
  }
}

export { DeleteProductUseCase };
