import { client } from '../../../../prisma/client';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { GenerateRefreshToken } from '../../../../provider/GenerateRefreshToken';
import { GenerateTokenProvider } from '../../../../provider/GenerateTokenProvider';
import { AppError } from '../../../../errors';

interface IRequest {
  email: string;
  password: string;
}

class AuthenticateUserUseCase {
  async execute({ email, password }: IRequest) {
    //Verificar se o usuário existencia
    const userAlreadyExists = await client.user.findFirst({
      where: { email },
    });

    const user = {
      id: userAlreadyExists.id,
      email: userAlreadyExists.email,
      name: userAlreadyExists.name,
    };

    if (!userAlreadyExists) {
      throw new AppError('E-mail ou senha inválidos');
    }

    const passwordMatch = await compare(password, userAlreadyExists.password);

    if (!passwordMatch) {
      throw new AppError('E-mail ou senha inválidos');
    }

    //gerar token do usuario

    const generateTokenProvider = new GenerateTokenProvider();
    const token = await generateTokenProvider.execute(userAlreadyExists.id);

    await client.refreshToken.deleteMany({
      where: { userId: userAlreadyExists.id },
    });

    const generateRefreshToken = new GenerateRefreshToken();
    const refreshToken = await generateRefreshToken.execute(
      userAlreadyExists.id
    );

    return { user, token, refreshToken: refreshToken.id };
  }
}

export { AuthenticateUserUseCase };
