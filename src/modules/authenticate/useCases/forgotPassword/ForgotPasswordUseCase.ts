import * as crypto from 'crypto';

import { AppError } from '../../../../errors';
import { client } from '../../../../prisma/client';
import { SendMailer } from '../../../../provider/SendMailer';

interface IRequest {
  email: string;
}

class ForgotPasswordUseCase {
  async execute({ email }: IRequest) {
    try {
      const user = await client.user.findFirst({
        where: { email },
      });

      if (!user) {
        throw new AppError('Usuário não encontrado.');
      }

      const token = crypto.randomBytes(20).toString('hex');

      const now = new Date();
      now.setHours(now.getHours() + 1);

      await client.user.update({
        where: { id: user.id },
        data: {
          passwordResetToken: token,
          passwordResetExpires: now,
        },
      });

      const message = {
        to: email,
        from: process.env.MAILADRESS,
        templateId: 'd-70e41e2eaacf4570b39a9ff601e4c6ca',
        dynamic_template_data: {
          email,
          link: `${process.env.DASHGO_URL}/reset-password?token=${token}`,
        },
      };

      const sendMailerProvider = new SendMailer();
      await sendMailerProvider.execute(message);
    } catch (error) {
      throw new AppError(error.message);
    }
  }
}

export { ForgotPasswordUseCase };
