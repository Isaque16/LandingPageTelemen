const express = require('express');
const app = express();
const fs = require('fs').promises; // Usando a versão Promises do fs
const path = require('path');

app.use(express.urlencoded({ extended: true })); // Middleware para parsear o corpo das requisições como JSON
app.use(express.json()); // Middleware para parsear requisições URl-encoded

// Função middleware para verificar duplicidade de dados
async function verifyClone(req, res, next) {
  console.log('verifyClone');
  const result = req.body

  const dataPath = path.join(__dirname, '..', 'database', 'agendamentos.json');

  try {
    const data = await fs.readFile(dataPath, 'utf8');
    const jsonData = JSON.parse(data) || [];
    
    const isDuplicated = jsonData.some(element => 
      (element["Horário da Mensagem"] === result["Horário da Mensagem"]) && (element["Data da Mensagem"] === result["Data da Mensagem"])
    );

    console.log(isDuplicated);
    
    if (isDuplicated) return res.status(400).send('Esse horário está indisponível nessa data');
    else next();

  } catch (err) {
    if (err.code === 'ENOENT') console.log('Arquivo não encontrado, criando um novo.');
    else if (err instanceof SyntaxError) {
      console.error('Erro ao analisar o JSON: ', err);
      return res.status(500).send('Erro ao analisar o JSON');
    } else {
      console.error('Erro ao ler o arquivo: ', err);
      return res.status(500).send('Erro ao ler o arquivo');
    }
  }
}

module.exports = verifyClone;