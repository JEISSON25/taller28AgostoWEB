$(document).ready(() => {

    $("#operar").on("submit", (e) => {
        e.preventDefault();

        const n1 = parseInt($("#n1").val());
        const n2 = parseInt($("#n2").val());
        const operator = $("#operator").val();

        if (isNaN(n1) || isNaN(n2) || !operator) {
            console.log("Debes completar todos los campos");
            return;
        }

        let result;

        switch (operator) {
            case "+":
                result = n1 + n2;
                break;
            case "-":
                result = n1 - n2;
                break;
            case "*":
                result = n1 * n2;
                break;
            case "/":
                result = n1 / n2;
                break;
            default:
                console.log("Opción incorrecta");
                return;
        }

        console.log(`${n1} ${operator} ${n2} = ${result}`);
    });

});