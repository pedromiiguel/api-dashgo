import { client } from '../../../../prisma/client';
import { ParsedQs } from 'qs';

interface IFindAllUsersResquest {
  page: string | ParsedQs | string[] | ParsedQs[];
  limit: string | ParsedQs | string[] | ParsedQs[];
}

class FindAllUsersUseCase {
  async execute({ page, limit }: IFindAllUsersResquest) {
    const skip = Number(limit) * (Number(page) - 1);
    const take = Number(limit);

    const [users, total] = await client.$transaction([
      client.user.findMany({
        skip,
        take,
        orderBy: {
          createdAt: 'desc',
        },
        select: {
          id: true,
          name: true,
          email: true,
          createdAt: true,
        },
      }),
      client.user.count(),
    ]);

    const totalPage = Math.ceil(total / take);

    return { users, totalPage, userCount: total };
  }
}

export { FindAllUsersUseCase };
