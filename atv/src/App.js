import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Usuarios from "./pages/Usuarios";
import Produtos from "./pages/Produtos";

function App() {
  return (
    <Router>
      <div className="container mt-4">
        <h1 className="mb-4">Sistema FullStack</h1>
        <nav className="mb-4">
          <Link to="/usuarios" className="btn btn-primary me-2">
            Usuários
          </Link>
          <Link to="/produtos" className="btn btn-success">
            Produtos
          </Link>
        </nav>

        <Routes>
          <Route path="/usuarios" element={<Usuarios />} />
          <Route path="/produtos" element={<Produtos />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
