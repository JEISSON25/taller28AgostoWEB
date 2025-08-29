const cargarUsuarios=()=> {
    $.ajax({
        url: 'https://jsonplaceholder.typicode.com/users',
        method: 'GET',
        success: function(data) {
            console.log(data);
        }
    });
}


const buscar=()=>{
let nombre = $('#filtroNombre').val();
console.log(nombre);
}

const Usuario=(nombre)=>{
let nombre = $('#Usuarios').val("nombre'");
console.log(nombre);
}
    