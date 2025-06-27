import React, { useState, useEffect } from "react";

function ListaMercadoriasTable() {
  const [mercadorias, setMercadorias] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

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
    }

    fetchData().catch(console.error);
  }, []);

  const handleClick = id => {
    const token = sessionStorage.getItem("token");
    fetch(`http://localhost:8080/mercadorias/${id}`, {
      headers: {
        Authorization: `bearer ${token}`,
      },
      method: "DELETE"
    })
      .then(response => response.json(id));

  }

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  // Filtro por nome
  const filteredMercadorias = mercadorias.filter((mercadoria) => {
    const termo = searchTerm.toLowerCase();
    const nomeMatch = mercadoria.nome.toLowerCase().includes(termo);
    return nomeMatch;
  });

  return (
    <>
     <input
        type="text"
        placeholder="Buscar por nome do morador"
        className="form-control mb-3"
        value={searchTerm}
        onChange={handleSearch}
      />
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
          {filteredMercadorias.map((mercadoria) => (
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