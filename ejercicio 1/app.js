$(async () => {
  const $body = $('body');
  let users = [];
  let filtered = [];

  const renderTable = (data) => {
    $('#usersTable').remove();
    const $table = $(`
      <table id="usersTable" border="1">
        <thead>
          <tr>
            <th>nombre</th>
            <th>email</th>
            <th>empresa</th>
          </tr>
        </thead>
        <tbody></tbody>
      </table>
    `);
    data.forEach((u, i) => {
      $table.find('tbody').append(`
        <tr data-index="${i}">
          <td>${u.name}</td>
          <td>${u.email}</td>
          <td>${u.company.name}</td>
        </tr>
      `);
    });
    $body.append($table);
  };


  $body.prepend('<input type="text" id="filterInput" placeholder="F">');


  const showDetail = (user) => {
    $('#userDetail').remove();
    const $detail = $(`
      <div id="userDetail" style="border:1px solid #333; padding:10px; margin:10px 0;">
        <strong>Teléfono:</strong> ${user.phone}<br>
        <strong>Dirección:</strong> ${user.address.street}, ${user.address.city}
        <br><button id="closeDetail">Cerrar</button>
      </div>
    `);
    $body.append($detail);
    $('#closeDetail').on('click', () => $('#userDetail').remove());
    console.log('Detalle usuario:', {
      nombre: user.name,
      telefono: user.phone,
      direccion: `${user.address.street}, ${user.address.city}`
    });
  };

  
  try {
    const res = await axios.get('https://jsonplaceholder.typicode.com/users');
    users = res.data;
    filtered = users;
    renderTable(users);
    console.log(`ssuarios cargados: ${users.length}`);
    console.log('', {
      nombre: users[0].name,
      email: users[0].email,
      empresa: users[0].company.name
    });
  } catch (err) {
    console.error('Error cargando usuarios', err);
  }

  $body.on('click', '#usersTable tbody tr', (e) => {
    const idx = $(e.currentTarget).index();
    const user = filtered[idx];
    showDetail(user);
  });

    $('#filterInput').on('input', (e) => {
    const term = e.target.value.toLowerCase();
    filtered = users.filter(u => u.name.toLowerCase().includes(term));
    renderTable(filtered);
    console.log(`Filtro: "${term}", coincidencias: ${filtered.length}`);
  });
});