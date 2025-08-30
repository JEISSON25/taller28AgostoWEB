// Variables globales
let users = [];
let selectedUserId = null;

// Cargar usuarios al iniciar
$(document).ready(async () => {
    try {
        console.log('Cargando usuarios...');
        const response = await axios.get('https://jsonplaceholder.typicode.com/users');
        users = response.data;
        
        console.log(`${users.length} usuarios cargados`);
        if (users.length > 0) {
            const {id, name, email, company} = users[0];
            console.log('Primer usuario:', {id, name, email, company: company.name});
        }
        
        renderUsers(users);
        $('#searchInput').on('input', filterUsers);
        
    } catch (error) {
        showError('Error al cargar usuarios: ' + error.message);
    }
});

// Renderizar tabla de usuarios
const renderUsers = (userList) => {
    $('#loadingMessage').hide();
    $('#usersTable').show();
    
    const tableBody = userList.map(user => `
        <tr data-id="${user.id}">
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td>${user.company.name}</td>
        </tr>
    `).join('');
    
    $('#usersTableBody').html(tableBody);
    $('tr[data-id]').click((e) => showUserDetails($(e.currentTarget).data('id')));
};

// Filtrar usuarios por nombre
const filterUsers = () => {
    const term = $('#searchInput').val().toLowerCase();
    const filtered = term ? users.filter(u => u.name.toLowerCase().includes(term)) : users;
    
    console.log(`Filtro: "${term}" → ${filtered.length} resultados`);
    renderUsers(filtered);
    
    // Cerrar detalles si el usuario seleccionado ya no está visible
    if (selectedUserId && !filtered.some(u => u.id === selectedUserId)) {
        $('#userDetail').hide();
        selectedUserId = null;
    }
};

// Mostrar detalles del usuario
const showUserDetails = (userId) => {
    const user = users.find(u => u.id === userId);
    if (!user) return;
    
    selectedUserId = userId;
    
    $('#userDetail').html(`
        <h3>Detalles de ${user.name}</h3>
        <div class="detail-item"><strong>Teléfono:</strong> ${user.phone}</div>
        <div class="detail-item"><strong>Dirección:</strong> 
            ${user.address.street}, ${user.address.city} (${user.address.zipcode})
        </div>
        <div class="detail-item"><strong>Sitio web:</strong> ${user.website}</div>
    `).slideDown();
    
    console.log('👤 Detalles usuario:', {
        id: user.id,
        name: user.name,
        phone: user.phone,
        address: `${user.address.street}, ${user.address.city}`
    });
};

// Mostrar mensaje de error
const showError = (msg) => {
    $('#loadingMessage').hide();
    $('#errorMessage').text(msg).show();
    console.error('msg);
};