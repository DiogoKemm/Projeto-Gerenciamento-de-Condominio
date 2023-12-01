import { BrowserRouter, Routes, Route} from "react-router-dom";
import CadastrarMorador from "./pages/CadastrarMorador";
import ListaApartamentos from "./pages/ListaApartamentos";
import ListaMercadorias from "./pages/ListaMercadorias";
import CadastrarZelador from "./pages/CadastrarZelador";
import './App.css';
import Dashboard from "./pages/Dashboard";
import React from "react";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Dashboard />} />
        <Route path="CadastrarMorador" element={<CadastrarMorador />} />
        <Route path="ListaApartamentos" element={<ListaApartamentos />} />
        <Route path="ListaMercadorias" element={<ListaMercadorias />} />
        <Route path="CadastrarZelador" element={<CadastrarZelador/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
