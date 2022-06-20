import { sign } from 'jsonwebtoken';

class GenerateTokenProvider {
  async execute(userId: string) {
    const token = sign({}, '7c18ae8f-6695-4add-87e6-89d6d2da059f', {
      subject: userId,
      expiresIn: '15m',
    });

    return token;
  }
}

export { GenerateTokenProvider };
