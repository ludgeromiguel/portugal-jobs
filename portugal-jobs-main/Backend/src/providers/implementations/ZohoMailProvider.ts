import nodemailer from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';
import Handlebars from 'handlebars';
import { readFileSync } from 'fs';

import IMailProvider from '@providers/IMailProvider';

class ZohoMailProvider implements IMailProvider {
  private MailClient: Mail;

  constructor({
    host, port, user, pass,
  }: { host: string, port: number, user: string, pass: string }) {
    this.MailClient = nodemailer.createTransport({
      host,
      port,
      auth: {
        user,
        pass,
      },
    });
  }

  async sendMail(to: string, from: string, subject: string, filePath: string, variables?: object) {
    const templateFileContent = readFileSync(filePath).toString('utf8');

    const mailTemplateParse = Handlebars.compile(templateFileContent);

    const html = mailTemplateParse(variables);

    await this.MailClient.sendMail({
      to,
      from,
      subject,
      html,
    });
  }
}

export default ZohoMailProvider;
