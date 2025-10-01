// db/dados.js

let produtos = [
  { id: 1, nome: "Notebook", valor: 3500, quantidade: 5 },
  { id: 2, nome: "Mouse", valor: 50, quantidade: 20 },
  { id: 3, nome: "Teclado", valor: 60, quantidade: 20 }
];

let usuarios = [
  { id: 1, nome: "Admin", senha: "1234", tipo: "admin" },
  { id: 2, nome: "Cliente", senha: "abcd", tipo: "cliente" }
];

// Exportar para usar nas rotas
module.exports = { produtos, usuarios };
