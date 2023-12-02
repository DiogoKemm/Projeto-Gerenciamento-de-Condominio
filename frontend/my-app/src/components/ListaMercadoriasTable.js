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

  const tabelaApartamentos =

    <table className="table">
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
      {mercadorias.map(mercadoria => (
        <tbody>
          <tr key={mercadoria.pedido}>
            <th scope="row">{mercadoria.pedido}</th>
            <th>{mercadoria.apartamento}</th>
            <td>{mercadoria.bloco}</td>
            <td>{mercadoria.nome}</td>
            <td>{mercadoria.telefone}</td>
            <td><button onClick={() => handleClick(mercadoria.pedido)}>Deletar</button></td>
          </tr>
        </tbody>
      ))}
    </table>

  return (
    <>
      {tabelaApartamentos}
    </>
  )

}

export default ListaMercadoriasTable;