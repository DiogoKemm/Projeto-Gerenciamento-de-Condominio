import React from "react";

function CadastrarApartamento() {

    function handleClick(e) {
		e.preventDefault();

		const form = e.target;
		const formData = new FormData(form);

		let camposVazios = 0.

		for (const value of formData.values()) {
			if (value === '') {
				camposVazios++;
			}
		}

		if (camposVazios !== 0) {
			alert("Preencha todos os campos!");
		} else {

			const token = localStorage.getItem("token");

			fetch('http://localhost:8080/CadastrarApartamento/', {
				headers: {
					Authorization: `bearer ${token}`,
				},
				method: form.method,
				body: formData
			});
		}

	};

    return (
        <form id="apartamentoForm" method="post" onSubmit={handleClick}>
			<div className="mb-3">
				<label htmlFor="nAP" className="form-label">Número do apartamento</label>
				<input type="number" name="nAP" className="form-control border border-dark" id="nAP" aria-describedby="emailHelp" min={100} max={904} />
			</div>
			<div className="mb-3">
				<label htmlFor="nBloco" className="form-label">Número do bloco</label>
				<input type="number" name="nBloco" className="form-control border border-dark" id="nBloco" min={1} max={6}/>
			</div>

			<button type="submit" className="btn btn-primary">Cadastrar</button>
		</form>
    )
}

export default CadastrarApartamento;