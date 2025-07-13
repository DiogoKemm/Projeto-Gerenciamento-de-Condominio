import React, { useState } from "react";
import "../App.css"

function CadastrarMercadoria({onAdicionado}) {
	const [error, setError] = useState(null);
	const [success, setSuccess] = useState(null);

	async function handleClick(e) {
		e.preventDefault();
		setError(null);
		setSuccess(null); 

		const form = e.target;
		const formData = new FormData(form);

		if (!formData.get("pedido") || !formData.get("cpf")) {
			setError("Preencha todos os campos!");
			return;
		}

		try {
			const token = sessionStorage.getItem("token"); 

			const response = await fetch('http://localhost:8080/CadastrarMercadoria/', {
				headers: {
					Authorization: `bearer ${token}`,
				},
				method: form.method,
				body: formData
			});

			if (!response.ok) {
				const errorData = await response.json();
				throw new Error(errorData.error || "Erro ao cadastrar mercadoria");
			}

			setSuccess("Mercadoria cadastrada com sucesso!");
			form.reset();
			onAdicionado?.();

		} catch (err) {
			if (err.message == "insert or update on table \"mercadoria\" violates foreign key constraint \"mercadoria_cpf_morador_fkey\"") {
				setError("CPF não encontrado")
			} else if (err.message == "duplicate key value violates unique constraint \"mercadoria_pkey\"") {
				setError("Nº do pedido já cadastrado")
			}
		}
	};

	return (
		<form id="mercadoriaForm" method="post" onSubmit={handleClick}>
			<div className="row">
				<div className="col">
					<input type="number" min={1} name="pedido" className="form-control border border-dark" id="pedido" placeholder="Número do pedido" />
				</div>
				<div className="col">
					<input type="text" name="cpf" className="form-control border border-dark" id="cpf" placeholder="CPF" />
				</div>
			</div>

			{success && (
				<div className="alert alert-success" role="alert">
					{success}
				</div>
			)}

			{error && (
				<div className="alert alert-danger" role="alert">
					{error}
				</div>
			)}

			<button type="submit" className="btn btn-primary mt-3">Cadastrar</button>
		</form>
	)
}

export default CadastrarMercadoria;