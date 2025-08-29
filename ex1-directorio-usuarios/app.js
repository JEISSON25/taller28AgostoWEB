const url = "https://jsonplaceholder.typicode.com/users";

$(document).ready(() => {

    $.ajax({
        type: "GET",
        url: url,
        success: (response) => {

            response.forEach(({ name, email, company }) => {
                console.log(`Nombre: ${name}, Email: ${email}, Compañia: ${company.name}`)
            })

        }
    })

})