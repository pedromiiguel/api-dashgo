import { hash } from 'bcryptjs';
import { AppError } from '../../../../errors';
import { client } from '../../../../prisma/client';

interface IRequest {
  token: string;
  password: string;
}

class ResetPasswordUseCase {
  async execute({ token, password }: IRequest) {
    try {
      const user = await client.user.findFirst({
        where: { passwordResetToken: token },
        select: {
          passwordResetExpires: true,
          passwordResetToken: true,
          id: true,
        },
      });

      if (!user) {
        throw new AppError('Usuário não encontrado.');
      }

      if (token !== user.passwordResetToken) {
        throw new AppError('Token inválido.');
      }

      const now = new Date();

      if (now > user.passwordResetExpires) {
        throw new AppError('Token expirado.');
      }

      const passwordHash = await hash(password, 8);

      await client.user.update({
        where: { id: user.id },
        data: { password: passwordHash },
      });
    } catch (error) {
      throw new AppError(error.message);
    }
  }
}

export { ResetPasswordUseCase };
