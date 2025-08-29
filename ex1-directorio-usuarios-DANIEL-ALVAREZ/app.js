fetch('https://jsonplaceholder.typicode.com/users')
    .then(response => response.json())
    .then(data => {
        const userTableBody = document.getElementById('user-table-body');
        console.log(data);
        data.forEach(user => {
            const row = document.createElement('tr');

            row.onclick = function() {
                console.log(`Usuario seleccionado Telefono: ${user.phone} Direccion: ${user.address.city}`);
                window.alert(`Telefono: ${user.phone} Direccion: ${user.address.city}`);
            };

            row.id = user.name.toLowerCase();
            row.innerHTML = `
                <td>${user.id}</td>
                <td>${user.name}</td>
                <td>${user.email}</td>
            `;
            userTableBody.appendChild(row);
        });
    })
    .catch(error => console.error('Fallo el fetch:', error));
