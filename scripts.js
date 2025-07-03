// Função para buscar as cotações do dia
async function fetchExchangeRates() {
    try {
        const response = await fetch('https://economia.awesomeapi.com.br/last/USD-BRL,EUR-BRL,GBP-BRL');
        const data = await response.json();
        // Atualiza as variáveis globais com as cotações do dia
        window.USD = Number(data.USDBRL.bid);
        window.EUR = Number(data.EURBRL.bid);
        window.GBP = Number(data.GBPBRL.bid);
    } catch (error) {
        alert('Não foi possível obter as cotações do dia. Usando valores padrão.');
        // Valores padrão caso a API falhe
        window.USD = 4.87;
        window.EUR = 5.32;
        window.GBP = 6.08;
    }
}

// Chama a função ao carregar a página
fetchExchangeRates();

// Obtendo os elementos do Formulário
const form  = document.querySelector("form")
const amount = document.getElementById("amount")
const currency = document.getElementById("currency")
const footer = document.querySelector("main footer")
const description = document.getElementById("description")
const result = document.getElementById("result")

// Manipulando o input amount para receber somente números.
amount.addEventListener("input", () => {
    
    const hasCharactersRegex = /\D+/g
    //console.log(amount.value)
    amount.value = amount.value.replace(hasCharactersRegex, "")
})

// Captando o evento de submit (enviar) do formulário
form.onsubmit = (event) => {
    event.preventDefault()

    switch (currency.value) {
        case "USD":
            convertCurrency(amount.value, USD, "US$")
            break
        case "EUR":
            convertCurrency(amount.value, EUR, "€")
            break
        case "GBP":
            convertCurrency(amount.value, GBP, "£")
            break
        default:
            console.log("Moeda não suportada")
    }
}

// Função para converter a moeda.
function convertCurrency(amount, price, symbol) {
    try {
        // Exibindo a cotação da moeda selecionada 
        description.textContent = `${symbol} 1 = ${formatCurrencyBRL(price)}`

        // Calcula o total
        let total = amount * price

        // Verifica se o resultado não é um número.
        if(isNaN(total)) {
            return alert("Por favor digite o valor corretamente para converter")
        }

        //formatar o valor total
        total = formatCurrencyBRL(total).replace("R$", "")

        // Exibe o resultado total 
        result.textContent = `${total} Reais`

        // Aplica a classe que exibe o footer para mostrar o resultado.
        footer.classList.add("show-result")

    } catch (error) {
        // Remove a classe do footer removendo ele da tela. 
        footer.classList.remove("show-result")

        console.log(error)
        alert ("Não foi possível converter a moeda")

    }
}

// Formata a moeda em Real Brasileiro
function formatCurrencyBRL(value) {
    // Converte para número para utilizar o tolocaleString para formatar no padrão BRL.
    return Number(value).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
    })
}