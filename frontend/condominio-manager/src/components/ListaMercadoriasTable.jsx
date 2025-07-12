import React, { useState, useEffect } from "react";
import FiltroMoradores from "./FiltroMoradores";

function ListaMercadoriasTable() {
  const [mercadorias, setMercadorias] = useState([]);
  const [mercadoriasFiltradas, setMercadoriasFiltradas] = useState([]);

  useEffect(() => {

    const fetchData = async () => {
      const token = sessionStorage.getItem("token");
      const data = await fetch("http://localhost:8080/mercadorias", {
        headers: {
          Authorization: `bearer ${token}`,
        },
      });
      const json = await data.json();
      setMercadorias(json);
      setMercadoriasFiltradas(json);
    }

    fetchData().catch(console.error);
  }, [mercadorias]);

  async function handleClick(id) {
    const token = sessionStorage.getItem("token");
    await fetch(`http://localhost:8080/mercadorias/${id}`, {
      headers: {
        Authorization: `bearer ${token}`,
      },
      method: "DELETE"
    })
  }

  return (
    <>
      <FiltroMoradores mercadorias={mercadorias} onFiltrado={setMercadoriasFiltradas} />
      <table className="table table-striped table-hover">
        <thead>
          <tr>
            <th scope="col">Nº do pedido</th>
            <th scope="col">Nº do apartamento</th>
            <th scope="col">Bloco</th>
            <th scope="col">Morador</th>
            <th scope="col">Telefone</th>
            <th scope="col">Deletar?</th>
          </tr>
        </thead>
        <tbody>
          {mercadoriasFiltradas.map((mercadoria) => (
            <tr key={mercadoria.ID}>
              <th scope="row">{mercadoria.ID}</th>
              <td>{mercadoria.apartamento_numero}</td>
              <td>{mercadoria.bloco}</td>
              <td>{mercadoria.nome}</td>
              <td>{mercadoria.telefone}</td>
              <td>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleClick(mercadoria.ID)}>
                  Deletar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )

}

export default ListaMercadoriasTable;