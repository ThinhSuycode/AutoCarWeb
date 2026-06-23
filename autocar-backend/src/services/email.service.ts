import { transporter } from "../utils/nodemailer";

interface SendEmailParams {
  to: string;
  subject: string;
  html: string;
}

export const sendEmail = async ({ to, subject, html }: SendEmailParams) => {
  await transporter.sendMail({
    from: process.env.EMAIL_SHOP,
    to,
    subject,
    html,
  });
};
