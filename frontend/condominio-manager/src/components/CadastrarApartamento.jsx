import React, { useState, useEffect } from "react";
import "../App.css";

function CadastrarApartamento({onCadastrado}) {
	const [error, setError] = useState(null);
	const [success, setSuccess] = useState(null);

	async function handleSubmit(e) {
		e.preventDefault();
		setError(null)
		setSuccess(null)

		const form = e.target;
		const formData = new FormData(form);

		if (!formData.get("nAP") || !formData.get("nBloco")) {
			setError("Preencha todos os campos!");
			return;
		}

		try {
			const token = sessionStorage.getItem("token");
			const response = await fetch('http://localhost:8080/CadastrarApartamento/', {
				method: form.method,
				headers: {
					Authorization: `bearer ${token}`,
				},
				body: formData,
			});

			if (!response.ok) {
				const data = await response.text();
				throw new Error(data || "Erro ao cadastrar apartamento");
			}

			setSuccess("Apartamento cadastrado com sucesso!");
			form.reset();
			if (onCadastrado) {
				onCadastrado()
			}
		} catch (err) {
			setError(err.message);
		}
	}

	return (
		<form id="apartamentoForm" method="post" onSubmit={handleSubmit}>
			<div className="row">
				<div className="col">
					<input
						type="number"
						name="nAP"
						className="form-control border border-dark"
						placeholder="Número do apartamento"
						min={100}
						max={904}
					/>
				</div>
				<div className="col">
					<input
						type="number"
						name="nBloco"
						className="form-control border border-dark"
						placeholder="Número do bloco"
						min={1}
						max={6}
					/>
				</div>
			</div>

			{success && (
				<div className="alert alert-success mt-3" role="alert">
					{success}
				</div>
			)}

			{error && (
				<div className="alert alert-danger mt-3" role="alert">
					{error}
				</div>
			)}

			<button type="submit" className="btn btn-primary mt-3">
				Cadastrar
			</button>
		</form>
	);
}

export default CadastrarApartamento;