import React from "react";

function ListaApartamentosTable() {
    return (
        <table class="table">
  <thead>
    <tr>
      <th scope="col">Nº</th>
      <th scope="col">Bloco</th>
      <th scope="col">Morador</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">1</th>
      <td>1</td>
      <td>Fulano</td>
    </tr>
    <tr>
      <th scope="row">2</th>
      <td>1</td>
      <td>Ciclano</td>
    </tr>
    <tr>
      <th scope="row">3</th>
      <td>1</td>
      <td>Gugu</td>
    </tr>
  </tbody>
</table>
    )
}

export default ListaApartamentosTable;