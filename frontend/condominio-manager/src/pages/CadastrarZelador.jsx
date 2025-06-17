import React from "react";
import "../App.css"

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
		<div className='container-fluid'>
			<div className="row justify-content-center">
				<div className="col-5">
					<div className="card">
						<form id="zeladorForm" method='post' onSubmit={handleClick}>
							<div className="mb-3">
								<label htmlFor="inputName" className="form-label">Nome</label>
								<input type="text" name="nome" className="form-control border border-dark" id="inputName" aria-describedby="emailHelp" />
							</div>
							<div className="mb-3">
								<label htmlFor="inputEmail" className="form-label">E-mail</label>
								<input type="email" name="email" className="form-control border border-dark" id="email" />
							</div>
							<div className="mb-3">
								<label htmlFor="inputCPF" className="form-label">CPF</label>
								<input type="text" name="cpf" className="form-control border border-dark" id="inputCPF" ></input>
							</div>
							<div className="mb-3">
								<label htmlFor="inputTelefone" className="form-label">Nº telefone</label>
								<input type="tel" name="telefone" className="form-control border border-dark" id="inputTelefone" ></input>
							</div>
							<div className="mb-3">
								<label htmlFor="senha" className="form-label">Senha</label>
								<input type="password" name="passwd" className="form-control border border-dark" id="passwd" ></input>
							</div>
							<button type="submit" className="btn btn-primary">Cadastrar</button>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CadastrarMorador;
