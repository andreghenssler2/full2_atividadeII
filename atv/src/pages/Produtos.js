import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Produtos() {
  const [produtos, setProdutos] = useState([]);
  const [nome, setNome] = useState("");
  const [preco, setPreco] = useState("");
  const [editId, setEditId] = useState(null);

  // Carregar produtos
  const carregarProdutos = () => {
    axios
      .get("http://localhost:4000/api/produtos")
      .then((res) => setProdutos(res.data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    carregarProdutos();
  }, []);

  // Adicionar ou Editar
  const salvarProduto = () => {
    if (editId) {
      axios
        .put(`http://localhost:4000/api/produtos/${editId}`, { nome, preco })
        .then(() => {
          carregarProdutos();
          setNome("");
          setPreco("");
          setEditId(null);
        });
    } else {
      axios
        .post("http://localhost:4000/api/produtos", { nome, preco })
        .then(() => {
          carregarProdutos();
          setNome("");
          setPreco("");
        });
    }
  };

  // Editar
  const editarProduto = (produto) => {
    setNome(produto.nome);
    setPreco(produto.preco);
    setEditId(produto.id);
  };

  // Excluir
  const excluirProduto = (id) => {
    axios.delete(`http://localhost:4000/api/produtos/${id}`).then(() => {
      carregarProdutos();
    });
  };

  return (
    <div className="container mt-4">
      <h2>Gerenciar Produtos</h2>

      <div className="mb-3">
        <input
          type="text"
          className="form-control mb-2"
          placeholder="Nome do Produto"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />
        <input
          type="number"
          className="form-control mb-2"
          placeholder="Preço"
          value={preco}
          onChange={(e) => setPreco(e.target.value)}
        />
        <button className="btn btn-primary" onClick={salvarProduto}>
          {editId ? "Atualizar" : "Adicionar"}
        </button>
      </div>

      <ul className="list-group">
        {produtos.map((p) => (
          <li key={p.id} className="list-group-item d-flex justify-content-between">
            <span>
              {p.nome} - R$ {p.preco}
            </span>
            <div>
              <button
                className="btn btn-warning btn-sm me-2"
                onClick={() => editarProduto(p)}
              >
                Editar
              </button>
              <button
                className="btn btn-danger btn-sm"
                onClick={() => excluirProduto(p.id)}
              >
                Excluir
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
