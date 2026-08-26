const mostrarSenha = document.getElementById("mostrarSenha");

mostrarSenha.addEventListener("click", function () {
    if (senha.type === "password") {
        senha.type = "text";
    } else {
        senha.type = "password";
    }
});