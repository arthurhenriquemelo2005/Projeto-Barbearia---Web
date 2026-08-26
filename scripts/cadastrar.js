import { cadastrar } from "../api/registrar.js";

const cadastroForm = document.getElementById("Cadastro");
const nome = document.getElementById("nome");
const email = document.getElementById("email");
const senha = document.getElementById("senha");

const mensagemErro = document.getElementById("mensagemErro");
const btnLogin = document.getElementById("btnLogin");

cadastroForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    mensagemErro.style.display = "none";

    const dados = {
        nome: nome.value,
        email: email.value,
        senha: senha.value
    };

    try {

        const resposta = await cadastrar(dados);

        alert(resposta.mensagem);

        setInterval(() => {
            window.location.href = "./agendar.html";
        }, 1000);

    } catch (erro) {
        mensagemErro.textContent = erro.message;
        mensagemErro.style.display = "block";
    }

    nome.value = "";
    email.value = "";
    senha.value = "";
});

btnLogin.addEventListener("click", function () {
    nome.value = "";
    email.value = "";
    senha.value = "";

    window.location.href = "../index.html";
});