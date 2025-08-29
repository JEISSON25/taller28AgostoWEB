 const $tabla = $('#tablaUsuarios tbody');
    const $filtro = $('#filtroNombre');
    const $detalle = $('#detalleUsuario');
    let usuarios = [];


    const cargarUsuarios = async () => {
      try {
        const res = await axios.get('https://jsonplaceholder.typicode.com/users');
        usuarios = res.data;

   
        console.log(`Usuarios cargados: ${usuarios.length}`);
        console.log('Primera fila:', {
          nombre: usuarios[0].name,
          email: usuarios[0].email,
          empresa: usuarios[0].company.name
        });

        renderizarTabla(usuarios);
      } catch (error) {
        console.error('Error al cargar usuarios:', error);
      }
    };

    const renderizarTabla = (lista) => {
      $tabla.empty();

      lista.forEach(usuario => {
        const fila = $(`
          <tr data-id="${usuario.id}">
            <td>${usuario.name}</td>
            <td>${usuario.email}</td>
            <td>${usuario.company.name}</td>
          </tr>
        `);

        fila.on('click', () => mostrarDetalle(usuario));

        $tabla.append(fila);
      });


      const filtro = $filtro.val().trim();
      console.log(`Filtro: "${filtro}" → ${lista.length} coincidencias`);
    };


    const mostrarDetalle = (usuario) => {
      const { phone, address } = usuario;
      const direccion = `${address.street}, ${address.suite}, ${address.city}, ${address.zipcode}`;

      $detalle.html(`
        <strong>Teléfono:</strong> ${phone} <br>
        <strong>Dirección:</strong> ${direccion}
      `).toggle();


      console.log('Detalle del usuario seleccionado:', {
        nombre: usuario.name,
        telefono: phone,
        direccion: direccion
      });
    };


    $filtro.on('input', () => {
      const term = $filtro.val().toLowerCase();

      const filtrados = usuarios.filter(u =>
        u.name.toLowerCase().includes(term)
      );

      renderizarTabla(filtrados);
    });


    $(async () => {
      await cargarUsuarios();
    });