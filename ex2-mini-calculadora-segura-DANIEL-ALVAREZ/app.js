const sumar = () => {
    const num1 = obtenerNumero1();
    const num2 = obtenerNumero2();
    const result = num1 + num2;
    document.getElementById('result').innerText = `Resultado: ${result}`;
    document.getElementById('historial').innerText += `Resultado de la suma: ${result} \n`;
}

const restar = () => {
    const num1 = obtenerNumero1();
    const num2 = obtenerNumero2();
    const result = num1 - num2;
    document.getElementById('result').innerText = `Resultado: ${result}`;
    document.getElementById('historial').innerText += `Resultado de la resta: ${result} \n`;
}

const multiplicar = () => {
    const num1 = obtenerNumero1();
    const num2 = obtenerNumero2();
    const result = num1 * num2;
    document.getElementById('result').innerText = `Resultado: ${result}`;
    document.getElementById('historial').innerText += `Resultado de la multiplicación: ${result} \n`;
}

const dividir = () => {
    const num1 = obtenerNumero1();
    const num2 = obtenerNumero2();

    if(num1 == 0 || num2 == 0) {
        alert("No se puede dividir por cero.");
        return;
    }

    const result = num1 / num2;
    document.getElementById('result').innerText = `Resultado: ${result}`;
    document.getElementById('historial').innerText += `Resultado de la división: ${result} \n`;
}

function obtenerNumero1() {
    let num1 = parseFloat(document.getElementById('num1').value);

    if (isNaN(num1)) {
        alert("Por favor, ingresa un número válido en el campo 1.");
        return null;
    }
    return num1;
}

function obtenerNumero2() {
    let num2 = parseFloat(document.getElementById('num2').value);
    
    if (isNaN(num2)) {
        alert("Por favor, ingresa un número válido en el campo 2.");
        return null;
    }
    return num2;
}

document.getElementById('operation-select').addEventListener('change', function() {
    const selectedOperation = this.value;
    console.log("Operación seleccionada: ", selectedOperation);
    switch (selectedOperation) {
        case 'sumar':
            sumar();
            break;
        case 'restar':
            restar();
            break;
        case 'multiplicar':
            multiplicar();
            break;
        case 'dividir':
            dividir();
            break;
    }
});
