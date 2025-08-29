let historial = [];

$("#calcular").on("click", () => {
  const num1 = parseFloat($("#num1").val());
  const num2 = parseFloat($("#num2").val());
  const operacion = $("#operacion").val();

  if (isNaN(num1) || isNaN(num2)) {
    alert("Por favor ingresa dos números válidos");
    console.error("Error: entradas inválidas");
    return;
  }

  if (operacion === "/" && num2 === 0) {
    alert("No se puede dividir por cero");
    console.error("Error: división por cero");
    return;
  }

  let resultado;
  switch (operacion) {
    case "+": resultado = num1 + num2; break;
    case "-": resultado = num1 - num2; break;
    case "*": resultado = num1 * num2; break;
    case "/": resultado = num1 / num2; break;
  }

  $("#resultado").text(resultado);
  const registro = `${num1} ${operacion} ${num2} = ${resultado}`;
  historial.unshift(registro);
  console.log("Operación:", registro);
  console.log("Historial:", historial);

  renderHistorial();
});

const renderHistorial = () => {
  $("#historial").empty();
  historial.forEach(item => {
    $("#historial").append(`<li>${item}</li>`);
  });
};
