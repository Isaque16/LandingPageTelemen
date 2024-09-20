// Importando módulos necessários
const express = require('express');
const app = express();
const cors = require('cors')
const path = require('path');

app.use(cors())
// Configura o body-parser para lidar com dados do formulário
app.use(express.urlencoded({ extended: true })); // Middleware para parsear o corpo das requisições como JSON
app.use(express.json()); // Middleware para parsear requisições URl-encoded

const verifyClone = require('./middleware/verifyClone.cjs')
const registScheduling = require('./middleware/registScheduling.cjs')
const sendData = require('./routes/sendData.cjs')
app.post('/submit', verifyClone, registScheduling, sendData); // Rota POST(dos dados do formulário)

// Qualquer outra rota leva à página de erro
app.all('*', (req, res) => {
    res.status(404);
    if (req.accepts('html')) 
        res.sendFile(path.join(__dirname, '..', 'frontend', 'views', '404.html'));
    else if (req.accepts('json')) 
        res.json({ "error": "Erro 404" });
    else 
        res.type('txt').send('404 not found');
});

// Inicia o servidor
const PORT = 3500;
app.listen(PORT, () => console.log(`Servidor rodando em http://localhost:${PORT}`));
    