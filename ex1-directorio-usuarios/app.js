import axios from "axios";

const URL = "https://jsonplaceholder.typicode.com/users";

async function cargarUsuarios() {
  try {
    // Petición GET para obtener usuarios
    const response = await axios.get(URL);

    // Extraer los datos (JSON)
    const usuarios = response.data;

    // Mostrar en consola
    console.log("Usuarios cargados:");
    usuarios.forEach(u => {
      console.log(`${u.id} - ${u.name} (${u.email})`);
    });

    return usuarios;
  } catch (error) {
    console.error("Error cargando usuarios:", error.message);
    return [];
  }
}

// Llamada
cargarUsuarios();




