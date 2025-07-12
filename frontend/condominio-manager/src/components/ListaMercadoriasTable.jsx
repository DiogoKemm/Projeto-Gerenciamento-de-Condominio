// components/ListaMercadoriasTable.js
import React, { useState, useEffect, forwardRef, useImperativeHandle } from "react";
import FiltroMoradores from "./FiltroMoradores";

const ListaMercadoriasTable = forwardRef((props, ref) => {
  const [mercadorias, setMercadorias] = useState([]);
  const [mercadoriasFiltradas, setMercadoriasFiltradas] = useState([]);

  const fetchData = async () => {
    const token = sessionStorage.getItem("token");
    const res = await fetch("http://localhost:8080/mercadorias", {
      headers: {
        Authorization: `bearer ${token}`,
      },
    });
    const json = await res.json();
    setMercadorias(json);
    setMercadoriasFiltradas(json);
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Expor o fetchData para o componente pai
  useImperativeHandle(ref, () => ({
    atualizarLista: fetchData,
  }));

  async function handleClick(id) {
    const token = sessionStorage.getItem("token");
    await fetch(`http://localhost:8080/mercadorias/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `bearer ${token}`,
      },
    });
    fetchData(); // Atualiza lista após deletar
  }

  return (
    <>
      <FiltroMoradores mercadorias={mercadorias} onFiltrado={setMercadoriasFiltradas} />
      <table className="table table-striped table-hover">
        <thead>
          <tr>
            <th>Nº do pedido</th>
            <th>Nº do apartamento</th>
            <th>Bloco</th>
            <th>Morador</th>
            <th>Telefone</th>
            <th>Deletar?</th>
          </tr>
        </thead>
        <tbody>
          {mercadoriasFiltradas.map((m) => (
            <tr key={m.ID}>
              <td>{m.ID}</td>
              <td>{m.apartamento_numero}</td>
              <td>{m.bloco}</td>
              <td>{m.nome}</td>
              <td>{m.telefone}</td>
              <td>
                <button className="btn btn-danger btn-sm" onClick={() => handleClick(m.ID)}>
                  Deletar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
});

export default ListaMercadoriasTable;
