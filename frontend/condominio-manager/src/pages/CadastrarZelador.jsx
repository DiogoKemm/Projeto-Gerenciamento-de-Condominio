import React, { useState } from "react";
import "../App.css";

const CadastrarZelador = () => {
	const [mensagem, setMensagem] = useState("");
	const [mensagemTipo, setMensagemTipo] = useState(""); // "success" ou "error"

	async function handleClick(e) {
		e.preventDefault();

		const form = e.target;
		const formData = new FormData(form);

		let camposVazios = 0;

		for (const value of formData.values()) {
			if (value === "") {
				camposVazios++;
			}
		}

		if (camposVazios !== 0) {
			setMensagem("Preencha todos os campos!");
			setMensagemTipo("error");
			return;
		}

		try {
			const token = sessionStorage.getItem("token");

			const response = await fetch("http://localhost:8080/novoUsuario/", {
				headers: {
					Authorization: `Bearer ${token}`,
				},
				method: form.method,
				body: formData,
			});

			if (!response.ok) {
				throw new Error("Erro ao cadastrar");
			}

			setMensagem("Zelador cadastrado com sucesso!");
			setMensagemTipo("success");
			form.reset(); 

		} catch (error) {
			setMensagem("Erro ao cadastrar zelador. Verifique os dados e tente novamente.");
			setMensagemTipo("error");
			console.error(error);
		}
	}

	return (
		<div className="container-fluid">
			<div className="row justify-content-center">
				<div className="col-lg-5 col-md-8">
					<div className="card">
						<form id="zeladorForm" method="post" onSubmit={handleClick}>
							<div className="mb-3">
								<input type="text" name="nome" placeholder="Nome" className="form-control border border-dark" />
							</div>
							<div className="mb-3">
								<input type="email" name="email" placeholder="Email" className="form-control border border-dark" />
							</div>
							<div className="mb-3">
								<input type="text" name="cpf" placeholder="CPF" className="form-control border border-dark" />
							</div>
							<div className="mb-3">
								<input type="tel" name="telefone" placeholder="Número de telefone" className="form-control border border-dark" />
							</div>
							<div className="mb-3">
								<input type="password" name="passwd" placeholder="Senha de acesso" className="form-control border border-dark" />
							</div>

							{mensagem && (
								<div className={`alert ${mensagemTipo === "success" ? "alert-success" : "alert-danger"}`} role="alert">
									{mensagem}
								</div>
							)}

							<button type="submit" className="btn btn-primary">Cadastrar</button>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CadastrarZelador;
