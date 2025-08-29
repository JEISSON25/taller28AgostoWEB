const cargarUsuarios = async () => {
  try {
    const { data } = await axios.get("https://jsonplaceholder.typicode.com/users");
    console.log(`Usuarios cargados: ${data.length}`);
    console.log("Primer usuario:", data[0]);

    renderUsuarios(data);

    // Filtro en vivo
    $("#filtro").on("input", (e) => {
      const termino = e.target.value.toLowerCase();
      const filtrados = data.filter(u => u.name.toLowerCase().includes(termino));
      console.log(`Filtro: "${termino}" → ${filtrados.length} coincidencias`);
      renderUsuarios(filtrados);
    });
  } catch (error) {
    console.error("Error al cargar usuarios", error);
  }
};

//renderizar
const renderUsuarios = (usuarios) => {
  $("#tablaUsuarios").empty();
  usuarios.forEach(usuario => {
    $("#tablaUsuarios").append(`
      <tr onclick="mostrarDetalle(${usuario.id})">
        <td>${usuario.name}</td>
        <td>${usuario.email}</td>
        <td>${usuario.company.name}</td>
      </tr>
    `);
  });
};
//mostrar detalle
const mostrarDetalle = async (id) => {
  try {
    const { data } = await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`);
    console.log("Detalle usuario:", data);

    $("#detalle").html(`
      <h3>Detalle de ${data.name}</h3>
      <p><strong>Teléfono:</strong> ${data.phone}</p>
      <p><strong>Dirección:</strong> ${data.address.street}, ${data.address.city}</p>
    `);
  } catch (error) {
    console.error("Error al obtener detalle", error);
  }
};

cargarUsuarios();