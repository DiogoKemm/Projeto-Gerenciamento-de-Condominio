import React from "react";

function CadastrarApartamento() {

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

			fetch('http://localhost:8080/CadastrarApartamento/', {
				headers: {
					Authorization: `bearer ${token}`,
				},
				method: form.method,
				body: formData
			});
		}

	};

    return (
        <form id="apartamentoForm" method="post" onSubmit={handleClick}>
			<div class="mb-3">
				<label for="nAP" class="form-label">Número do apartamento</label>
				<input type="number" name="nAP" class="form-control" id="nAP" aria-describedby="emailHelp" min={100} max={904} />
			</div>
			<div class="mb-3">
				<label for="nBloco" class="form-label">Número do bloco</label>
				<input type="number" name="nBloco" class="form-control" id="nBloco" min={1} max={6}/>
			</div>

			<button type="submit" class="btn btn-primary">Cadastrar</button>
		</form>
    )
}

export default CadastrarApartamento;