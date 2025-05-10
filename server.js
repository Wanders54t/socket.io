const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware para habilitar CORS apenas para cinefly.wuaze.com
app.use(cors({
  origin: 'https://cinefly.wuaze.com'
}));

// Endpoint para fornecer o token de forma segura
app.get('/api/token', (req, res) => {
  const tokenPath = path.join(__dirname, 'token.txt');
  fs.readFile(tokenPath, 'utf8', (err, data) => {
    if (err) {
      console.error('Erro ao ler o arquivo de token:', err);
      return res.status(500).json({ error: 'Erro interno do servidor' });
    }
    res.json({ token: data.trim() });
  });
});

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
