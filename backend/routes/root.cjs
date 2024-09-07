// Importando módulos necessários
const express = require('express')
const app     = express()
const path    = require('path')

// Configurar rotas
function root (__, res) {
  res.sendFile(path.join(__dirname, '..', '..', 'index.html')) // Serve a página html
  res.status(200)
}

module.exports = root