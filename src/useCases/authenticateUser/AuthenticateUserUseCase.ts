import { client } from '../../prisma/client';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

interface IRequest {
  username: string;
  password: string;
}

class AuthenticateUserUseCase {
  async execute({ username, password }: IRequest) {
    //Verificar se o usuário existencia
    const userAlreadyExists = await client.user.findFirst({
      where: { username },
    });

    
    if (!userAlreadyExists) {
      throw new Error('User or password incorrect');
    }

    const passwordMatch = await compare(password, userAlreadyExists.password);

    if (!passwordMatch) {
      throw new Error('User or password incorrect');
    }

    const token = sign({}, '7c18ae8f-6695-4add-87e6-89d6d2da059f', {
      subject: userAlreadyExists.id,
      expiresIn: '20s',
    });

    console.log(token)

    return { token };
  }
}

export { AuthenticateUserUseCase };
