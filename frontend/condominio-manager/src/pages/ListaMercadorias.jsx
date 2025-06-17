import React, { useState } from "react";
import CadastrarMercadoria from "../components/CadastrarMercadoria";
import ListaMercadoriasTable from "../components/ListaMercadoriasTable";

const ListaMercadorias = () => {
    const [showForm, setShowForm] = useState(false);

    const toggleForm = () => {
        setShowForm(!showForm);
    };

    return (
        <div className="container-fluid">
            <div className="row justify-content-center mb-3">
                <div className="col">
                    <button onClick={toggleForm} className={`btn ${showForm ? 'btn-secondary' : 'btn-success'}`}>
                        {showForm ? 'Ocultar formulário' : '+ Cadastrar mercadoria'}
                    </button>
                </div>
            </div>

            {showForm && (
                <div className="row justify-content-center mb-3">
                    <div className="col-lg-8 col-md-10">
                        <div className="card shadow-sm">
                            <div className="card-body">
                                <CadastrarMercadoria />
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <div className="row">
                <div className="col">
                    <div className="card shadow-sm">
                        <div className="card-header">
                            <h5>Mercadorias na portaria</h5>
                        </div>
                        <div className="card-body">
                            <ListaMercadoriasTable />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ListaMercadorias;