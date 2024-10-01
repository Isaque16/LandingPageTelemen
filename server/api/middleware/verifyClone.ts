// server/middleware/verifyData.ts
import { promises as fs } from 'fs';
import path from 'path';
import type { H3Event } from 'h3';

export default defineEventHandler(async (event: H3Event) => {
  console.log('verifyClone');

  const result = await readBody(event); // Lê o corpo da requisição

  const dataPath = path.join(process.cwd(), 'server', 'database', 'agendamentos.json');

  try {
    // Lê o arquivo JSON de agendamentos
    const data = await fs.readFile(dataPath, 'utf8');
    const jsonData = JSON.parse(data) || [];

    // Verifica duplicidade
    const isDuplicated = jsonData.some((element: any) => 
      element["Horário da Mensagem"] === result["Horário da Mensagem"] &&
      element["Data da Mensagem"] === result["Data da Mensagem"]
    );

    console.log(isDuplicated);

    // Retorna erro 400 se houver duplicidade
    if (isDuplicated) createError({ status: 400, message: 'Esse horário está indisponível nessa data'});

  } catch (err: any) {
    if (err instanceof SyntaxError) {
      console.error('Erro ao analisar o JSON: ', err);
      throw createError({
        statusCode: 500,
        statusMessage: 'Erro ao analisar o JSON',
      });
    } else {
      console.error('Erro ao ler o arquivo: ', err);
      throw createError({
        statusCode: 500,
        statusMessage: 'Erro ao ler o arquivo',
      });
    }
  }
});
