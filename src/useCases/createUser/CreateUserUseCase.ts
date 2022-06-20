import { client } from '../../prisma/client';
import { hash } from 'bcryptjs';
import { AppError } from '../../errors';

interface IUserResquest {
  name: string;
  email: string;
  password: string;
}

class CreateUserUseCase {
  async execute({ name, email, password }: IUserResquest) {
    //Verificar se o usuário existe
    const userAlreadyExist = await client.user.findFirst({
      where: { email },
    });

    if (userAlreadyExist) {
      throw new AppError('User already exists');
    }
    //Cadastrar o usuário

    const passwordHash = await hash(password, 8);

    const user = await client.user.create({
      data: {
        name,
        email,
        password: passwordHash,
      },
    });

    return user;
  }
}

export { CreateUserUseCase };
