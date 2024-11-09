import nodemailer from "nodemailer";
/* import { SMPT } from "../constatns/constans.js";
import { env } from "../utils/env.js"; */

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
  tls: {
    rejectUnauthorized: false, // Ігнорування самопідписаних сертифікатів
  },
});

export async function sendEmail(options) {
  return await transporter.sendMail(options);
}
