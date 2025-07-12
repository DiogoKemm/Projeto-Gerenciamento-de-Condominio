import React, { useState, useRef } from "react";
import ListaApartamentosTable from "../components/LIstaApartamentosTable";
import CadastrarApartamento from "../components/CadastrarApartamento";
import "../App.css"

const ListaApartamentos = () => {

  const [showForm, setShowForm] = useState(false);
  const tabelaRef = useRef();

  const handleAdicionado = () => {
    if (tabelaRef.current) {
      tabelaRef.current.atualizarLista(); // chama o fetchData da tabela
    }
  };

  const toggleForm = () => {
    setShowForm(!showForm);
  }

  return (
    <div className="container-fluid">
      <div className="row justify-content-center mb-3">
        <div className="col">
          <button onClick={toggleForm} className={`btn ${showForm ? 'btn-secondary' : 'btn-success'}`}>
            {showForm ? 'Ocultar formulário' : '+ Cadastrar apartamento'}
          </button>
        </div>
      </div>
      {showForm && (<div className="row justify-content-center mb-3">
        <div className="col-lg-9">
          <div className="card shadow-sm">
            <div className="card-body">
              <CadastrarApartamento onCadastrado={handleAdicionado} />
            </div>
          </div>
        </div>
      </div>)}
      <div className="row">
        <div className="col">
          <div className="card shadow-sm">
            <div className="card-header">
              <h5>Lista de apartamentos</h5>
            </div>
            <div className="card-body">
              <ListaApartamentosTable ref={tabelaRef} />
            </div>
          </div>
        </div>

      </div>
    </div>
  )
};

export default ListaApartamentos;
