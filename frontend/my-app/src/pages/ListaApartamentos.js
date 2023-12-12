import React, {useState} from "react";
import ListaApartamentosTable from "../components/LIstaApartamentosTable";
import CadastrarApartamento from "../components/CadastrarApartamento";

const ListaApartamentos = () => {

  const [showForm, setShowForm] = useState(false);


  const mostrarForm = () => {
    setShowForm(!showForm);
  }

  return (
    <>
     <button onClick={mostrarForm}>Cadastrar apartamento</button>
      {showForm && (<CadastrarApartamento />)}
      <ListaApartamentosTable />
    </>
  )
};

export default ListaApartamentos;
