import React from "react";
import "../App.css"

const CadastrarZelador = () => {

	async function handleClick(e) {
		e.preventDefault();

		const form = e.target;
		const formData = new FormData(form);

		let camposVazios = 0;

		for (const value of formData.values()) {
			if (value === '') {
				camposVazios++;
			}
		}

		if (camposVazios !== 0) {
			alert("Preencha todos os campos!");
		} else {
			try {
				const token = localStorage.getItem("token");

				await fetch('http://localhost:8080/novoUsuario/', {
					headers: {
						Authorization: `Bearer ${token}`,
					},
					method: form.method,
					body: formData
				});

			} catch (error) {
				console.log(error)
			}
		}
	};

	return (
		<div className='container-fluid'>
			<div className="row justify-content-center">
				<div className="col-lg-5 col-md-8">
					<div className="card">
						<form id="zeladorForm" method='post' onSubmit={handleClick}>
							<div className="mb-3">
								<input type="text" name="nome" placeholder="Nome" className="form-control border border-dark" id="inputName" aria-describedby="emailHelp" />
							</div>
							<div className="mb-3">
								<input type="email" name="email" placeholder="Email" className="form-control border border-dark" id="email" />
							</div>
							<div className="mb-3">
								<input type="text" name="cpf" placeholder="CPF" className="form-control border border-dark" id="inputCPF" ></input>
							</div>
							<div className="mb-3">
								<input type="tel" name="telefone" placeholder="Número de telefone" className="form-control border border-dark" id="inputTelefone" ></input>
							</div>
							<div className="mb-3">
								<input type="password" name="passwd" placeholder="Senha de acesso" className="form-control border border-dark" id="passwd" ></input>
							</div>
							<button type="submit" className="btn btn-primary">Cadastrar</button>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CadastrarZelador;
