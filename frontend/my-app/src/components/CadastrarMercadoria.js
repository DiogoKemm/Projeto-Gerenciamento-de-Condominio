import React, {useState} from "react";

function CadastrarMercadoria() {

    const [message, setMessage] = useState('');

	function handleChange(e) {
		setMessage(e.target.value);
	};

	function handleClick(e) {
		e.preventDefault();

		if (message.trim().length > 2) {

			const form = e.target;
			const formData = new FormData(form);

			fetch('http://localhost:8080/CadastrarMercadoria/', {
				method: form.method,
				body: formData
			});

			console.log(formData);

		} else {
			alert("Preencha todos os campos!");
		}
	};

    return (
        <form id="mercadoriaForm" method="post" onSubmit={handleClick}>
            <div class="mb-3">
                <label for="pedido" class="form-label">Número do pedido</label>
                <input type="number" name="pedido" class="form-control" id="pedido" aria-describedby="emailHelp" onChange={handleChange}/>
            </div>
            <div class="mb-3">
                <label for="cpf" class="form-label">CPF do morador</label>
                <input type="text"  name="cpf" class="form-control" id="cpf" onChange={handleChange}/>
            </div>
            
            <button type="submit" class="btn btn-primary">Submit</button>
        </form>
    )
}

export default CadastrarMercadoria;