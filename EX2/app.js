//historial en memoria
let historial = [];

//calcular operación
const calcular = (n1, n2, op) => {
  switch (op) {
    case "+":
      return n1 + n2;
    case "-":
      return n1 - n2;
    case "*":
      return n1 * n2;
    case "/":
      if (n2 === 0) throw new Error("No se puede dividir por cero"); //validar división por cero
      return n1 / n2;
    default:
      throw new Error("Operación no válida"); // operador desconocido
  }
};

//evento submit
$("#calcForm").on("submit", (e) => {
  e.preventDefault(); // evita que se recargue la página

  const n1 = Number($("#num1").val());
  const n2 = Number($("#num2").val());
  const op = $("#operacion").val();

  try {
    //cvalidación
    if (isNaN(n1) || isNaN(n2)) throw new Error("Entradas inválidas");

    //calcular
    const resultado = calcular(n1, n2, op);

    // ostrar resultado
    $("#resultado").text(`Resultado: ${resultado}`);

    // Agregar al historial (destructuring aplicado aquí)
    const entrada = { n1, n2, op, resultado };
    historial.unshift(entrada); // agregar al inicio del historial

    // renderizar historial en la lista <ul id="historial">
    const lista = $("#historial");
    lista.empty();
    historial.forEach(({ n1, n2, op, resultado }) => {
      // por cada entrada agregamos un <li>
      lista.append(`<li>${n1} ${op} ${n2} = ${resultado}</li>`);
    });

    // Logs
    console.log("Operación:", { n1, n2, op });
    console.log("Resultado:", resultado);
    console.log("Historial actual:", historial);
  } catch (err) {
    $("#resultado").text(`Error: ${err.message}`);
    console.error("Error:", err.message);
  }
});
