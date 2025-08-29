//url de la API
const API_URL = "https://jsonplaceholder.typicode.com/users";

let usuarios = [];
let usuariosFiltrados = [];

//async para cargar usuarios
const cargarUsuarios = async () => {
  try {
    //realiza peticion a api
    const respuesta = await axios.get(API_URL);

    //guarda y renderiza
    usuarios = respuesta.data;
    usuariosFiltrados = usuarios;
    renderizarTabla(usuariosFiltrados);

    console.log(`Usuarios cargados: ${usuarios.length}`);
    console.log("Primer usuario:", usuarios[0]);
  } catch (error) {
    console.error("Error al cargar usuarios:", error);
  }
};

// Renderizar tabla con jQuery
const renderizarTabla = (lista) => {
  const tbody = $("#tablaUsuarios tbody"); //esto obetine el cuerpo de la tabla
  tbody.empty();
  lista.forEach((u) => {
    //para crear una fila por usuario
    const fila = $(`<tr data-id="${u.id}">
      <td>${u.name}</td>
      <td>${u.email}</td>
      <td>${u.company.name}</td>
    </tr>`);
    tbody.append(fila); //lo agrega al body
  });
};

// evento de filtro en vívo
$("#filtro").on("input", (e) => {
  const termino = e.target.value.toLowerCase();
  usuariosFiltrados = usuarios.filter((u) =>
    u.name.toLowerCase().includes(termino)
  );
  renderizarTabla(usuariosFiltrados);

  console.log(
    `Filtro usado: "${termino}", coincidencias: ${usuariosFiltrados.length}`
  );
});

// evento de click para mostrar detalle
$("#tablaUsuarios").on("click", "tr", (e) => {
  const id = $(e.currentTarget).data("id"); // obtiene el id del usuario
  const usuario = usuarios.find((u) => u.id === id);
  if (usuario) {
    //muestra los usuarioss
    $("#telefono").text(`Teléfono: ${usuario.phone}`);
    $("#direccion").text(
      `Dirección: ${usuario.address.street}, ${usuario.address.city}`
    );
    $("#detalle").show();

    console.log("Detalle usuario:", usuario);
  }
});

//eento para cerrar detalle
$("#cerrarDetalle").on("click", () => {
  $("#detalle").hide();
});

// ejeecutar cuando cargue la página
$(document).ready(() => {
  cargarUsuarios();
});
