import React, { useState } from "react";
import "../App.css"

function CadastrarMercadoria() {
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

	async function handleClick(e) {
		e.preventDefault();
        setError(null); // Limpa erros anteriores
        setSuccess(null); // Limpa mensagens de sucesso anteriores

		const form = e.target;
		const formData = new FormData(form);

		let i = 0;
		for (const value of formData.values()) {
			if (value === '') {
				i++;
			}
		}

		if (i !== 0) {
			setError("Preencha todos os campos!");
            return;
		}

        try {
            const token = localStorage.getItem("token"); // Corrigido para sessionStorage

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
			<div className="mb-3">
				<label htmlFor="pedido" className="form-label">Número do pedido</label>
				<input type="number" name="pedido" className="form-control border border-dark" id="pedido" aria-describedby="emailHelp" />
			</div>
			<div className="mb-3">
				<label htmlFor="cpf" className="form-label">CPF do morador</label>
				<input type="text" name="cpf" className="form-control border border-dark" id="cpf" />
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

			<button type="submit" className="btn btn-primary">Cadastrar</button>
		</form>
	)
}

export default CadastrarMercadoria;