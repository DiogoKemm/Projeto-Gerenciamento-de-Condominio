import React, {useEffect, useState} from "react";
import axios from "axios";
import { Routes, Route, useNavigate } from "react-router-dom";
import Login from "./pages/LoginPage";
import CadastrarMorador from "./pages/CadastrarMorador";
import CadastrarZelador from "./pages/CadastrarZelador";
import ListaApartamentos from "./pages/ListaApartamentos";
import ListaMercadorias from "./pages/ListaMercadorias";
import Dashboard from "./components/Dashboard";
import './App.css';
import {
  Box,
  Button,
  Container,
  Grid
} from "@mui/material";

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
    
    <Box>
      {isLoggedIn ? (
        <Container sx={{ flexGrow: 1 }} maxWidth="lg">
          <Dashboard role={userRole}/>
          <Button variant="text" onClick={() => navigate("CadastrarMorador")}>
            Cadastrar morador
          </Button>
          <Button
            variant="text"
            onClick={() => navigate("CadastrarZelador")}
            sx={{ display: userRole === 'Sindico' ? 'inline' : 'none' }} 
          >
            Cadastrar zelador
          </Button>
          <Button variant="text" onClick={() => navigate("ListaApartamentos")}>
            Lista de apartamentos
          </Button>
          <Button variant="text" onClick={() => navigate("ListaMercadorias")}>
            Lista de mercadorias
          </Button>
          <Button variant="text" color="error" onClick={handleLogout}>
            Logout
          </Button>
          <Grid container justifyContent="center" spacing={2}>
            <Grid >
              <Routes>
                <Route
                  path="login"
                  element={<Login onLogin={handleLogin} />}
                />
                <Route
                  path="/"
                  element={"\nBem vindo!"}
                />
                <Route
                  path="CadastrarMorador"
                  element={<CadastrarMorador />}
                />
                <Route
                  path="ListaMercadorias"
                  element={<ListaMercadorias />}
                />
                <Route
                  path="ListaApartamentos"
                  element={<ListaApartamentos />}
                />
                <Route
                  path="CadastrarZelador"
                  element={<CadastrarZelador />}
                />
              </Routes>
            </Grid>
          </Grid>
        </Container>
      ) : (<Login onLogin={(role) => handleLogin(role)} />)}
    </Box>
  );
}

export default App;
