import { client } from '../../prisma/client';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { GenerateRefreshToken } from '../../provider/GenerateRefreshToken';
import { GenerateTokenProvider } from '../../provider/GenerateTokenProvider';
import { AppError } from '../../errors';

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

    if (!userAlreadyExists) {
      throw new AppError('User or password incorrect');
    }

    const passwordMatch = await compare(password, userAlreadyExists.password);

    if (!passwordMatch) {
      throw new AppError('User or password incorrect');
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

    return { token, refreshToken };
  }
}

export { AuthenticateUserUseCase };
