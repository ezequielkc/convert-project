// Obtendo os elementos do Formulário
const form  = document.querySelector("form")
const amount = document.getElementById("amount")
const currency = document.getElementById("currency")

// Manipulando o input amount para receber somente números.
amount.addEventListener("input", () => {
    
    const hasCharactersRegex = /\D+/g
    //console.log(amount.value)
    amount.value = amount.value.replace(hasCharactersRegex, "")
})

// Captando o evento de submit (enviar) do formulário
form.onsubmit = (event) => {
    event.preventDefault()

    console.log(currency.value)
}