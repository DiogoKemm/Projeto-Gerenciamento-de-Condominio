import React, { useState } from "react";
import "../App.css";

const CadastrarMorador = ({ onCadastrado }) => {
	const [error, setError] = useState(null);
	const [success, setSuccess] = useState(null);

	async function handleClick(e) {
		e.preventDefault();
		setError(null);
		setSuccess(null);

		const form = e.target;
		const formData = new FormData(form);

		if (!formData.get("inputName") || !formData.get("inputCPF") || !formData.get("inputApartamento") || !formData.get("inputBloco")) {
			setError("Preencha todos os campos!");
			return;
		}

		try {
			const token = sessionStorage.getItem("token");

			const response = await fetch('http://localhost:8080/CadastrarMorador/', {
				headers: {
					Authorization: `bearer ${token}`,
				},
				method: form.method,
				body: formData
			});

			if (!response.ok) {
				const errorData = await response.json();
				throw errorData;
			}

			setSuccess("Morador cadastrado com sucesso!");
			form.reset();

		} catch (err) {
			if (err == "value too long for type character varying(11)") {
				setError("Digite o CPF corretamente")
			}

		}
	};

	return (
		<div className='container-fluid'>
			<div className="row justify-content-center">
				<div className="col-lg-9 col-md-8">
					<div className="card">
						<form id="moradorForm" method='post' onSubmit={handleClick}>
							<div className="row">
								<div className="col mb-3">
									<label htmlFor="inputName" className="form-label">Nome</label>
									<input type="text" name="nome" className="form-control" id="inputName" aria-describedby="emailHelp" />
								</div>
								<div className="col mb-3">
									<label htmlFor="inputCPF" className="form-label">CPF (Só números)</label>
									<input type="text" name="cpf" className="form-control" id="inputCPF"></input>
								</div>
							</div>
							<div className="mb-3">
								<label htmlFor="inputEmail" className="form-label">E-mail</label>
								<input type="email" name="email" className="form-control" id="inputEmail" />
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

							{error && (
								<div className="alert alert-danger" role="alert">
									{error}
								</div>
							)}

							{success && (
								<div className="alert alert-success" role="success">
									{success}
								</div>
							)}

							<button type="submit" className="btn btn-primary">Cadastrar</button>
						</form>
					</div>
				</div>
			</div>
		</div >
	);
};

export default CadastrarMorador;