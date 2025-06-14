import React from "react";
import "../App.css"

function CadastrarMercadoria() {

	function handleClick(e) {
		e.preventDefault();


		const form = e.target;
		const formData = new FormData(form);

		let i = 0;

		for (const value of formData.values()) {
			if (value === '') {
				i++;
			}
		}

		if (i !== 0) {
			alert("Preencha todos os campos!");
		} else {

			const token = localStorage.getItem("token");

			fetch('http://localhost:8080/CadastrarMercadoria/', {
				headers: {
					Authorization: `bearer ${token}`,
				},
				method: form.method,
				body: formData
			});
		}

	};

	return (
		<form id="mercadoriaForm" method="post" onSubmit={handleClick}>
			<div className="mb-3">
				<label htmlFor="pedido" className="form-label">Número do pedido</label>
				<input type="number" name="pedido" className="form-control" id="pedido" aria-describedby="emailHelp" />
			</div>
			<div className="mb-3">
				<label htmlFor="cpf" className="form-label">CPF do morador</label>
				<input type="text" name="cpf" className="form-control" id="cpf" />
			</div>

			<button type="submit" className="btn btn-primary">Submit</button>
		</form>
	)
}

export default CadastrarMercadoria;