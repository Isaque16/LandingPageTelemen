import nodemailer from "nodemailer";
import dotenv from "dotenv";
import cors from "cors";
import SMTPTransport from "nodemailer/lib/smtp-transport";
import type { H3Event } from "h3";

import connectToDatabase from "../database/connectDB";
import verifyClone from "./middleware/verifyClone";
import registScheduling from "./middleware/registScheduling";

dotenv.config();
cors();
connectToDatabase();

async function sendEmail(
  to: string,
  subject: string,
  text: string
): Promise<SMTPTransport.SentMessageInfo> {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    secure: false,
    auth: {
      user: process.env.SENDERS_EMAIL,
      pass: process.env.SENDERS_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.SENDERS_EMAIL,
    to,
    subject,
    text,
  };

  return transporter.sendMail(mailOptions);
}

export default defineEventHandler(async (event: H3Event) => {
  await verifyClone(event);
  await registScheduling(event);

  const result = await readBody(event);

  const sendMessage = `
  Uma nova mensagem foi agendada para ${result["Horário da Mensagem"]} às ${
    result["Data da Mensagem"]
  }!
  Informações abaixo:
  ${Object.entries(result)
    .map(([key, value]) => `${key}: ${value}`)
    .join("\n")}`;

  const message = {
    from: process.env.SENDERS_EMAIL,
    to: "rosadesarom_ac2@hotmail.com",
    subject: `Mensagem ${result["Modelo de Mensagem"]} de ${result["Nome de Quem Envia"]} para ${result["Horário da Mensagem"]}`,
    text: sendMessage,
  };

  await sendEmail(message.to, message.subject, message.text);
});
