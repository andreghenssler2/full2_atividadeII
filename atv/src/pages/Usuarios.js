import React, { useEffect, useState } from "react";
import axios from "axios";

function Usuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [editId, setEditId] = useState(null);

  const carregarUsuarios = () => {
    axios.get("http://localhost:4000/api/usuarios")
      .then(res => setUsuarios(res.data))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    carregarUsuarios();
  }, []);

  const salvarUsuario = (e) => {
    e.preventDefault();
    const dados = { nome, email };

    if (editId) {
      axios.put(`http://localhost:4000/api/usuarios/${editId}`, dados)
        .then(() => {
          carregarUsuarios();
          setNome(""); setEmail(""); setEditId(null);
        });
    } else {
      axios.post("http://localhost:4000/api/usuarios", dados)
        .then(() => {
          carregarUsuarios();
          setNome(""); setEmail("");
        });
    }
  };

  const excluirUsuario = (id) => {
    axios.delete(`http://localhost:4000/api/usuarios/${id}`)
      .then(() => carregarUsuarios());
  };

  const editarUsuario = (usuario) => {
    setNome(usuario.nome);
    setEmail(usuario.email);
    setEditId(usuario.id);
  };

  return (
    <div className="container mt-4">
      <h2>Usuários</h2>

      <form className="row g-3 mb-4" onSubmit={salvarUsuario}>
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
            type="email"
            className="form-control"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            <th>E-mail</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map(u => (
            <tr key={u.id}>
              <td>{u.nome}</td>
              <td>{u.email}</td>
              <td>
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
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Usuarios;
