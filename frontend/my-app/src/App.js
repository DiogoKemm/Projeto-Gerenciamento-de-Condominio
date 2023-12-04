import React from "react";
import axios from "axios";
import { Routes, Route, useNavigate } from "react-router-dom";
import Login from "./pages/LoginPage";
import CadastrarMorador from "./pages/CadastrarMorador";
import CadastrarZelador from "./pages/CadastrarZelador";
import ListaApartamentos from "./pages/ListaApartamentos";
import ListaMercadoriasTable from "./components/ListaMercadoriasTable";
import ListaMercadorias from "./pages/ListaMercadorias";
import './App.css';
import {
  Box,
  Button,
  Container,
  CssBaseline,
  Grid,
  Stack,
} from "@mui/material";
import ListaApartamentosTable from "./components/LIstaApartamentosTable";

axios.defaults.baseURL = "http://localhost:8080/";
axios.defaults.headers.common["Content-Type"] =
  "application/json;charset=utf-8";

function App() {

  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  const navigate = useNavigate();

  React.useEffect(() => {
    // verifica se já está logado
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    // Clear the token from localStorage
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };

  return (
    <Box>
      {isLoggedIn ? (
        <Container sx={{ flexGrow: 1 }} maxWidth="lg">

          <Button variant="text" onClick={() => navigate("CadastrarMorador")}>
            Cadastrar morador
          </Button>
          <Button variant="text" onClick={() => navigate("CadastrarZelador")}>
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
                element={"Bem vindo!"}
                />
                <Route
                  path="CadastrarMorador"
                  element={<CadastrarMorador />}
                />
                <Route
                  path="ListaMercadorias"
                  element={<ListaMercadorias/>}
                />
                <Route
                  path="ListaApartamentos"
                  element={<ListaApartamentosTable />}
                />
                <Route
                  path="CadastrarZelador"
                  element={<CadastrarZelador />}
                />
              </Routes>
            </Grid>
          </Grid>
        </Container>
      ) : (<Login onLogin={handleLogin} />)}
    </Box>
  );
}

export default App;
