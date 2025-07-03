// Função para buscar as cotações do dia
// Esta função faz uma requisição para uma API que retorna o valor do dólar (USD), euro (EUR) e libra (GBP) em relação ao real (BRL)
async function fetchExchangeRates() {
    try {
        // Fazendo a requisição para a API usando fetch (requisição assíncrona)
        const response = await fetch('https://economia.awesomeapi.com.br/last/USD-BRL,EUR-BRL,GBP-BRL');
        // Converte a resposta da API para um objeto JavaScript
        const data = await response.json();
        // Salva as cotações nas variáveis globais para usar depois na conversão
        window.USD = Number(data.USDBRL.bid); // Cotação do Dólar
        window.EUR = Number(data.EURBRL.bid); // Cotação do Euro
        window.GBP = Number(data.GBPBRL.bid); // Cotação da Libra
    } catch (error) {
        // Caso aconteça algum erro (ex: sem internet), mostra um alerta e usa valores padrão
        alert('Não foi possível obter as cotações do dia. Usando valores padrão.');
        window.USD = 4.87; // Valor padrão do Dólar
        window.EUR = 5.32; // Valor padrão do Euro
        window.GBP = 6.08; // Valor padrão da Libra
    }
}

// Chama a função para buscar as cotações assim que a página carrega
fetchExchangeRates();

// Seleciona os elementos do formulário na página HTML
const form  = document.querySelector("form") // O formulário principal
const amount = document.getElementById("amount") // Campo para digitar o valor
const currency = document.getElementById("currency") // Seleção da moeda
const footer = document.querySelector("main footer") // Rodapé onde aparece o resultado
const description = document.getElementById("description") // Onde mostra a cotação
const result = document.getElementById("result") // Onde mostra o valor convertido

// Permite que o campo de valor (amount) aceite apenas números
amount.addEventListener("input", () => {
    // Expressão regular que encontra qualquer caractere que não seja número
    const hasCharactersRegex = /\D+/g
    // Substitui qualquer caractere não numérico por vazio (remove)
    amount.value = amount.value.replace(hasCharactersRegex, "")
})

// Quando o formulário for enviado (clicar em converter), executa esta função
form.onsubmit = (event) => {
    event.preventDefault() // Evita que a página recarregue ao enviar o formulário

    // Verifica qual moeda foi selecionada e chama a função de conversão correspondente
    switch (currency.value) {
        case "USD":
            convertCurrency(amount.value, USD, "US$") // Dólar
            break
        case "EUR":
            convertCurrency(amount.value, EUR, "€") // Euro
            break
        case "GBP":
            convertCurrency(amount.value, GBP, "£") // Libra
            break
        default:
            // Caso a moeda não seja reconhecida
            console.log("Moeda não suportada")
    }
}

// Função que faz a conversão do valor digitado para a moeda escolhida
// amount: valor digitado, price: cotação da moeda, symbol: símbolo da moeda
function convertCurrency(amount, price, symbol) {
    try {
        // Mostra a cotação da moeda escolhida na tela
        description.textContent = `${symbol} 1 = ${formatCurrencyBRL(price)}`

        // Calcula o valor total convertido
        let total = amount * price

        // Se o resultado não for um número válido, mostra um alerta
        if(isNaN(total)) {
            return alert("Por favor digite o valor corretamente para converter")
        }

        // Formata o valor convertido para o padrão brasileiro (BRL) e remove o símbolo "R$" para exibir só o número
        total = formatCurrencyBRL(total).replace("R$", "")

        // Mostra o resultado na tela
        result.textContent = `${total} Reais`

        // Adiciona a classe que faz o rodapé aparecer com o resultado
        footer.classList.add("show-result")

    } catch (error) {
        // Se der erro, esconde o rodapé e mostra um alerta
        footer.classList.remove("show-result")
        console.log(error)
        alert ("Não foi possível converter a moeda")
    }
}

// Função que formata um número para o formato de moeda brasileira (Real)
function formatCurrencyBRL(value) {
    // Converte o valor para número e formata para o padrão "R$ 0,00"
    return Number(value).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
    })
}