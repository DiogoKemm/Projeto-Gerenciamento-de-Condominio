import React, { useState } from "react";

function FiltroMoradores({ mercadorias, onFiltrado }) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e) => {
    const termo = e.target.value;
    setSearchTerm(termo);

    const filtrado = mercadorias.filter((item) => {
      if (item.nome != null) {
        const nomeMatch = item.nome.toLowerCase().includes(termo.toLowerCase());
        return nomeMatch;
      }
    });

    onFiltrado(filtrado);
  };

  return (
    <input
      type="text"
      placeholder="Buscar por nome do morador"
      className="form-control mb-3"
      value={searchTerm}
      onChange={handleSearch}
    />
  );
}

export default FiltroMoradores;
