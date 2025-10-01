import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Usuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [editId, setEditId] = useState(null);

  // Carregar usuários
  const carregarUsuarios = () => {
    axios
      .get("http://localhost:4000/api/usuarios")
      .then((res) => setUsuarios(res.data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    carregarUsuarios();
  }, []);

  // Adicionar ou Editar
  const salvarUsuario = () => {
    if (editId) {
      axios
        .put(`http://localhost:4000/api/usuarios/${editId}`, { nome, email })
        .then(() => {
          carregarUsuarios();
          setNome("");
          setEmail("");
          setEditId(null);
        });
    } else {
      axios
        .post("http://localhost:4000/api/usuarios", { nome, email })
        .then(() => {
          carregarUsuarios();
          setNome("");
          setEmail("");
        });
    }
  };

  // Editar
  const editarUsuario = (usuario) => {
    setNome(usuario.nome);
    setEmail(usuario.email);
    setEditId(usuario.id);
  };

  // Excluir
  const excluirUsuario = (id) => {
    axios.delete(`http://localhost:4000/api/usuarios/${id}`).then(() => {
      carregarUsuarios();
    });
  };

  return (
    <div className="container mt-4">
      <h2>Gerenciar Usuários</h2>

      <div className="mb-3">
        <input
          type="text"
          className="form-control mb-2"
          placeholder="Nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />
        <input
          type="email"
          className="form-control mb-2"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button className="btn btn-primary" onClick={salvarUsuario}>
          {editId ? "Atualizar" : "Adicionar"}
        </button>
      </div>

      <ul className="list-group">
        {usuarios.map((u) => (
          <li key={u.id} className="list-group-item d-flex justify-content-between">
            <span>
              {u.nome} - {u.email}
            </span>
            <div>
              <button
                className="btn btn-warning btn-sm me-2"
                onClick={() => editarUsuario(u)}
              >
                Editar
              </button>
              <button
                className="btn btn-danger btn-sm"
                onClick={() => excluirUsuario(u.id)}
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
