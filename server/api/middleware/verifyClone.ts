import type { H3Event } from "h3";
import Agendamento from "~/server/database/models/agendamentoModel";

export default defineEventHandler(async (event: H3Event) => {
  console.log("verifyClone");

  const result = await readBody(event); // Lê o corpo da requisição

  try {
    const isDuplicated = await Agendamento.exists({
      Horário_da_Mensagem: result["Horário da Mensagem"],
      Data_da_Mensagem: result["Data da Mensagem"],
    });

    console.log(isDuplicated);

    // Retorna erro 400 se houver duplicidade
    if (isDuplicated)
      throw createError({
        statusCode: 400,
        message: "Horário indisponível nessa data",
      });
  } catch (err: any) {
    console.error("Erro ao verificar duplicidade: ", err);
    throw createError({
      statusCode: 500,
      statusMessage: "Erro interno no servidor",
    });
  }
});
