import React from "react";
import { Box } from "@mui/material";
import "../App.css"

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
		<div className='container-fluid'>
			<form id="moradorForm" method='post' onSubmit={handleClick}>
				<div className="mb-3">
					<label htmlFor="inputName" className="form-label">Nome</label>
					<input type="text" name="nome" className="form-control" id="inputName" aria-describedby="emailHelp" />
				</div>
				<div className="mb-3">
					<label htmlFor="inputEmail" className="form-label">E-mail</label>
					<input type="email" name="email" className="form-control" id="inputEmail" />
				</div>
				<div className="mb-3">
					<label htmlFor="inputCPF" className="form-label">CPF</label>
					<input type="text" name="cpf" className="form-control" id="inputCPF"></input>
				</div>
				<div className="mb-3">
					<label htmlFor="inputTelefone" className="form-label">Nº telefone</label>
					<input type="tel" name="telefone" className="form-control" id="inputTelefone"></input>
				</div>
				<div className="mb-3">
					<label htmlFor="inputApartamento" className="form-label">Apartamento pertencente</label>
					<input type="number" name="apartamento" className="form-control" id="inputApartamento" min={100} max={904}></input>
				</div>
				<div className="mb-3">
					<label htmlFor="inputBloco" className="form-label">Número do bloco</label>
					<input type="number" name="bloco" className="form-control" id="inputBloco" min={1} max={6}></input>
				</div>

				<button type="submit" className="btn btn-primary">Cadastrar</button>
			</form>
		</div>
	);
};

export default CadastrarMorador;
