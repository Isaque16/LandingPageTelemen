// server/middleware/registScheduling.ts
import { promises as fs } from "fs";
import path from "path";
import type { H3Event } from "h3";

export default defineEventHandler(async (event: H3Event) => {
  console.log("registScheduling");

  // Lê os dados enviados no corpo da requisição
  const result = await readBody(event);

  // Caminho do arquivo de agendamentos
  const dataPath = path.join(
    process.cwd(),
    "server",
    "database",
    "agendamentos.json",
  );

  try {
    // Tenta ler o arquivo de agendamentos
    let data;
    try {
      data = await fs.readFile(dataPath, "utf8");
    } catch (err: any) {
      if (err.code === "ENOENT") {
        // Se o arquivo não existir, cria um novo com os dados atuais
        console.log("Arquivo não encontrado, criando um novo...");
        await fs.writeFile(dataPath, JSON.stringify([result], null, 2)); // Cria o arquivo com os primeiros dados
        console.log("Dados enviados e registrados!");
        return; // Finaliza o middleware
      } else {
        throw err; // Propaga o erro para o catch externo
      }
    }

    // Se o arquivo foi lido com sucesso
    let jsonData = JSON.parse(data) || []; // Converte o conteúdo para JSON

    // Adiciona os novos dados
    jsonData.push(result);

    // Converte novamente para string JSON formatada
    const updatedData = JSON.stringify(jsonData, null, 2);

    // Escreve os dados atualizados no arquivo
    await fs.writeFile(dataPath, updatedData);
    console.log("Dados registrados e atualizados!");
  } catch (err) {
    console.error("Erro ao processar os dados: ", err);
    throw createError({
      statusCode: 500,
      statusMessage: "Erro ao processar os dados",
    });
  }
});
