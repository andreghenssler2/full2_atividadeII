const express = require("express");
const router = express.Router();
let { produtos } = require("../db/dados"); // importa o array

// Listar todos os produtos ou buscar por parâmetro
router.get("/", (req, res) => {
  const { nome, valor, quantidade } = req.query;

  let resultado = produtos;

  if (nome) {
    resultado = resultado.filter(p => 
      p.nome.toLowerCase().includes(nome.toLowerCase())
    );
  }
  if (valor) {
    resultado = resultado.filter(p => p.valor == valor);
  }
  if (quantidade) {
    resultado = resultado.filter(p => p.quantidade == quantidade);
  }

  res.json(resultado);
});

// Cadastrar produto
router.post("/", (req, res) => {
  const { nome, valor, quantidade } = req.body;
  if (!nome || !valor || !quantidade) {
    return res.status(400).json({ erro: "Preencha todos os campos" });
  }

  const novo = {
    id: produtos.length ? produtos[produtos.length - 1].id + 1 : 1,
    nome,
    valor,
    quantidade
  };

  produtos.push(novo);
  res.status(201).json(novo);
});

// Atualizar produto
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { nome, valor, quantidade } = req.body;

  const index = produtos.findIndex(p => p.id == id);
  if (index === -1) return res.status(404).json({ erro: "Produto não encontrado" });

  produtos[index] = { ...produtos[index], nome, valor, quantidade };
  res.json(produtos[index]);
});

// Excluir produto
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  const index = produtos.findIndex(p => p.id == id);

  if (index === -1) return res.status(404).json({ erro: "Produto não encontrado" });

  const removido = produtos.splice(index, 1);
  res.json(removido[0]);
});

module.exports = router;
