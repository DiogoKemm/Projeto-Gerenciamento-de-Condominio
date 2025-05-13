import React, { useEffect, useState } from "react";
import axios from "axios";
import { Routes, Route, useNavigate } from "react-router-dom";
import Login from "./pages/LoginPage";
import CadastrarMorador from "./pages/CadastrarMorador";
import CadastrarZelador from "./pages/CadastrarZelador";
import ListaApartamentos from "./pages/ListaApartamentos";
import ListaMercadorias from "./pages/ListaMercadorias";
import Dashboard from "./components/Dashboard";
import NoPage from "./pages/NoPage"
import './App.css';

axios.defaults.baseURL = "http://localhost:8080/";
axios.defaults.headers.common["Content-Type"] =
  "application/json;charset=utf-8";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    // Verifica sessionStorage em vez de localStorage
    const token = sessionStorage.getItem("token");
    const role = sessionStorage.getItem("role");
    if (token) {
      setIsLoggedIn(true);
      setUserRole(role);
    }

    document.body.className = '';

    switch (userRole) {
      case 'Sindico':
        document.body.style.background = 'linear-gradient(to right, #ff416c, #ff4b2b)';
        break;
      case 'Zelador':
        document.body.style.background = 'linear-gradient(to right,rgb(65, 170, 255),rgb(64, 43, 255))';
        break;
      default:
        document.body.style.background = 'linear-gradient(to right, #f2994a, #f2c94c)';
    }

    return () => {
      document.body.style.background = '';
    };
  }, [userRole]);

  const handleLogin = (role, token) => {
    setIsLoggedIn(true);
    setUserRole(role);
    // Armazena no sessionStorage em vez de localStorage
    sessionStorage.setItem("token", token);
    sessionStorage.setItem("role", role);
  };

  const handleLogout = () => {
    // Limpa o sessionStorage em vez de localStorage
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("role");
    setIsLoggedIn(false);
    setUserRole("");
    navigate("/");
  };

  return (
    <div>
      {isLoggedIn ? (
        <div className="container-fluid">
          <div className="mb-3">
            <button type='button' className="btn btn-warning" onClick={() => navigate("/")}>
              Início
            </button>{' '}
            <button type='button' className="btn btn-primary" onClick={() => navigate("CadastrarMorador")}>
              Cadastrar morador
            </button>{' '}
            {userRole === 'Sindico' && (
              <button type='button' className="btn btn-primary" onClick={() => navigate("CadastrarZelador")}>
                Cadastrar zelador
              </button>
            )}{' '}
            <button type='button' className="btn btn-primary" onClick={() => navigate("ListaApartamentos")}>
              Lista de apartamentos
            </button>{' '}
            <button type='button' className="btn btn-primary" onClick={() => navigate("ListaMercadorias")}>
              Lista de mercadorias
            </button>{' '}
            <button type='button' className="btn btn-danger" onClick={handleLogout}>
              Logout
            </button>
          </div>

          <div className="row">
            <div className="col" md={10}>
              <Routes>
                <Route path='*' element={<NoPage />} />
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