import nodemailer, { TransportOptions, Transporter } from "nodemailer";
import env from '../utils/validate-env';
interface SMTPConfig extends TransportOptions {
  service: string;
  host: string;
  port: number;
  secure: boolean;
  auth: {
    user: string;
    pass: string;
  };
  tls: {
    rejectUnauthorized: boolean;
  };
}

export interface mailOptions {
  to: string | undefined;
  subject: string;
  html?: string;
  attachments?: any;
}

const smtpConfig: SMTPConfig = {
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: "disolutiontest@gmail.com",
    pass: "lqznwgcfsmpcccuc",
  },
  tls: {
    rejectUnauthorized: false,
  },
};

const transporter: Transporter = nodemailer.createTransport(smtpConfig);

export const sendEmail = (mailOptions: mailOptions) => {
  transporter.sendMail({ from: env.SMTP_EMAIL, ...mailOptions });
};
