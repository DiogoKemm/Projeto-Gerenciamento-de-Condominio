import React from "react";

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
			<div class="mb-3">
				<label for="pedido" class="form-label">Número do pedido</label>
				<input type="number" name="pedido" class="form-control" id="pedido" aria-describedby="emailHelp" />
			</div>
			<div class="mb-3">
				<label for="cpf" class="form-label">CPF do morador</label>
				<input type="text" name="cpf" class="form-control" id="cpf" />
			</div>

			<button type="submit" class="btn btn-primary">Submit</button>
		</form>
	)
}

export default CadastrarMercadoria;