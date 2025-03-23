import React, { useState } from "react";
import { Box } from "@mui/material";
import ListaApartamentosTable from "../components/LIstaApartamentosTable";
import CadastrarApartamento from "../components/CadastrarApartamento";

const ListaApartamentos = () => {

  const [showForm, setShowForm] = useState(false);


  const mostrarForm = () => {
    setShowForm(!showForm);
  }

  return (
    <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column" marginTop="50px">

      <button onClick={mostrarForm}>Cadastrar apartamento</button>
      {showForm && (<CadastrarApartamento />)}
      <ListaApartamentosTable />
    </Box>
  )
};

export default ListaApartamentos;
