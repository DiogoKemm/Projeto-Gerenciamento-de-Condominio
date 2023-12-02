import React, {useState} from "react";

const CadastrarMorador = () => {
	const [message, setMessage] = useState('');

	function handleChange(e) {
		setMessage(e.target.value);
	};

	function handleClick(e) {
		e.preventDefault();

		if (message.trim().length > 5) {

			const form = e.target;
			const formData = new FormData(form);

			const token = localStorage.getItem("token");

			fetch('http://localhost:8080/novoUsuario/', {
				headers: {
					Authorization: `bearer ${token}`,
				},
				method: form.method,
				body: formData
			});

			console.log(formData);

		} else {
			alert("Preencha todos os campos!");
		}
	};

	return (
		<form id="moradorForm" method='post' onSubmit={handleClick}>
			<div class="mb-3">
				<label for="inputName" class="form-label">Nome</label>
				<input type="text" name="nome" class="form-control" id="inputName" aria-describedby="emailHelp" onChange={handleChange} />
			</div>
			<div class="mb-3">
				<label for="inputEmail" class="form-label">E-mail</label>
				<input type="email" name="email" class="form-control" id="email" onChange={handleChange} />
			</div>
			<div class="mb-3">
				<label for="inputCPF" class="form-label">CPF</label>
				<input type="text" name="cpf" class="form-control" id="inputCPF" onChange={handleChange}></input>
			</div>
			<div class="mb-3">
				<label for="inputTelefone" class="form-label">Nº telefone</label>
				<input type="tel" name="telefone" class="form-control" id="inputTelefone" onChange={handleChange}></input>
			</div>
            <div class="mb-3">
                <label for="senha" class="form-label">Senha</label>
                <input type="password" name="passwd" class="form-control" id="passwd" onChange={handleChange}></input>
            </div>

			<button type="submit" class="btn btn-primary">Cadastrar</button>
		</form>
	);
};

export default CadastrarMorador;
