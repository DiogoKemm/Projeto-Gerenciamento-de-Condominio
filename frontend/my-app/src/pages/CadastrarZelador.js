import React from "react";
import { Box } from "@mui/material";

const CadastrarMorador = () => {

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

			fetch('http://localhost:8080/novoUsuario/', {
				headers: {
					Authorization: `bearer ${token}`,
				},
				method: form.method,
				body: formData
			});
		}



	};

	return (
		<Box display="flex" justifyContent="center" alignItems="center" flexDirection="column" marginTop="50px">
			<form id="zeladorForm" method='post' onSubmit={handleClick}>
				<div class="mb-3">
					<label for="inputName" class="form-label">Nome</label>
					<input type="text" name="nome" class="form-control" id="inputName" aria-describedby="emailHelp" />
				</div>
				<div class="mb-3">
					<label for="inputEmail" class="form-label">E-mail</label>
					<input type="email" name="email" class="form-control" id="email" />
				</div>
				<div class="mb-3">
					<label for="inputCPF" class="form-label">CPF</label>
					<input type="text" name="cpf" class="form-control" id="inputCPF" ></input>
				</div>
				<div class="mb-3">
					<label for="inputTelefone" class="form-label">Nº telefone</label>
					<input type="tel" name="telefone" class="form-control" id="inputTelefone" ></input>
				</div>
				<div class="mb-3">
					<label for="senha" class="form-label">Senha</label>
					<input type="password" name="passwd" class="form-control" id="passwd" ></input>
				</div>

				<button type="submit" class="btn btn-primary">Cadastrar</button>
			</form>
		</Box>
	);
};

export default CadastrarMorador;
