import { API_URL } from "../config.js";

const API_URL_CLIENTE = API_URL + "/cliente";

export async function servicos() {
    const resposta = await fetch(`${API_URL_CLIENTE}/servicos`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json"
        }
    });

    const data = await resposta.json();

    if (!resposta.ok) {
        throw new Error(data.mensagem || "Erro ao buscar serviços");
    }

    return data;
}