// Importando módulos necessários
require('dotenv').config();
const express      = require('express');
const app          = express();
const { v4: uuid } = require('uuid');
const nodemailer   = require('nodemailer');
const { setCurrentTime, setCurrentDate } = require('../setCronos.cjs');

app.use(express.urlencoded({ extended: true })); // Middleware para parsear o corpo das requisições como JSON
app.use(express.json()); // Middleware para parsear requisições URl-encoded

const timeRegis = `Hora: ${setCurrentTime()} Data: ${setCurrentDate()}`;

// Rota para lidar com os dados do formulário
async function sendData(req, res, next) {
  console.log('sendData')
  const result = req.body

  // Configure o transportador de e-mail
  const transporter = nodemailer.createTransport({
    service: 'gmail', // Serviço de e-mail utilizado 
    secure: false,
    auth: {
      user: process.env.SendersEmail, 
      pass: process.env.SendersPassword 
    }
  });

  const sendMessage = `
  Uma nova mensagem foi agendada para ${result["Horário da Mensagem"]} às ${result["Data da Mensagem"]}!
  Informações abaixo:
  ${Object.entries(result).map(([key, value]) => `${key}: ${value}`).join('\n')}`;
  
  const message = {
    from: process.env.SendersEmail,
    // to: 'rosadesarom_ac2@hotmail.com',
    to: 'clubpenguinganball14@gmail.com',
    subject: `Mensagem ${result["Modelo de Mensagem"]} de ${result["Nome de Quem Envia"]} para ${result["Horário da Mensagem"]}`,
    text: sendMessage
  };
  
  try {
    await transporter.sendMail(message); // Envia o e-mail
    console.log('Email enviado com sucesso!');
    return res.status(200);
  } catch (error) {
    console.error('Erro ao salvar os dados', error);
    return res.status(400).set('Content-Type', 'text/plain').send('Erro agendar, tente novamente');
  }
}

module.exports = sendData;
