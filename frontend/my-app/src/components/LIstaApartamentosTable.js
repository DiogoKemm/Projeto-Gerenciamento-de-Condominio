import React, {useState, useEffect} from "react";

function ListaApartamentosTable() {
  const [apartamentos, setApartamentos] = useState([]);

  useEffect(() => {

    const fetchData = async () => {

      const data = await fetch("http://localhost:8080/moradores");
      const json = await data.json();
      setApartamentos(json);

    }

    fetchData().catch(console.error);
  }, []);

  const tabelaApartamentos =
    
      <table class="table">
      <thead>
        <tr>
          <th scope="col">Nº</th>
          <th scope="col">Bloco</th>
          <th scope="col">Morador</th>
          <th scope="col">Telefone</th>
          <th scope="col">CPF</th>
        </tr>
      </thead>
      {apartamentos.map(apartamento => (
      <tbody>
        <tr key={apartamento.CPF}>
          <th scope="row">{apartamento.apartamento}</th>
          <td>{apartamento.bloco}</td>
          <td>{apartamento.nome}</td>
          <td>{apartamento.telefone}</td>
          <td>{apartamento.CPF}</td>
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

export default ListaApartamentosTable;