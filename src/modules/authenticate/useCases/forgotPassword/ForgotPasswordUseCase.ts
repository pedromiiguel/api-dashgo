import * as crypto from 'crypto';
import path from 'path';
import fs from 'fs';
import handlebars from 'handlebars';

import { AppError } from '../../../../errors';
import { client } from '../../../../prisma/client';
import { transporter } from '../../../mailer';

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

      const filePath: string = path.join(
        __dirname,
        '../../../../resources/mail/auth/forgotPassword.html'
      );
      const fileContent: string = fs.readFileSync(filePath, 'utf8');
      const template = handlebars.compile(fileContent);

      const context = {
        email,
        link: `${process.env.DASHGO_URL}/reset-password?token=${token}`,
      };

      const html = template(context);

      const message = {
        from: process.env.MAILADRESS,
        to: email,
        subject: ' Dashgo - Recupere sua senha',
        html,
      };

      return transporter.sendMail(message, (err) => {
        if (err) {
          throw new AppError('Ocorreu um erro ao enviar o e-mail');
        }
      });
    } catch (error) {
      throw new AppError(error.message);
    }
  }
}

export { ForgotPasswordUseCase };
