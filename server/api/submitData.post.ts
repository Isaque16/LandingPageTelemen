import nodemailer from "nodemailer";
import dotenv from "dotenv";
import cors from "cors";
import type { H3Event } from "h3";

import verifyClone from "./middleware/verifyClone";
import registScheduling from "./middleware/logData";

dotenv.config();
cors();

export default defineEventHandler(async (event: H3Event) => {
  // Chama os middlewares antes de prosseguir com o envio do e-mail
  await verifyClone(event);
  await registScheduling(event);

  const result = await readBody(event);

  // Configuração do transportador do Nodemailer
  const transporter = nodemailer.createTransport({
    service: "gmail",
    secure: false,
    auth: {
      user: process.env.SENDERS_EMAIL,
      pass: process.env.SENDERS_PASSWORD,
    },
  });

  const sendMessage = `
  Uma nova mensagem foi agendada para ${result["Horário da Mensagem"]} às ${result["Data da Mensagem"]}!
  Informações abaixo:
  ${Object.entries(result)
    .map(([key, value]) => `${key}: ${value}`)
    .join("\n")}`;

  const message = {
    from: process.env.SENDERS_EMAIL,
    to: "clubpenguinganball14@gmail.com",
    subject: `Mensagem ${result["Modelo de Mensagem"]} de ${result["Nome de Quem Envia"]} para ${result["Horário da Mensagem"]}`,
    text: sendMessage,
  };

  try {
    await transporter.sendMail(message);
    console.log("Email enviado com sucesso!");
    return { status: 200 };
  } catch (error) {
    console.error("Erro ao enviar o email:", error);
    throw createError({
      statusCode: 400,
      statusMessage: "Erro ao agendar, tente novamente",
    });
  }
});
