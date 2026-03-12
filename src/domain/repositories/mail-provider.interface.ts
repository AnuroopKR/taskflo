export interface IMailProvider {
  sendMail(params: MailParams): Promise<void>;
}

export interface MailParams {
  to: string
  subject: string
  html: string
}