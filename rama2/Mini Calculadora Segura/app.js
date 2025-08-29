// Mini Calculadora Segura con historial y validaciones
let historial = [];

const actualizarHistorial = () => {
	const $historial = $('#historial');
	$historial.empty();
	historial.forEach(item => $historial.append(`<li>${item}</li>`));
	console.log('Historial:', historial);
};

$('#formCalc').on('submit', e => {
	e.preventDefault();
	const num1 = parseFloat($('#num1').val());
	const num2 = parseFloat($('#num2').val());
	const operacion = $('#operacion').val();
	// Destructuring ejemplo
	const datos = { num1, num2, operacion };
	console.log('Operación solicitada:', datos);

	let resultado;
	let error = '';
	if (isNaN(num1) || isNaN(num2)) {
		error = 'Ambos valores deben ser números válidos.';
	} else if (operacion === '/' && num2 === 0) {
		error = 'No se puede dividir por cero.';
	} else {
		switch (operacion) {
			case '+': resultado = num1 + num2; break;
			case '-': resultado = num1 - num2; break;
			case '*': resultado = num1 * num2; break;
			case '/': resultado = num1 / num2; break;
		}
	}

	if (error) {
		$('#resultado').text(error).css('color', 'red');
		console.log('Error:', error);
	} else {
		const texto = `${num1} ${operacion} ${num2} = ${resultado}`;
		$('#resultado').text(texto).css('color', 'green');
		historial.unshift(texto);
		actualizarHistorial();
		console.log('Resultado:', resultado);
	}
	// Mostrar historial tras cada operación
	actualizarHistorial();
});

// Cargar historial de localStorage (opcional)
if (window.localStorage) {
	const guardado = localStorage.getItem('historialCalc');
	if (guardado) {
		historial = JSON.parse(guardado);
		actualizarHistorial();
	}
}

// Guardar historial en localStorage tras cada cambio
const observer = new MutationObserver(() => {
	if (window.localStorage) {
		localStorage.setItem('historialCalc', JSON.stringify(historial));
	}
});
observer.observe(document.getElementById('historial'), { childList: true });
