import React from "react";

const CadastrarMorador = () => {

	function handleClick(e) {
		e.preventDefault();

		const form = e.target;
		const formData = new FormData(form);

		let i = 0.

		for (const value of formData.values()) {
			if (value === '') {
				i++;
			}
		}

		if (i !== 0) {
			alert("Preencha todos os campos!");
		} else {

			const token = localStorage.getItem("token");

			fetch('http://localhost:8080/CadastrarMorador/', {
				headers: {
					Authorization: `bearer ${token}`,
				},
				method: form.method,
				body: formData
			});
		}

	};

	return (
		<form id="moradorForm" method='post' onSubmit={handleClick}>
			<div class="mb-3">
				<label for="inputName" class="form-label">Nome</label>
				<input type="text" name="nome" class="form-control" id="inputName" aria-describedby="emailHelp" />
			</div>
			<div class="mb-3">
				<label for="inputEmail" class="form-label">E-mail</label>
				<input type="email" name="email" class="form-control" id="inputEmail" />
			</div>
			<div class="mb-3">
				<label for="inputCPF" class="form-label">CPF</label>
				<input type="text" name="cpf" class="form-control" id="inputCPF"></input>
			</div>
			<div class="mb-3">
				<label for="inputTelefone" class="form-label">Nº telefone</label>
				<input type="tel" name="telefone" class="form-control" id="inputTelefone"></input>
			</div>
			<div class="mb-3">
				<label for="inputApartamento" class="form-label">Apartamento pertencente</label>
				<input type="number" name="apartamento" class="form-control" id="inputApartamento" min={100} max={904}></input>
			</div>

			<button type="submit" class="btn btn-primary">Cadastrar</button>
		</form>
	);
};

export default CadastrarMorador;
