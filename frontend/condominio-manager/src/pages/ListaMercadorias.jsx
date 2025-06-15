import React, { useState } from "react";
import CadastrarMercadoria from "../components/CadastrarMercadoria";
import ListaMercadoriasTable from "../components/ListaMercadoriasTable";

const ListaMercadorias = () => {
    const [showForm, setShowForm] = useState(false);

    // Renomeado para toggleForm para maior clareza
    const toggleForm = () => {
        setShowForm(!showForm);
    };

    return (
        <div className="container-fluid">
            {/* Botão de cadastro com melhor estilo */}
            <div className="row mb-3">
                <div className="col">
                    <button onClick={toggleForm} className={`btn ${showForm ? 'btn-secondary' : 'btn-success'}`}>
                        {showForm ? 'Ocultar Formulário' : '+ Cadastrar Mercadoria'}
                    </button>
                </div>
            </div>

            {/* O formulário agora aparece dentro de um card, o que melhora a organização */}
            {showForm && (
                <div className="row mb-4">
                    <div className="col-lg-8 col-md-10">
                        <div className="card shadow-sm">
                            <div className="card-header">
                                <h5>Formulário de Cadastro de Mercadoria</h5>
                            </div>
                            <div className="card-body">
                                <CadastrarMercadoria />
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* A tabela também fica dentro de um card */}
            <div className="row">
                <div className="col">
                    <div className="card shadow-sm">
                        <div className="card-header">
                            <h5>Mercadorias na Portaria</h5>
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