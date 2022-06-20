import { AppError } from '../../errors';
import { client } from '../../prisma/client';

class FindUserUseCase {
  async execute(userId: string) {
    const user = await client.user.findFirst({
      where: { id: userId },
    });

    if (!user) {
      throw new AppError('User not exists');
    }

    return user;
  }
}

export { FindUserUseCase };
