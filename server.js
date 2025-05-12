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

// Middleware para processar JSON
app.use(express.json());

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

// Endpoint para salvar logs no arquivo ip.txt
app.post('/save-log', (req, res) => {
  const { dns } = req.body;

  if (!dns || !dns.geo || !dns.ip) {
    return res.status(400).json({ error: 'Formato inválido. É necessário fornecer "dns.geo" e "dns.ip".' });
  }

  const logData = `Geo: ${dns.geo}, IP: ${dns.ip}`;
  const logFilePath = path.join(__dirname, 'ip.txt');

  fs.appendFile(logFilePath, logData + '\n', (err) => {
    if (err) {
      console.error('Erro ao salvar o log:', err);
      return res.status(500).json({ error: 'Erro ao salvar o log' });
    }

    res.status(200).json({ message: 'Log salvo com sucesso' });
  });
});

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
