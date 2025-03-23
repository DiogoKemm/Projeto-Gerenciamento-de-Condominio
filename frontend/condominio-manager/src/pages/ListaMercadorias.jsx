import React, { useState } from "react";
import { Box } from "@mui/material";
import CadastrarMercadoria from "../components/CadastrarMercadoria";
import ListaMercadoriasTable from "../components/ListaMercadoriasTable";

const ListaMercadorias = () => {

    const [showForm, setShowForm] = useState(false);


    const mostrarForm = () => {
        setShowForm(!showForm);
    }

    return (
        <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column" marginTop="50px">
            <button onClick={mostrarForm}>Cadastrar mercadoria</button>
            {showForm && (<CadastrarMercadoria />)}
            <ListaMercadoriasTable />
        </Box>
    )
};

export default ListaMercadorias;