// ----- Arrays -----
let usuarios = [];
let usuariosFiltrados = [];

// ----- Carga de usuarios - AXIS -----
const cargarUsuarios = async () => {
    try{
        console.log("Cargando usuarios...");
        const response = await axios.get('https://jsonplaceholder.typicode.com/users');
        usuarios = response.data.slice(0,10); //10 users
        usuariosFiltrados = [...usuarios];

        // Resumen de usuarios cargados
        console.log("Usuarios cargados correctamente 🎉");
        console.log("Total usuarios: " + usuarios.length);
        console.log("Primera fila: "+ usuarios[0]);

        // Tabla
        $('#cargando').hide();
        $('#tabla').show();
        $('#stats').show();

        //Rederizado
        renderTabla();
        updateStats();

    }
    catch(error){
        console.error("Error cargando usuarios");
        $('#cargando').html(`
            <div class="loading" style="color: #e74c3c;">
                ❌ Error cargando usuarios. Intente nuevamente más tarde.
            </div> `
            );
    }
};

// ----- Renderizado de tabla - jQuery -----
const renderTabla = () => {
    $('#userTableBody').empty();
    
    if(usuariosFiltrados.length === 0){
        $('#table-container').hide();
        $('#no-results').show();
        return;
    }

    $('#no-results').hide();
    $('#table-container').show();

   usuariosFiltrados.forEach((usuario, index) => {
        const row = `
            <tr data-user-id="${usuario.id}" data-index="${index}">
                <td class="user-name">${usuario.name}</td>
                <td class="user-email">${usuario.email}</td>
                <td class="user-company">${usuario.company.name}</td>
            </tr>
        `;
        $('#userTableBody').append(row);
    });
};

// ----- Filtrado de usuarios -----
const filtrarUsuarios = (query) => {
   usuariosFiltrados = usuarios.filter(usuario => 
        usuario.name.toLowerCase().includes(query.toLowerCase())
    );

    console.log("Se ha aplicado el filtro");
    console.log("Termino de busqueda: " + query);
    console.log("Usuarios encontrados: " + usuariosFiltrados.length);

    renderTabla();
    updateStats();
};

// ----- Actualizar estadisticas -----
const updateStats = () => {
    $('#usuarios').text(`total usuarios: ${usuarios.length}`);
    $('#usuariosFiltrados').text(`usuarios filtrados: ${usuariosFiltrados.length}`);
};

// ----- Mostrar detalle del usuario -----
const mostrarDetalles = (userId) => {
    console.log(`Usuario seleccionado con ID: ${userId}`);
    const user = usuarios.find(u => u.id === userId);    
    if (!user) return;

    console.log(`👤 Detalle del usuario seleccionado:`);
    console.log(`🆔 ID: ${user.id}`);
    console.log(`👤 Nombre: ${user.name}`);
    console.log(`📧 Email: ${user.email}`);
    console.log(`📞 Teléfono: ${user.phone}`);
    console.log(`🏠 Dirección: ${user.address.street}, ${user.address.city}`);
    console.log(`🏢 Empresa: ${user.company.name}`);
    
    // ------ datos del usuario ------
    $('#detailName').text(user.name);
    $('#detailEmail').text(user.email);
    $('#detailPhone').text(user.phone);
    $('#detailAddress').html(`
        ${user.address.street}, ${user.address.suite}<br>
        ${user.address.city}, ${user.address.zipcode}
    `);
    $('#detailCompany').text(user.company.name);
    $('#detailWebsite').text(user.website);
    
    $('#mostrarDetalles').fadeIn(300);
};

// ----- cerrar modal -----
const closeModal = () => {
    $('#mostrarDetalles').fadeOut(300);
};

$(document).ready(() => {
    // ------ Cargar usuarios al inicio ------
    cargarUsuarios();
    
    // ------ Filtro en vivo por nombre ------
    $('#searchInput').on('input', (e) => {
        const searchTerm = e.target.value.trim();
        filtrarUsuarios(searchTerm);
    });
    
    // Click en fila de usuario para mostrar detalle
    $(document).on('click', '#userTableBody tr', (e) => {
        const userId = parseInt($(e.currentTarget).data('user-id'));
        mostrarDetalles(userId);
    });
    
    // Cerrar modal al hacer click fuera del contenido
    $('#mostrarDetalles').on('click', (e) => {
        if (e.target.id === 'mostrarDetalles') {
            closeModal();
        }
    });
    
    // Cerrar modal con tecla Escape
    $(document).on('keydown', (e) => {
        if (e.key === 'Escape') {
            closeModal();
        }
    });
});