import React, { useState, useEffect } from "react";

function ListaApartamentosTable() {
  const [apartamentos, setApartamentos] = useState([]);

  useEffect(() => {

    const fetchData = async () => {

      const token = localStorage.getItem("token");

      const data = await fetch("http://localhost:8080/moradores", {
        headers: {
          Authorization: `bearer ${token}`,
        },
      });
      const json = await data.json();
      setApartamentos(json);

    }

    fetchData().catch(console.error);
  }, [apartamentos]);

  console

  function handleClick(id) {
    const token = localStorage.getItem("token");
    fetch(`http://localhost:8080/moradores/${id}`, {
      headers: {
        Authorization: `bearer ${token}`,
      },
      method: "DELETE"
    })
      .then(response => response.json(id));
  }

  return (
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
          {apartamentos.map((apartamento) => (
            <tr key={apartamento.cpf}>
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
  );
}

export default ListaApartamentosTable;