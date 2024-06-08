export interface IEmailService {
  sendEmail(email: string, subject: string, content: string): void;
}
