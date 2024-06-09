import { IEmailService } from "../../interfaces/IEmailService";

class EmailServiceStub implements IEmailService {
  sendEmail(email: string, subject: string, content: string): void {
    return;
  }
}

export { EmailServiceStub };
