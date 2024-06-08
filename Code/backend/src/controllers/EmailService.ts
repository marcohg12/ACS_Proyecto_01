import * as nodemailer from "nodemailer";
import { IEmailService } from "./_tests_/IEmailService";

class EmailService implements IEmailService {
  private transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: "codeduende@gmail.com",
      pass: "btkhgxybyxemyqjq",
    },
  });

  public sendEmail(email: string, subject: string, content: string) {
    // Configura el contenido del correo
    const mailOptions = {
      from: "codeduende@gmail.com",
      to: email,
      subject: subject,
      text: content,
    };

    // Envía el correo
    this.transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error al enviar el correo:", error);
      } else {
        console.log("Correo electrónico enviado:", info.response);
      }
    });
  }
}

export { EmailService };
