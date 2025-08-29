$(document).ready(async () => {
    // 1. Cargar usuarios con Axios usando async/await
    const { data: users } = await axios.get('https://jsonplaceholder.typicode.com/users');
    console.log(`Usuarios cargados: ${users.length}`);
    console.log('Primera fila:', users[0]);

    // 2. Renderizar tabla con jQuery
    const renderTable = (userList) => {
        const rows = userList.map(u => `
            <tr class="user-row" data-id="${u.id}">
                <td>${u.name}</td>
                <td>${u.email}</td>
                <td>${u.company.name}</td>
            </tr>
        `).join('');
        $('#userTable tbody').html(rows);
    };

    // Crear tabla básica
    $('#app').html(`
        <input type="text" id="filter" placeholder="Filtrar por nombre..." />
        <table id="userTable" border="1">
            <thead>
                <tr><th>Nombre</th><th>Email</th><th>Empresa</th></tr>
            </thead>
            <tbody></tbody>
        </table>
        <div id="detail"></div>
    `);

    renderTable(users);

    // 3. Filtro en vivo por nombre
    $('#filter').on('input', (e) => {
        const term = e.target.value.toLowerCase();
        const filtered = users.filter(u => u.name.toLowerCase().includes(term));
        renderTable(filtered);
        console.log(`Filtro: "${term}", coincidencias: ${filtered.length}`);
    });

    // 4. Mostrar detalle al hacer clic
    $('#userTable').on('click', '.user-row', (e) => {
        const id = $(e.currentTarget).data('id');
        const user = users.find(u => u.id === id);
        $('#detail').html(`
            <h3>Detalle de usuario</h3>
            <p><strong>Teléfono:</strong> ${user.phone}</p>
            <p><strong>Dirección:</strong> ${user.address.street}, ${user.address.city}</p>
        `);
        console.log('Detalle usuario:', user);
    });
});