const express = require('express');
const cors = require('cors');

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

// Endpoint para buscar filmes por categoria
app.get('/api/movies/category', async (req, res) => {
  const { category, page = 1 } = req.query;
  const url = `https://api.baserow.io/api/database/rows/table/228337/?user_field_names=true&order_by=-Data&size=40&filter__field_1593931__contains=${encodeURIComponent(category)}&page=${page}`;
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

    if (!response.ok) throw new Error('Erro ao buscar filmes por categoria');
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Erro ao buscar filmes por categoria:', error);
    res.status(500).json({ error: 'Erro ao buscar filmes por categoria' });
  }
});

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
