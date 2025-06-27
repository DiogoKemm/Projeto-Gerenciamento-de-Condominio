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

			const token = sessionStorage.getItem("token");
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
			<div className="row">
				<div className="col">
					<input type="number" name="nAP" className="form-control border border-dark" id="nAP" placeholder="Número do apartamento" aria-label="Número do apartamento" min={100} max={904} />
				</div>
				<div className="col">
					<input type="number" name="nBloco" className="form-control border border-dark" id="nBloco" placeholder="Número do bloco" aria-label="Número do bloco" min={1} max={6} />
				</div>
			</div>
			<button type="submit" className="btn btn-primary mt-3">Cadastrar</button>
		</form>
	)
}

export default CadastrarApartamento;