import React from "react";

const CadastrarMorador = () => {
	return (
		<form>
			<div class="mb-3">
				<label for="inputName" class="form-label">Nome</label>
				<input type="text" class="form-control" id="inputName" aria-describedby="emailHelp" />
			</div>
			<div class="mb-3">
				<label for="inputEmail" class="form-label">E-mail</label>
				<input type="email" class="form-control" id="inputEmail"/>
			</div>
			<div>
				<div class="mb-3">
					<label for="inputNApartmaento" class="form-label">Nº do apartmaneto</label>
					<input type="number" class="form-control" id="inputNApartamento" min={100} max={904}/>
				</div>
				<div class="mb-3">
					<label for="inputNBloco" class="form-label">Nº do bloco</label>
					<input type="number" class="form-control" id="inputNBloco" min={1} max={6}/>
				</div>
			</div>
			<div class="mb-3">
				<label for="inputCPF" class="form-label">CPF</label>
				<input type="text" class="form-control" id="inputCPF"></input>
			</div>
			<div class="mb-3">
				<label for="inputTelefone" class="form-label">Nº telefone</label>
				<input type="tel" class="form-control" id="inputTelefone"></input>
			</div>

			<button type="submit" class="btn btn-primary">Cadastrar</button>
		</form>
	);
};

export default CadastrarMorador;
