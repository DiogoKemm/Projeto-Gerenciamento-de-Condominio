import React, { useEffect, useState } from "react";
import axios from "axios";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import Login from "./pages/LoginPage";
import CadastrarMorador from "./pages/CadastrarMorador";
import CadastrarZelador from "./pages/CadastrarZelador";
import ListaApartamentos from "./pages/ListaApartamentos";
import ListaMercadorias from "./pages/ListaMercadorias";
import Dashboard from "./components/Dashboard";
import NoPage from "./pages/NoPage";
import './App.css';
import Navbar from "./components/Navbar";

axios.defaults.baseURL = "http://localhost:8080/";
axios.defaults.headers.common["Content-Type"] = "application/json;charset=utf-8";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    const role = sessionStorage.getItem("role");

    if (token) {
      setIsLoggedIn(true);
      setUserRole(role);
    }
  }, []);

  useEffect(() => {
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
    
  }, [userRole]);

  const handleLogin = (role, token) => {
    sessionStorage.setItem("token", token);
    sessionStorage.setItem("role", role);
    setUserRole(role);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    sessionStorage.clear();
    setIsLoggedIn(false);
    setUserRole("");
    navigate("/");
  };

  return (
    <div className="container-fluid">
      {isLoggedIn ? (
        <>
          <Navbar userRole={userRole} onLogout={handleLogout} />
          <Routes>
            <Route path="*" element={<NoPage />} />
            <Route path="login" element={<Login onLogin={handleLogin} />} />
            <Route path="/" element={<Dashboard role={userRole} />} />
            <Route path="CadastrarMorador" element={<CadastrarMorador />} />
            <Route path="CadastrarZelador" element={<CadastrarZelador />} />
            <Route path="ListaApartamentos" element={<ListaApartamentos />} />
            <Route path="ListaMercadorias" element={<ListaMercadorias />} />
          </Routes>
        </>
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </div>
  );
}

export default App;