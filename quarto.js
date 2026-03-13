const formQuarto = document.getElementById("formQuarto");
const apiURLquarto = "http://localhost:5148/api/Quartos";
const apiURLhotel = "http://localhost:5148/api/Hoteis";
const divCardsQuarto = document.getElementById("cardsquarto");

async function buscarquartos() {
    try{
        const resposta = await fetch(apiURLquarto);
        if(!resposta.ok)
        {
            throw new Error(`Erro HTTP: ${resposta.status}`);
        }
        const dados = await resposta.json();
        divCardsQuarto.innerHTML = "";

        dados.forEach(dado => 
        {
        let cardsquarto = document.createElement("div");
        cardsquarto.classList.add("card");
        cardsquarto.innerHTML = `<p>Nome Hotel: ${dado.nomeHotel}</p>
        <p>Tipo: ${dado.tipo}</p>
        <p>Preco: ${dado.preco}</p>`;
        divCardsQuarto.appendChild(cardsquarto);
        });
    } catch (error){
        console.log("Erro ao buscar os dados:", error);
    }
}


async function buscarHotel() {
    try{
        const response = await fetch(apiURLhotel);
        if(!response.ok) throw new Error("Falha ao carregar hoteis");

        const hoteis = await response.json();
        const selectHotel = document.getElementById("hotel");
        selectHotel.innerHTML = "<option value = '' >Selecione um Hotel</option>";
        hoteis.forEach((dado) => {
            const option  = document.createElement("option");
            option.value = dado.id;
            option.textContent = dado.nome;
            selectHotel.appendChild(option);
        })

    } catch (error){
        console.error(error);
    }
}
    buscarHotel();

async function cadastrarQuarto(event) {
    event.preventDefault();
    const hotelId = document.getElementById("hotel").value;
    const tipo = document.getElementById("tipo").value;
    const preco = document.getElementById("preco").value;
    
    try{
        const resposta = await fetch(apiURLquarto, {
            method: "POST",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify({                
                hotelId: hotelId,
                tipo: tipo,
                preco: preco
            })
        });
         console.log("Resposta da API:", resposta);
        if(!resposta.ok){
            throw new Error("Erro ao cadastrar o Quarto:");
        }
         console.log("Quarto cadastrado com sucesso:");
        formQuarto.reset();
        await buscarquartos();
    } catch(error){
        console.log("Erro ao cadastrar o quarto:", error);
    }
}
formQuarto.addEventListener("submit", cadastrarQuarto);
buscarquartos();