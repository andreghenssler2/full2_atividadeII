import React, { useEffect, useState } from "react";
import axios from "axios";

function Produtos() {
  const [produtos, setProdutos] = useState([]);
  const [nome, setNome] = useState("");
  const [preco, setPreco] = useState("");
  const [editId, setEditId] = useState(null);

  const carregarProdutos = () => {
    axios.get("http://localhost:4000/api/produtos")
      .then(res => setProdutos(res.data))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    carregarProdutos();
  }, []);

  const salvarProduto = (e) => {
    e.preventDefault();
    const dados = { nome, preco };

    if (editId) {
      axios.put(`http://localhost:4000/api/produtos/${editId}`, dados)
        .then(() => {
          carregarProdutos();
          setNome(""); setPreco(""); setEditId(null);
        });
    } else {
      axios.post("http://localhost:4000/api/produtos", dados)
        .then(() => {
          carregarProdutos();
          setNome(""); setPreco("");
        });
    }
  };

  const excluirProduto = (id) => {
    axios.delete(`http://localhost:4000/api/produtos/${id}`)
      .then(() => carregarProdutos());
  };

  const editarProduto = (produto) => {
    setNome(produto.nome);
    setPreco(produto.preco);
    setEditId(produto.id);
  };

  return (
    <div className="container mt-4">
      <h2>Produtos</h2>

      <form className="row g-3 mb-4" onSubmit={salvarProduto}>
        <div className="col-md-5">
          <input
            type="text"
            className="form-control"
            placeholder="Nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
        </div>
        <div className="col-md-5">
          <input
            type="number"
            className="form-control"
            placeholder="Preço"
            value={preco}
            onChange={(e) => setPreco(e.target.value)}
            required
          />
        </div>
        <div className="col-md-2">
          <button type="submit" className="btn btn-primary w-100">
            {editId ? "Atualizar" : "Adicionar"}
          </button>
        </div>
      </form>

      <table className="table table-striped">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Preço</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {produtos.map(p => (
            <tr key={p.id}>
              <td>{p.nome}</td>
              <td>R$ {p.preco}</td>
              <td>
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
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Produtos;
