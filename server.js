const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

const app = express();
const PORT = 3000;

// Middleware para habilitar CORS
app.use(cors({
  origin: 'https://cinefly.wuaze.com' // Permitir apenas o domínio do front-end
}));

// Endpoint para fornecer o token de forma segura
app.get('/api/token', (req, res) => {
  res.json({ token: '642C9lnOkgh3JF5XELTe687eQtSphPXh' }); // Token fixo
});

// Endpoint para buscar filmes da API externa
app.get('/api/movies', async (req, res) => {
  const { page = 1, search = '' } = req.query; // Parâmetros de paginação e busca
  const url = `https://api.baserow.io/api/database/rows/table/228337/?user_field_names=true&order_by=-Views&size=25&page=${page}&search=${encodeURIComponent(search)}`;
  const token = '642C9lnOkgh3JF5XELTe687eQtSphPXh';

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `Token ${token}`,
        'Accept-Encoding': 'gzip',
        'User-Agent': 'Node.js Server',
      }
    });

    if (!response.ok) throw new Error('Erro ao buscar filmes da API externa');
    const data = await response.json();
    res.json(data); // Retorna o JSON diretamente para o front-end
  } catch (error) {
    console.error('Erro ao buscar filmes:', error);
    res.status(500).json({ error: 'Erro ao buscar filmes' });
  }
});

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
