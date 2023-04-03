import sgMail, { MailDataRequired } from '@sendgrid/mail';
import { AppError } from '../errors';

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

class SendMailer {
  async execute(message: MailDataRequired) {
    try {
      await sgMail.send(message);
    } catch (error) {
      throw new AppError(
        'Ocorreu um erro ao recuperar sua senha, por favor tente novamente!'
      );
    }
  }
}

export { SendMailer };
