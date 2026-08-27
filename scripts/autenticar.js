import { auth } from "../api/auth.js";

const loginForm = document.getElementById("Login");
const email = document.getElementById("email");
const senha = document.getElementById("senha");

const mensagemErro = document.getElementById("mensagemErro");
const btnCadastro = document.getElementById("btnCadastro");

loginForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    mensagemErro.style.display = "none";

    const dados = {
        email: email.value,
        senha: senha.value
    };

    try {

        const resposta = await auth(dados);

        localStorage.setItem("token", resposta.token);

        window.location.href = "./pages/agendamentos.html";

    } catch (erro) {
        mensagemErro.textContent = erro.messagem || "Não foi possivel realizar o login";
        mensagemErro.style.display = "block";

        senha.value = "";
    }
});

btnCadastro.addEventListener("click", function () {
    email.value = "";
    senha.value = "";

    window.location.href = "./pages/cadastro.html";
});
