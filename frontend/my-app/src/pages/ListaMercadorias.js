import React, { useState } from "react";
import CadastrarMercadoria from "../components/CadastrarMercadoria";
import ListaMercadoriasTable from "../components/ListaMercadoriasTable";

const ListaMercadorias = () => {

    const [showForm, setShowForm] = useState(false);


    const mostrarForm = () => {
        setShowForm(!showForm);
    }

    return (
        <>
        <button onClick={mostrarForm}>Cadastrar mercadoria</button>
        {showForm && (<CadastrarMercadoria/>)}
        <ListaMercadoriasTable/>
        </>
    )
};

export default ListaMercadorias;