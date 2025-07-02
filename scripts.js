const amount = document.getElementById("amount")

// Manipulando o input amount para receber somente números.
amount.addEventListener("input", () => {
    
    const hasCharactersRegex = /\D+/g
    //console.log(amount.value)
    amount.value = amount.value.replace(hasCharactersRegex, "")
})