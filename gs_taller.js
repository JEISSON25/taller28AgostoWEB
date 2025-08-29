// Espera que el DOM esté listo
$(document).ready(async () => {
  const URL = 'https://jsonplaceholder.typicode.com/users';
  let usuarios = [];

  try {
    const respuesta = await axios.get(URL);
    usuarios = respuesta.data.slice(0, 10); 

    // Mostrar en consola
    console.log(` Usuarios cargados: ${usuarios.length}`);
    console.log(' Primera fila:', {
      nombre: usuarios[0].name,
      email: usuarios[0].email,
      empresa: usuarios[0].company.name
    });

    // Renderizar la tabla
    renderizarTabla(usuarios);

  } catch (error) {
    console.error(' Error al cargar usuarios:', error);
  }
});

// Función para renderizar la tabla
const renderizarTabla = usuarios => {
  const tbody = $('#tabla-usuarios');
  tbody.empty(); // Limpiar antes de pintar

  usuarios.forEach(usuario => {
    const fila = $(`
      <tr data-id="${usuario.id}">
        <td>${usuario.name}</td>
        <td>${usuario.email}</td>
        <td>${usuario.company.name}</td>
      </tr>
    `);
    tbody.append(fila);
  });
};
