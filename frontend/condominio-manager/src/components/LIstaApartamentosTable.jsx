import React, { useState, useEffect, useImperativeHandle, forwardRef} from "react";
import FiltroMoradores from "./FiltroMoradores";

const ListaApartamentosTable = forwardRef((props, ref) => {
  const [apartamentos, setApartamentos] = useState([]);
  const [apartamentosFiltrados, setApartamentosFiltrados] = useState([])

  const fetchData = async () => {
    const token = sessionStorage.getItem("token");
    const data = await fetch("http://localhost:8080/moradores", {
      headers: {
        Authorization: `bearer ${token}`,
      },
    });
    const json = await data.json();
    setApartamentos(json);
    setApartamentosFiltrados(json);
  }

  useEffect(() => {
    fetchData();
  }, []);

  useImperativeHandle(ref, () => ({
    atualizarLista: fetchData,
  }));

  async function handleClick(id) {
    const token = sessionStorage.getItem("token");
    try {
      const response = await fetch(`http://localhost:8080/moradores/${id}`, {
        headers: {
          Authorization: `bearer ${token}`,
        },
        method: "DELETE",
      });

      if (response.ok) {
        await fetchData();
      }

    } catch (error) {
      console.error("Erro na requisição DELETE:", error);
    }
  }


  return (
    <>
      <FiltroMoradores mercadorias={apartamentos} onFiltrado={setApartamentosFiltrados} />
      <table className="table table-striped table-hover">
        <thead>
          <tr>
            <th scope="col">Nº</th>
            <th scope="col">Bloco</th>
            <th scope="col">Morador</th>
            <th scope="col">Telefone</th>
            <th scope="col">CPF</th>
            <th scope="col">Remover morador?</th>
          </tr>
        </thead>
        <tbody>
          {apartamentosFiltrados.map((apartamento) => (
            <tr key={`${apartamento.bloco}-${apartamento.numero}`}>
              <th scope="row">{apartamento.numero}</th>
              <td>{apartamento.bloco}</td>
              <td>{apartamento.nome}</td>
              <td>{apartamento.telefone}</td>
              <td>{apartamento.cpf}</td>
              <td>
                <button className="btn btn-danger btn-sm" onClick={() => handleClick(apartamento.cpf)}>
                  Remover
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
});

export default ListaApartamentosTable;