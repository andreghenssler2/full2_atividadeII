const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors({
  origin: "http://localhost:3000"  // libera apenas o React
}));

app.use(express.json());

// suas rotas da API
const rotas = require('./routes');
app.use('/api', rotas);

app.listen(4000, () => {
  console.log('Servidor rodando na porta 4000');
});
