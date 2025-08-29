$(document).ready(() => {
    const historial = [];

    $('#calcularForm').on('submit', (e) => {
        e.preventDefault();

        const num1 = parseFloat($('#num1').val());
        const num2 = parseFloat($('#num2').val());
        const op = $('#operacion').val();

        if (isNaN(num1) || isNaN(num2)) {
            $('#resultado').text('Ingrese ambos números.');
            return;
        }
        if (op === '/' && num2 === 0) {
            $('#resultado').text('Error: División por cero.');
            return;
        }

        let res;
        switch (op) {
            case '+': res = num1 + num2; break;
            case '-': res = num1 - num2; break;
            case '*': res = num1 * num2; break;
            case '/': res = num1 / num2; break;
        }

        $('#resultado').text(`Resultado: ${res}`);

        const operacionStr = `${num1} ${op} ${num2} = ${res}`;
        historial.push(operacionStr);
        $('#historial ul').html(historial.map(h => `<li>${h}</li>`).join(''));
    });
});