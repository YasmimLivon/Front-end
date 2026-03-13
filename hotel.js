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
            <p>Quantidade de Estrelas: ${dado.qtdEstrelas}
            <button style="margin-top:30px;" onclick="mostrarDetalhes(${dado.id})">Ver Detalhes</button>
            <div id="detalhes_hotel_${dado.id}" style="display: none;">`;
            divCards.appendChild(card);
        });
    } catch (error){
        console.log("Erro ao buscar os dados:", error);
    }
}

async function mostrarDetalhes(hotelId) {
    const detalhesDiv = document.getElementById(`detalhes_hotel_${hotelId}`);
    if(detalhesDiv.style.display === "none") {
        detalhesDiv.style.display = "block";
        mostrarQuartos(hotelId);
    } else {
        detalhesDiv.style.display = "none";
        detalhesDiv.innerHTML = "";
    }
}

async function mostrarQuartos(hotelId) {
    try{
        const response = await fetch(`${apiURLhotel}/${hotelId}`);
        if (response.ok){
        const hotel = await response.json();
        console.log("quartos: ", hotel.quartos);
        const detalhesDiv = document.getElementById(`detalhes_hotel_${hotelId}`);
        let quartosHTML = "<h4>Quartos:</h4>";
        hotel.quartos.forEach((quarto) => {
            quartosHTML += `<div class="quarto-card">
            <h5>Tipo: ${quarto.tipo}</h5>
            <p>Preço: R$${quarto.preco}</p>
            </div>`; 
        });
        detalhesDiv.innerHTML += quartosHTML;
        }
    } catch (error) {
        console.error("Erro ao carregar quartos:", error);
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