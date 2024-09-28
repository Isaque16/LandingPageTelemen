// Importar os módulos necessários
const express = require('express');
const app = express();
const fs = require('fs/promises'); // Usando o módulo de promessas do fs
const path = require('path');

app.use(express.urlencoded({ extended: true })); // Middleware para parsear o corpo das requisições como JSON
app.use(express.json()); // Middleware para parsear requisições URl-encoded

// Função middleware para verificar duplicidade e registrar dados
async function registScheduling(req, res, next) {
  console.log('registScheduling');
  // Pega os dados do form e estrutura os dados a serem salvos 
  const result = req.body
  const dataPath = path.join(__dirname, '..', 'database', 'agendamentos.json'); // Caminho do arquivo de agendamentos

  try {
    // Tenta ler o arquivo de agendamentos
    let data;
    try {
      data = await fs.readFile(dataPath, 'utf8');
    } catch (err) {
      if (err.code === 'ENOENT') {
        // Se o arquivo não existir, continua o processo (arquivo será criado)
        console.log('Arquivo não encontrado, criando um novo...');
        await fs.writeFile(dataPath, JSON.stringify([result], null, 2)); // Cria o arquivo com o primeiro conteúdo
        console.log('Dados enviados e registrados!');
        next(); // Continua o fluxo
      } else {
        throw err; // Repassa o erro para ser tratado pelo bloco catch externo
      }
    }

    // Se o arquivo foi lido com sucesso
    let jsonData = JSON.parse(data) || []; // Analisa o conteúdo do arquivo como JSON

    jsonData.push(result); // Adiciona os novos dados recebidos ao array de dados

    const updatedData = JSON.stringify(jsonData, null, 2); // Converte novamente os dados para o formato JSON

    // Cria outro arquivo com os dados atualizados recebidos do form
    await fs.writeFile(dataPath, updatedData); // Esta linha recarrega a página, por algum motivo(desconhecido)
    console.log('Dados registrados e atualizados!');
    next(); // Continua o fluxo
  } catch (err) {
    console.error('Erro ao processar os dados: ', err);
    return res.status(500).set('Content-Type', 'text/plain').send('Erro ao processar os dados');
  }
}

module.exports = registScheduling;
