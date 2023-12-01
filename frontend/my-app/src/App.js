import { BrowserRouter, Routes, Route} from "react-router-dom";
import CadastrarMorador from "./pages/CadastrarMorador";
import ListaApartamentos from "./pages/ListaApartamentos";
import ListaMercadorias from "./pages/ListaMercadorias";
import './App.css';
import Login from "./pages/LoginPage";
import React from "react";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Login />} />
        <Route path="CadastrarMorador" element={<CadastrarMorador />} />
        <Route path="ListaApartamentos" element={<ListaApartamentos />} />
        <Route path="ListaMercadorias" element={<ListaMercadorias />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
