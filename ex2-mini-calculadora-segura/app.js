
const calcular = () => {

    let nummero1 = parseFloat(document.getElementById("nummero1").value);
    let nummero2 = parseFloat(document.getElementById("nummero2").value);
    let operacion = document.getElementById("operacion").value;
    
    let resultado;

    
    if (operacion === "+") {
        resultado = nummero1 + nummero2;
        console.log("el resultado de la suma es: " + resultado);
    } else if (operacion === "-") {
        resultado = nummero1 - nummero2;
        console.log("el resultado de la resta es: " + resultado);
    } else if (operacion === "*") {
        resultado = nummero1 * nummero2;
        console.log("el resultado de la multiplicacion es: " + resultado);
    } else if (operacion === "/") {
        if (nummero2 === 0) {
            console.log("error, no se puede dividir por 0");
        } else { 
            resultado = nummero1 / nummero2;
            console.log("el resultado de la division es: " + resultado);
        }
    } else {
        console.log("Operación no válida. Usa: suma, resta, multiplicacion, o division.");
    }
};


document.getElementById("calcular").addEventListener("click", calcular);
