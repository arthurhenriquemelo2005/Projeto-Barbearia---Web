const API_URL = "https://barbearia-backend-nruo.onrender.com";

function loginFetch(email, senha) {
    return fetch(`${API_URL}/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email,
            senha
        })
    })
    .then(async res => {
        const data = await res.json();

        if (res.status === 201) {
            return data;
        }

        throw new Error(data.mensagem || "Erro no login");
    });
}