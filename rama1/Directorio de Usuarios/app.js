// Cargar y mostrar usuarios con filtro y detalle usando ES6, axios, jQuery
const USUARIOS_API_URL = 'https://jsonplaceholder.typicode.com/users';
let usuarios = [];
let usuariosFiltrados = [];

// Cargar usuarios
const cargarUsuarios = async () => {
	try {
		const resp = await axios.get(USUARIOS_API_URL);
		usuarios = resp.data.slice(0, 10);
		usuariosFiltrados = [...usuarios];
		renderTabla(usuariosFiltrados);
		console.log(`Usuarios cargados: ${usuarios.length}`);
		if (usuarios.length > 0) {
			console.log('Primera fila:', usuarios[0]);
		}
	} catch (e) {
		console.error('Error al cargar usuarios', e);
	}
};

// Renderizar tabla
const renderTabla = (lista) => {
	const $tbody = $('#tablaUsuarios tbody');
	$tbody.empty();
	lista.forEach((u, i) => {
		$tbody.append(`
			<tr class="usuario-row" data-id="${u.id}">
				<td>${u.name}</td>
				<td>${u.email}</td>
				<td>${u.company.name}</td>
			</tr>
		`);
	});
};

// Filtro en vivo
$('#filtroNombre').on('input', (e) => {
	const termino = e.target.value.toLowerCase();
	usuariosFiltrados = usuarios.filter(u => u.name.toLowerCase().includes(termino));
	renderTabla(usuariosFiltrados);
	console.log(`Filtro: "${termino}" | Coincidencias: ${usuariosFiltrados.length}`);
});

// Mostrar detalle al hacer clic
$('#tablaUsuarios').on('click', '.usuario-row', (e) => {
	const id = $(e.currentTarget).data('id');
	const usuario = usuariosFiltrados.find(u => u.id === id);
	if (usuario) {
		const direccion = `${usuario.address.street}, ${usuario.address.suite}, ${usuario.address.city}`;
		$('#detalleUsuario').html(`
			<strong>${usuario.name}</strong><br>
			Teléfono: ${usuario.phone}<br>
			Dirección: ${direccion}<br>
			<button id="cerrarDetalle">Cerrar</button>
		`).show();
		console.log('Detalle usuario:', usuario);
	}
});

// Cerrar detalle
$('#detalleUsuario').on('click', '#cerrarDetalle', () => {
	$('#detalleUsuario').hide();
});

// Inicializar
$(document).ready(() => {
	cargarUsuarios();
});
