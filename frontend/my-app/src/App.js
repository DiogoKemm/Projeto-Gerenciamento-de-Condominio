import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import CadastrarMorador from "./pages/CadastrarMorador";
import ListaApartamentos from "./pages/ListaApartamentos";
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Dashboard />} />
        <Route path="CadastrarMorador" element={<CadastrarMorador />} />
        <Route path="ListaApartamentos" element={<ListaApartamentos/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
