import { API_URL } from "../config.js";

export async function auth(dados) {

    const resposta = await fetch(`${API_URL}/users/login`, {
        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            email: dados.email,
            senha: dados.senha
        })
    });

    const data = await resposta.json();

    if (!resposta.ok) {
        throw new Error(data.mensagem || "Erro no login");
    }

    return data;
}