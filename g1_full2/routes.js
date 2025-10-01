const express = require("express");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const router = express.Router();


// ========== USUÁRIOS ==========

// GET todos usuários
router.get("/usuarios", async (req, res) => {
  const usuarios = await prisma.usuario.findMany();
  res.json(usuarios);
});

// POST criar usuário
router.post("/usuarios", async (req, res) => {
  const { nome, email } = req.body;
  const novo = await prisma.usuario.create({ data: { nome, email } });
  res.json(novo);
});

// PUT atualizar usuário
router.put("/usuarios/:id", async (req, res) => {
  const { id } = req.params;
  const { nome, email } = req.body;
  const atualizado = await prisma.usuario.update({
    where: { id: Number(id) },
    data: { nome, email },
  });
  res.json(atualizado);
});

// DELETE excluir usuário
router.delete("/usuarios/:id", async (req, res) => {
  const { id } = req.params;
  await prisma.usuario.delete({ where: { id: Number(id) } });
  res.json({ msg: "Usuário excluído!" });
});


// ========== PRODUTOS ==========

// GET todos produtos
router.get("/produtos", async (req, res) => {
  const produtos = await prisma.produto.findMany();
  res.json(produtos);
});

// POST criar produto
router.post("/produtos", async (req, res) => {
  const { nome, preco } = req.body;
  const novo = await prisma.produto.create({
    data: { nome, preco: parseFloat(preco) },
  });
  res.json(novo);
});

// PUT atualizar produto
router.put("/produtos/:id", async (req, res) => {
  const { id } = req.params;
  const { nome, preco } = req.body;
  const atualizado = await prisma.produto.update({
    where: { id: Number(id) },
    data: { nome, preco: parseFloat(preco) },
  });
  res.json(atualizado);
});

// DELETE excluir produto
router.delete("/produtos/:id", async (req, res) => {
  const { id } = req.params;
  await prisma.produto.delete({ where: { id: Number(id) } });
  res.json({ msg: "Produto excluído!" });
});


module.exports = router;
