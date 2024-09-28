// Importando módulos necessários
const express = require('express');
const app = express();
const cors = require('cors')

app.use(cors())
// Configura o body-parser para lidar com dados do formulário
app.use(express.urlencoded({ extended: true })); // Middleware para parsear o corpo das requisições como JSON
app.use(express.json()); // Middleware para parsear requisições URl-encoded

const verifyClone = require('./middleware/verifyClone.cjs')
const registScheduling = require('./middleware/registScheduling.cjs')
const sendData = require('./api/sendData.cjs')
app.post('/submit', verifyClone, registScheduling, sendData); // Rota POST(dos dados do formulário)

// Inicia o servidor
app.listen(3000, () => console.log(`Servidor rodando em http://localhost:3000`));
    