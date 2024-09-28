const nodemailer = require('nodemailer');
const dotenv = require('dotenv')

dotenv.config(); // Carrega as variáveis de ambiente

async function sendData(req, res) {
  console.log('sendData');
  const result = req.body;

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
    to: 'clubpenguinganball14@gmail.com',
    subject: `Mensagem ${result["Modelo de Mensagem"]} de ${result["Nome de Quem Envia"]} para ${result["Horário da Mensagem"]}`,
    text: sendMessage
  };
  
  try {
    await transporter.sendMail(message); // Envia o e-mail
    console.log('Email enviado com sucesso!');
    return res.status(200).send('Email enviado com sucesso!'); // Envia resposta ao cliente
  } catch (error) {
    console.error('Erro ao enviar o email:', error);
    return res.status(400).set('Content-Type', 'text/plain').send('Erro ao agendar, tente novamente');
  }
}

module.exports = sendData;
