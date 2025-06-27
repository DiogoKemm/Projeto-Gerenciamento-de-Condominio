// components/Navbar.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Navbar({ userRole, onLogout }) {
  const navigate = useNavigate();

  return (
    <div className="mb-3 d-flex flex-wrap gap-2">
      <button className="btn btn-warning" onClick={() => navigate("/")}>Início</button>
      <button className="btn btn-primary" onClick={() => navigate("CadastrarMorador")}>Cadastrar morador</button>
      {userRole === 'Sindico' && (
        <button className="btn btn-primary" onClick={() => navigate("CadastrarZelador")}>Cadastrar zelador</button>
      )}
      <button className="btn btn-primary" onClick={() => navigate("ListaApartamentos")}>Lista de apartamentos</button>
      <button className="btn btn-primary" onClick={() => navigate("ListaMercadorias")}>Lista de mercadorias</button>
      <button className="btn btn-danger" onClick={onLogout}>Logout</button>
    </div>
  );
}
