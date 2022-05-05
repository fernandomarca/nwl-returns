import { MailAdapter, SendMailData } from "../mail-adapter";
import nodemailer from "nodemailer";

export class NodemailerMailAdapter implements MailAdapter {
  async sendMail({ body, subject }: SendMailData) {
    const transport = nodemailer.createTransport({
      host: "smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "971a8548ccbbb7",
        pass: "1d4c6bb26f9ffa",
      },
    });

    await transport.sendMail({
      from: "Equipe Feedback <oi@feedget.com>",
      to: "Fernando <fernandomarca@hotmail.com>",
      subject,
      html: body,
    });
  }
}
