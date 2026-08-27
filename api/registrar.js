import { API_URL } from "../config.js";

export async function cadastrar(dados) {
    const resposta = await fetch(`${API_URL}/auth/register`, {
        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            nome: dados.nome,
            email: dados.email,
            senha: dados.senha
        })
    })

    const data = await resposta.json();

    if (!resposta.ok) {
        throw new Error(data.mensagem || "Erro no cadastro");
    }

    return data;
}
