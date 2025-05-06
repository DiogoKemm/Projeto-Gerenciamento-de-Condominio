import React from "react";
import axios from "axios";
import '../App.css'


function Login(props) {

	const [username, setUsername] = React.useState("");
	const [passwd, setPasswd] = React.useState("");
	const [role, setRole] = React.useState("");

	const [openMessage, setOpenMessage] = React.useState(false);
	const [messageText, setMessageText] = React.useState("");
	const [messageSeverity, setMessageSeverity] = React.useState("success");

	async function enviaLogin(event) {
		event.preventDefault();
		try {
			const response = await axios.post("/login", {
				username: username,
				password: passwd
			});

			if (response.status >= 200 && response.status < 300) {
				localStorage.setItem("token", response.data.token);
				localStorage.setItem("role", response.data.role);
				props.onLogin(response.data.role);
			} else {
				// falha
				console.error("Falha na autenticação");
			}
		} catch (error) {
			console.log(error);
			setOpenMessage(true);
			setMessageText("Falha ao logar usuário!");
			setMessageSeverity("error");
		}
	}

	function cancelaLogin() {
		if (username !== "" || passwd !== "") {
			setUsername("");
			setPasswd("");
		}
		setOpenMessage(true);
		setMessageText("Login cancelado!");
		setMessageSeverity("warning");
	}

	function handleCloseMessage(_, reason) {
		if (reason === "clickaway") {
			return;
		}
		setOpenMessage(false);
	}

	return (
		<div className="d-flex justify-content-center align-items-center vh-100">
			<div style={{ minWidth: '300px' }}>
				<div className="mb-3">
					<label htmlFor="username-input" className="form-label">User:</label>
					<input
						type="text"
						className="form-control form-control-sm"
						id="username-input"
						required
						value={username}
						onChange={(e) => setUsername(e.target.value)}
					/>
				</div>

				<div className="mb-3">
					<label htmlFor="passwd-input" className="form-label">Password:</label>
					<input
						type="password"
						className="form-control form-control-sm"
						id="passwd-input"
						required
						value={passwd}
						onChange={(e) => setPasswd(e.target.value)}
					/>
				</div>

				<div className="d-flex gap-3 mb-3">
					<button
						className="btn btn-primary"
						style={{ maxWidth: '100px', minWidth: '100px' }}
						onClick={enviaLogin}
					>
						Enviar
					</button>
					<button
						className="btn btn-outline-danger"
						style={{ maxWidth: '100px', minWidth: '100px' }}
						onClick={cancelaLogin}
					>
						Cancelar
					</button>
				</div>

				{/* Alerta Bootstrap (substituindo Snackbar do MUI) */}
				{openMessage && (
					<div className={`alert alert-${messageSeverity} alert-dismissible fade show`} role="alert">
						{messageText}
						<button type="button" className="btn-close" aria-label="Close" onClick={handleCloseMessage}></button>
					</div>
				)}
			</div>
		</div>
	)
}

export default Login;