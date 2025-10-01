const express = require("express");
const router = express.Router();
let { usuarios } = require("../db/dados"); // importa o array

// Listar usuários
router.get("/", (req, res) => {
  res.json(usuarios);
});

// Criar usuário
router.post("/", (req, res) => {
  const { nome, senha, tipo } = req.body;
  if (!nome || !senha || !tipo) {
    return res.status(400).json({ erro: "Preencha todos os campos" });
  }

  const novo = {
    id: usuarios.length ? usuarios[usuarios.length - 1].id + 1 : 1,
    nome,
    senha,
    tipo
  };

  usuarios.push(novo);
  res.status(201).json(novo);
});

// Atualizar usuário
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { nome, senha, tipo } = req.body;

  const index = usuarios.findIndex(u => u.id == id);
  if (index === -1) return res.status(404).json({ erro: "Usuário não encontrado" });

  usuarios[index] = { ...usuarios[index], nome, senha, tipo };
  res.json(usuarios[index]);
});

// Excluir usuário
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  const index = usuarios.findIndex(u => u.id == id);

  if (index === -1) return res.status(404).json({ erro: "Usuário não encontrado" });

  const removido = usuarios.splice(index, 1);
  res.json(removido[0]);
});

module.exports = router;
