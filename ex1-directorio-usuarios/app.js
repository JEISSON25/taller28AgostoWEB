$(document).ready(() => {

    var URL = "https://jsonplaceholder.typicode.com/users/"

    var users = null
    $.ajax({
        type: "GET",
        url: URL,
        dataType: "json",
        error: (data) => {
            console.log("Hubo un error" + data);
        },
        success: (data) => {
            console.log(data);
            users = data
        },
    })

    $("#filter").on("submit", (e) => {
        e.preventDefault()
        var name = $("#name").val()
        if (!name) {
            alert("Debes digitar el nombre para filtrar")
            return
        }
        console.log(users);
        [user] = users.filter(user => user.name == name)

        if (!user) {
            console.log("Usuario no encontrado");
            return
        }

        console.log(user);
    })

    $("#clean").on("click", (e) => {
        $("#name").value = ""

    })

})