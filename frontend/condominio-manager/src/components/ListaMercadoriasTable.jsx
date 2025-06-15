import React, { useState, useEffect } from "react";

function ListaMercadoriasTable() {
  const [mercadorias, setMercadorias] = useState([]);

  useEffect(() => {

    const fetchData = async () => {

      const token = localStorage.getItem("token");

      const data = await fetch("http://localhost:8080/mercadorias", {
        headers: {
					Authorization: `bearer ${token}`,
				},
      });
      const json = await data.json();
      setMercadorias(json);

    }

    fetchData().catch(console.error);
  }, [mercadorias]);

  const handleClick = id => {
    const token = localStorage.getItem("token");
    fetch(`http://localhost:8080/mercadorias/${id}`, {
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
          <th scope="col">Nº do pedido</th>
          <th scope="col">Nº do apartamento</th>
          <th scope="col">Bloco</th>
          <th scope="col">Morador</th>
          <th scope="col">Telefone</th>
          <th scope="col">Deletar?</th>
        </tr>
      </thead>
      <tbody>
          {mercadorias.map((mercadoria) => (
          <tr key={mercadoria.ID}>
            <th scope="row">{mercadoria.ID}</th>
            <td>{mercadoria.apartamento_numero}</td>
            <td>{mercadoria.bloco}</td>
            <td>{mercadoria.nome}</td>
            <td>{mercadoria.telefone}</td>
            <td><button className="btn btn-danger btn-sm" onClick={() => handleClick(mercadoria.ID)}>Deletar</button></td>
          </tr>
          ))}
        </tbody>
    </table>
  )

}

export default ListaMercadoriasTable;