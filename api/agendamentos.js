import { API_URL } from "../config.js";

const API_URL_CLIENTE = API_URL + "/cliente";

export async function agendamentos() {
    const resposta = await fetch(`${API_URL_CLIENTE}/agendamentos`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json"
        }
    });

    const data = await resposta.json();

    if (!resposta.ok) {
        throw new Error(data.mensagem || "Erro ao buscar seus agendamentos");
    }

    return data;
}

export async function agendar(service_id, data, hora) {
    const resposta = await fetch(`${API_URL_CLIENTE}/agendar`, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            servico_id: service_id,
            data: data,
            hora: hora
        })
    });

    const respostaData = await resposta.json();

    if (!resposta.ok) {
        throw new Error(
            respostaData.mensagem || "Erro ao realizar agendamento"
        );
    }

    return respostaData;
}

export async function concluir(agendamento_id) {
    const resposta = await fetch(
        `${API_URL_CLIENTE}/${agendamento_id}/concluirAgendamento`,
        {
            method: "PATCH",
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
        }
    );

    const data = await resposta.json();

    if (!resposta.ok) {
        throw new Error(
            data.mensagem || "Erro ao concluir agendamento"
        );
    }

    return data;
}

export async function cancelar(agendamento_id) {
    const resposta = await fetch(
        `${API_URL_CLIENTE}/${agendamento_id}/cancelarAgendamento`,
        {
            method: "PATCH",
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
        }
    );

    const data = await resposta.json();

    if (!resposta.ok) {
        throw new Error(
            data.mensagem || "Erro ao cancelar agendamento"
        );
    }

    return data;
}