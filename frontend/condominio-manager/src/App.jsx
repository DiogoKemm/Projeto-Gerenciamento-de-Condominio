import React, { useEffect, useState } from "react";
import axios from "axios";
import { Routes, Route, useNavigate } from "react-router-dom";
import Login from "./pages/LoginPage";
import CadastrarMorador from "./pages/CadastrarMorador";
import CadastrarZelador from "./pages/CadastrarZelador";
import ListaApartamentos from "./pages/ListaApartamentos";
import ListaMercadorias from "./pages/ListaMercadorias";
import Dashboard from "./components/Dashboard";
import './App.css';


axios.defaults.baseURL = "http://localhost:8080/";
axios.defaults.headers.common["Content-Type"] =
  "application/json;charset=utf-8";

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState("")

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role")
    if (token) {
      setIsLoggedIn(true);
      setUserRole(role)
    }
  }, []);

  const handleLogin = (role) => {
    setIsLoggedIn(true);
    setUserRole(role)
  };

  const handleLogout = () => {
    // Clear the token from localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setIsLoggedIn(false);
    setUserRole("");
  };

  return (
    <div>
      {isLoggedIn ? (
      <div className="container-fluid">
        <div className="mb-3">
        <button type='button' className="btn btn-link" onClick={() => navigate("CadastrarMorador")}>
            Cadastrar morador
          </button>{' '}
          {userRole === 'Sindico' && (
            <div type='button' className="btn btn-link" onClick={() => navigate("CadastrarZelador")}>
              Cadastrar zelador
            </div>
          )}
          <button type='button' className="btn btn-link" onClick={() => navigate("ListaApartamentos")}>
            Lista de apartamentos
          </button>{' '}
          <button type='button' className="btn btn-link" onClick={() => navigate("ListaMercadorias")}>
            Lista de mercadorias
          </button>{' '}
          <button type='button' className="btn btn-danger" onClick={handleLogout}>
            Logout
          </button>
        </div>

        <div className="row">
          <div className="col" md={10}>
            <Routes>
              <Route path="login" element={<Login onLogin={handleLogin} />} />
              <Route path="/" element={<Dashboard role={userRole} />} />
              <Route path="CadastrarMorador" element={<CadastrarMorador />} />
              <Route path="ListaMercadorias" element={<ListaMercadorias />} />
              <Route path="ListaApartamentos" element={<ListaApartamentos />} />
              <Route path="CadastrarZelador" element={<CadastrarZelador />} />
            </Routes>
          </div>
        </div>
      </div>
      ) : (
      <Login onLogin={handleLogin} />
      )}
    </div>
  );
}

export default App;
