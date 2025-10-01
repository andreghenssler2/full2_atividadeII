const express = require('express');
const router = express.Router();

// Rotas de usuários
router.get('/usuarios', (req, res) => {
  res.json([
    { id: 1, nome: "André", email: "andre@gmail.com" },
    { id: 2, nome: "Maria", email: "maria@gmail.com" }
  ]);
});

// Rotas de produtos
router.get('/produtos', (req, res) => {
  res.json([
    { id: 1, nome: "Notebook", preco: 3500 },
    { id: 2, nome: "Celular", preco: 2000 }
  ]);
});

module.exports = router;
