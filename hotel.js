const formCadastro = document.getElementById("formulario");
const apiURLhotel = "http://localhost:5148/api/Hoteis";
const divCards = document.getElementById("cards");

async function buscarhoteis() {
    try{
        const resposta = await fetch(apiURLhotel);
        if(!resposta.ok)
        {
            throw new Error(`Erro HTTP: ${resposta.status}`);
        }
        const dados = await resposta.json();
        divCards.innerHTML = "";

        dados.forEach(dado => {
            let card = document.createElement("div");
            card.classList.add("card");
            card.innerHTML = `<h2>Id: ${dado.id}</h2>
            <p>Nome: ${dado.nome}
            <p>Quantidade de Estrelas: ${dado.qtdEstrelas}`;
            divCards.appendChild(card);
        });
    } catch (error){
        console.log("Erro ao buscar os dados:", error);
    }
}

async function cadastrarhotel(event){
    event.preventDefault();
    const nome = document.getElementById("nome").value;
    const cidade = document.getElementById("cidade").value;
    const qtdestrelas = document.getElementById("qtdestrelas").value;
    try{
        const resposta = await fetch(apiURLhotel, {
            method: "POST",
            headers:{
                "Content-Type" : "application/json"
            },
            body: JSON.stringify({
                nome: nome,
                cidade: cidade,
                qtdEstrelas: qtdestrelas
            })
        });
        console.log("Resposta da API:", resposta);
        if(!resposta.ok){
            throw new Error("Erro ao cadastrar o Hotel");
        }
       // const dados = await resposta.json();
        console.log("Hotel cadastrado com sucesso:");
        formCadastro.reset();
        await buscarhoteis();
    } catch(error){
        console.log("Erro ao cadastrar o Hotel:", error);
    }
}
formCadastro.addEventListener("submit", cadastrarhotel);

buscarhoteis();