import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class EmailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendConfirmationEmail(email: string, username: string, code: string) {
    await this.mailerService.sendMail({
      to: email,
      subject:
        'Добро пожаловать в приложение IRemember! Вам необходимо подвердить ваш email.',
      template: 'confirm',
      context: {
        username,
        code,
      },
    });
  }

  async sendResetEmail(email: string, username: string, code: string) {
    await this.mailerService.sendMail({
      to: email,
      subject: 'Поступил запрос на смену пароля в приложении IRemember',
      template: 'reset',
      context: {
        username,
        code,
      },
    });
  }
}
