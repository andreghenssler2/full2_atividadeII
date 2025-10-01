const express = require('express');
const cors = require('cors');
const app = express();

// Permitir apenas o frontend React em http://localhost:3000
app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());

// Rotas da API
const rotas = require('./routes');
app.use('/api', rotas);

app.listen(4000, () => {
  console.log('Servidor rodando na porta 4000');
});
