import React from "react";
import {
    Alert,
    Snackbar
} from "@mui/material";

function Login(props) {

    const [username, setUsername] = React.useState("");
    const [passwd, setPasswd] = React.useState("");

    const [openMessage, setOpenMessage] = React.useState(false);
    const [messageText, setMessageText] = React.useState("");
    const [messageSeverity, setMessageSeverity] = React.useState("success");

    async function enviaLogin(event) {
        event.preventDefault();
        try {
            const response = await fetch('http://localhost:8080/login', {
                method: "POST",
                username: username,
                password: passwd
            });

            console.log(response);
            if (response.status >= 200 && response.status < 300) {
                // Salva o token JWT na sessão
                localStorage.setItem("token", response.data.token);
                // seta o estado do login caso tudo deu certo
                props.onLogin();
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
        <>
            <form>
                <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">Nome de usuário:</label>
                    <input value={username} type="email" class="form-control" id="username"
                        aria-describedby="emailHelp" onChange={event => { setUsername(event.target.value) }} />
                </div>
                <div class="mb-3">
                    <label for="exampleInputPassword1" class="form-label">Senha</label>
                    <input value={passwd} type="password" class="form-control" id="passwd"
                        onChange={event => { setPasswd(event.target.value) }} />
                </div>

                <button onClick={enviaLogin} type="submit" class="btn btn-primary">Enviar</button>
                <button onClick={cancelaLogin} type="btn" class="btn btn-primary">Cancelar</button>

            </form>
            <Snackbar
                open={openMessage}
                autoHideDuration={6000}
                onClose={handleCloseMessage}
            >
                <Alert
                    severity={messageSeverity}
                    onClose={handleCloseMessage}
                >
                    {messageText}
                </Alert>
            </Snackbar>
        </>
    );

}

export default Login;