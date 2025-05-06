import React, { useState } from "react";
import ListaApartamentosTable from "../components/LIstaApartamentosTable";
import CadastrarApartamento from "../components/CadastrarApartamento";
import "../App.css"

const ListaApartamentos = () => {

  const [showForm, setShowForm] = useState(false);


  const mostrarForm = () => {
    setShowForm(!showForm);
  }

  return (
    <div className="container-fluid">

      <button onClick={mostrarForm}>Cadastrar apartamento</button>
      {showForm && (<CadastrarApartamento />)}
      <ListaApartamentosTable />
    </div>
  )
};

export default ListaApartamentos;
