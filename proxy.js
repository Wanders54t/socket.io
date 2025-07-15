const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

app.post('/proxy', async (req, res) => {
  const { url, token, userAgent } = req.body;
  if (!url || !token) {
    return res.status(400).json({ error: 'URL e Token obrigatórios.' });
  }

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `Token ${token}`,
        'User-Agent': userAgent || 'Dalvik/2.1.0 (Linux; U; Android 13; RMX5070 Build/TKQ1.221114.001)',
        'Host': '213.199.56.115',
        'Connection': 'Keep-Alive',
        'Accept-Encoding': 'gzip'
      }
    });

    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar dados da API.', details: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('Proxy rodando na porta', PORT);
});
