let history = [];

const calculate = (num1, num2, op) => {
  if (isNaN(num1) || isNaN(num2)) {
    console.log("debe ser números");
    return { error: "Debe ingresar números válidos" };
  }
  if (op === "/" && num2 === 0) {
    console.log("no se divide por 0");
    return { error: "no se puede dividir por 0" };
  }

  let result;
  switch (op) {
    case "+": result = num1 + num2; break;
    case "-": result = num1 - num2; break;
    case "*": result = num1 * num2; break;
    case "/": result = num1 / num2; break;
    default: return { error: "Operación inválida" };
  }

  return { result };
};

$(document).ready(() => {
  $("#calcForm").on("submit", (e) => {
    e.preventDefault();

    const [num1, num2] = [parseFloat($("#num1").val()), parseFloat($("#num2").val())];
    const op = $("#operation").val();

    console.log(`opracion solicitada: ${num1} ${op} ${num2}`);

    const { result, error } = calculate(num1, num2, op);

    if (error) {
      $("#result").text(error);
      console.log("respuesta.:", error);
    } else {
      $("#result").text(result);
      console.log("respuesta:", result);

      history.unshift(`${num1} ${op} ${num2} = ${result}`);

      $("#history").empty();
      history.forEach(item => {
        $("#history").append(`<li>${item}</li>`);
      });

      console.log("historial:", history);
    }
  });
});
