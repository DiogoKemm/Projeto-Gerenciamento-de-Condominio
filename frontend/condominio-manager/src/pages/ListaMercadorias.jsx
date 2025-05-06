import React, { useState } from "react";
import CadastrarMercadoria from "../components/CadastrarMercadoria";
import ListaMercadoriasTable from "../components/ListaMercadoriasTable";

const ListaMercadorias = () => {

    const [showForm, setShowForm] = useState(false);


    const mostrarForm = () => {
        setShowForm(!showForm);
    }

    return (
        <div className="container-fluid">
            <button onClick={mostrarForm}>Cadastrar mercadoria</button>
            {showForm && (<CadastrarMercadoria />)}
            <ListaMercadoriasTable />
        </div>
    )
};

export default ListaMercadorias;