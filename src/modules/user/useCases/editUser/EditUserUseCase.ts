import { AppError } from '../../../../errors';
import { client } from '../../../../prisma/client';
interface IEditUserResquest {
  id: string;
  name: string;
  email: string;
}

class EditUserUseCase {
  async execute({ name, email, id }: IEditUserResquest) {
    try {
      const user = await client.user.update({
        where: { id },
        data: { name, email },
        select: { name: true, email: true },
      });

      return user;
    } catch (err) {
      if (err.code === 'P2025') {
        throw new AppError('Usuário não encontrado.');
      }

      if (err.code === 'P2002') {
        throw new AppError('E-mail já cadastrado.', 400);
      }
    }
  }
}

export { EditUserUseCase };
