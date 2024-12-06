import type { H3Event } from "h3";
import IAgendamento from "~/interfaces/IAgendamento";
import Agendamento from "~/server/database/models/agendamentoModel";

export default defineEventHandler(async (event: H3Event) => {
  console.log("registScheduling");

  // Lê os dados enviados no corpo da requisição
  const result = await readBody(event);

  const formattedResult = Object.keys(result).reduce((acc, key) => {
    const formattedKey = key.replaceAll(" ", "_");
    acc[formattedKey as keyof IAgendamento] = result[key];
    return acc;
  }, {} as IAgendamento);
  console.log(formattedResult);

  try {
    await Agendamento.create(formattedResult);
  } catch (error: any) {
    console.error("Erro ao registrar agendamento:", error);
  }
});
