const url = "https://jsonplaceholder.typicode.com/users";

function sumar(numero1, numero2) {
    console.log(numero1 + numero2);
}

function restar(numero1, numero2) {
    console.log( numero1 - numero2);
}

function multiplicar(numero1, numero2) {
    console.log( numero1 * numero2);
}

function dividir(numero1, numero2) {
    if(numero2 === 0) {
        console.log("Error: No se puede dividir por cero.");
    }
    console.log( numero1 / numero2);
}


$(document).ready(() => {
    $("#btnCalcular").click(() => {
        
        let number1
        let number2
        
        try {
            // Validamos que es un numero entero
            number1 = parseInt(document.getElementById('number1').value)
            number2 = parseInt(document.getElementById('number2').value)    
        } catch (error) {
            console.log(error)
        }
        
        let operacion = document.getElementById('operacion').value

        console.log(`x = ${number1}, y = ${number2}, Operación: ${operacion}, Resultado: `)

        switch (operacion) {
            case "sumar":
                return sumar(number1, number2)
            case "restar":
                return restar(number1, number2);
            case "multiplicar":
                return multiplicar(number1, number2);
            case "dividir":
                if (number2 === 0) {
                    console.log("Error: No se puede dividir por cero.");
                }
                return dividir(number1, number2);
        }
    })
})