import { client } from '../../prisma/client';
import { ParsedQs } from 'qs';


interface IFindAllUsersResquest {
  page: string | ParsedQs | string[] | ParsedQs[];
  limit: string | ParsedQs | string[] | ParsedQs[];
} 

class FindAllUsersUseCase {
  async execute({ page, limit }: IFindAllUsersResquest) {
    const skip = +limit * (+page - 1);
    const take = +limit;

    const userCount = await client.user.count();
    const users = await client.user.findMany({
      skip,
      take,
      orderBy: {
        createdAt: 'desc',
      },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true
      }
    });

    return { users, userCount };
  }
}

export { FindAllUsersUseCase };
