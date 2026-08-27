import { agendamentos, agendar, cancelar } from "../api/agendamentos.js";
import { servicos } from "../api/servicos.js";

const listaAgendamentos = document.getElementById("listaAgendamentos");
const btnAgendar = document.getElementById("btnAgendar");
const btnVoltar = document.getElementById("btnVoltar");
const areaAgendamentos = document.getElementById("areaAgendamentos");
const areaNovoAgendamento = document.getElementById("areaNovoAgendamento");
const formAgendamento = document.getElementById("formAgendamento");
const servico = document.getElementById("servico");
const data = document.getElementById("data");
const hora = document.getElementById("hora");
const mensagemAgendamento = document.getElementById("mensagemAgendamento");

const modalAgendamento = document.getElementById("modalAgendamento");
const btnFecharModalAgendamento = document.getElementById("btnFecharModalAgendamento");
const spinnerAgendamento = document.getElementById("spinnerAgendamento");
const iconeAgendamento = document.getElementById("iconeAgendamento");
const mensagemModalAgendamento = document.getElementById("mensagemModalAgendamento");

const modalCancelamento = document.getElementById("modalCancelamento");
const btnFecharModal = document.getElementById("btnFecharModal");
const btnNaoCancelar = document.getElementById("btnNaoCancelar");
const btnConfirmarCancelamento = document.getElementById("btnConfirmarCancelamento");
const confirmacaoCancelamento = document.getElementById("confirmacaoCancelamento");
const statusCancelamento = document.getElementById("statusCancelamento");
const spinnerCancelamento = document.getElementById("spinnerCancelamento");
const iconeCancelamento = document.getElementById("iconeCancelamento");
const mensagemCancelamento = document.getElementById("mensagemCancelamento");

let agendamentoSelecionado = null;
let listaServicos = [];

document.addEventListener("DOMContentLoaded", carregarDados);

async function carregarDados() {
    await carregarAgendamentos();
    await carregarServicos();
}

async function carregarServicos() {
    try {
        const resposta = await servicos();
        listaServicos = resposta.dados;
    } catch (erro) {
        console.error(erro);
    }
}

function mostrarServicos() {
    servico.innerHTML = `
        <option value="" disabled selected hidden>Selecione um serviço</option>
        ${listaServicos.map(item => `
            <option value="${item.id}">
                ${item.nome} - R$ ${item.preco}
            </option>
        `).join("")}
    `;
}

async function carregarAgendamentos() {
    try {
        const resposta = await agendamentos();

        listaAgendamentos.innerHTML = "";

        if (resposta.dados.length === 0) {
            listaAgendamentos.innerHTML = `
                <div class="sem-agendamentos">${resposta.mensagem}</div>
            `;
            return;
        }

        listaAgendamentos.innerHTML = resposta.dados.map(agendamento => {
            const dataFormatada = new Date(agendamento.data).toLocaleDateString("pt-BR");
            const horaFormatada = agendamento.hora.slice(0, 5);

            let classeStatus = "";
            let textoStatus = "";

            if (agendamento.status === "AGENDADO") {
                classeStatus = "status-agendado";
                textoStatus = "Agendado";
            } else if (agendamento.status === "CONCLUIDO") {
                classeStatus = "status-concluido";
                textoStatus = "Concluído";
            } else if (agendamento.status === "CANCELADO") {
                classeStatus = "status-cancelado";
                textoStatus = "Cancelado";
            }

            return `
                <div class="agendamento-card">
                    <h2>${agendamento.servico}</h2>
                    <div class="preco">R$ ${agendamento.preco}</div>
                    <div class="data-hora">
                        <span>Data: ${dataFormatada}</span>
                        <span>Horário: ${horaFormatada}</span>
                    </div>
                    <div class="status-container">
                        <span class="status ${classeStatus}">${textoStatus}</span>
                        ${agendamento.status === "AGENDADO" ? `
                            <button class="btn-cancelar" data-id="${agendamento.id}">
                                Cancelar
                            </button>
                        ` : ""}
                    </div>
                </div>
            `;
        }).join("");

    } catch (erro) {
        console.error(erro);

        listaAgendamentos.innerHTML = `
            <div class="sem-agendamentos">
                Não foi possível carregar seus agendamentos.
            </div>
        `;
    }
}

btnAgendar.addEventListener("click", () => {
    mostrarServicos();
    areaAgendamentos.style.display = "none";
    btnAgendar.style.display = "none";
    areaNovoAgendamento.style.display = "block";
});

btnVoltar.addEventListener("click", () => {
    areaNovoAgendamento.style.display = "none";
    areaAgendamentos.style.display = "block";
    btnAgendar.style.display = "block";
    mensagemAgendamento.style.display = "none";
    formAgendamento.reset();
});

formAgendamento.addEventListener("submit", async evento => {
    evento.preventDefault();

    abrirModalAgendamento();

    await new Promise(resolve => requestAnimationFrame(resolve));

    try {
        const resposta = await agendar(
            servico.value,
            data.value,
            hora.value
        );

        spinnerAgendamento.style.display = "none";
        iconeAgendamento.className = "icone-agendamento icone-sucesso";
        iconeAgendamento.textContent = "✓";
        iconeAgendamento.style.display = "flex";
        mensagemModalAgendamento.textContent = resposta.mensagem;

        formAgendamento.reset();
        areaNovoAgendamento.style.display = "none";
        areaAgendamentos.style.display = "block";
        btnAgendar.style.display = "block";

        await carregarAgendamentos();

    } catch (erro) {
        console.error(erro);

        spinnerAgendamento.style.display = "none";
        iconeAgendamento.className = "icone-agendamento icone-erro";
        iconeAgendamento.textContent = "×";
        iconeAgendamento.style.display = "flex";
        mensagemModalAgendamento.textContent =
            erro.message || "Erro ao realizar agendamento.";
    }
});

function abrirModalAgendamento() {
    spinnerAgendamento.style.display = "block";
    iconeAgendamento.style.display = "none";
    iconeAgendamento.className = "icone-agendamento";
    mensagemModalAgendamento.textContent = "Realizando o agendamento...";
    modalAgendamento.style.display = "flex";
}

btnFecharModalAgendamento.addEventListener("click", () => {
    modalAgendamento.style.display = "none";
});

listaAgendamentos.addEventListener("click", evento => {
    if (!evento.target.classList.contains("btn-cancelar")) return;

    agendamentoSelecionado = evento.target.dataset.id;

    confirmacaoCancelamento.style.display = "block";
    statusCancelamento.style.display = "none";
    spinnerCancelamento.style.display = "block";
    iconeCancelamento.style.display = "none";
    iconeCancelamento.className = "icone-cancelamento";

    modalCancelamento.style.display = "flex";
});

btnNaoCancelar.addEventListener("click", fecharModal);
btnFecharModal.addEventListener("click", fecharModal);

btnConfirmarCancelamento.addEventListener("click", async () => {
    if (!agendamentoSelecionado) return;

    confirmacaoCancelamento.style.display = "none";
    statusCancelamento.style.display = "flex";
    spinnerCancelamento.style.display = "block";
    iconeCancelamento.style.display = "none";
    mensagemCancelamento.textContent = "Cancelando o agendamento...";

    try {
        const resposta = await cancelar(agendamentoSelecionado);

        spinnerCancelamento.style.display = "none";
        iconeCancelamento.className = "icone-cancelamento icone-sucesso";
        iconeCancelamento.textContent = "✓";
        iconeCancelamento.style.display = "flex";
        mensagemCancelamento.textContent = resposta.mensagem;

        await carregarAgendamentos();
        agendamentoSelecionado = null;

    } catch (erro) {
        console.error(erro);

        spinnerCancelamento.style.display = "none";
        iconeCancelamento.className = "icone-cancelamento icone-erro";
        iconeCancelamento.textContent = "×";
        iconeCancelamento.style.display = "flex";
        mensagemCancelamento.textContent = "Erro ao tentar cancelar o agendamento.";

        agendamentoSelecionado = null;
    }
});

function fecharModal() {
    modalCancelamento.style.display = "none";
    confirmacaoCancelamento.style.display = "block";
    statusCancelamento.style.display = "none";
    spinnerCancelamento.style.display = "block";
    iconeCancelamento.style.display = "none";
    iconeCancelamento.className = "icone-cancelamento";
    mensagemCancelamento.textContent = "Cancelando o agendamento...";
    agendamentoSelecionado = null;
}