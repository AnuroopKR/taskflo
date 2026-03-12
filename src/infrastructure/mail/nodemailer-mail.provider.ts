import nodemailer from "nodemailer";
import { IMailProvider, MailParams } from "../../domain/repositories/mail-provider.interface";

export class NodemailerMailProvider implements IMailProvider {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  }

  async sendMail({ to, subject, html }: MailParams): Promise<void> {
   const info= await this.transporter.sendMail({
      from: process.env.MAIL_FROM,
      to,
      subject,
      html,
    });
    console.log("Preview URL:", nodemailer.getTestMessageUrl(info));
  }
}