let baseUrl = "http://localhost:3000/api/"

$.ajax({
    url: `${baseUrl}getTiendas`,
    success: function (response) {
        response.forEach(e => {
            $("#selectTienda").append(`<option value="${e.store_name}">${e.store_name}</option>`);
        });
    }
});
$.ajax({
    url: `${baseUrl}getCategorias`,
    success: function (response) {
        response.forEach(e => {
            $("#selectCategoria").append(`<option value="${e.category_name}">${e.category_name}</option>`);
        });
    }
});
$.ajax({
    url: `${baseUrl}getMarcas`,
    success: function (response) {
        response.forEach(e => {
            $("#selectMarca").append(`<option value="${e.brand_name}">${e.brand_name}</option>`);
        });
    }
});

$.ajax({
    url: `${baseUrl}getDetails`,
    success: function (response) {
        response.forEach(e => {
            $("#table").append(`<tr >
            <td>${e.store_name}</td>
            <td>${e.product_id}</td>
            <td>${e.product_name}</td>
            <td>${e.quantity}</td>
            <td><button type="button" class="btn btn-outline-success">Ver detalles</button></td>
        </tr>`);
        });
    }
});

$("#filtrar").click(function (e) {
    e.preventDefault();
    let tienda = $(selectTienda).val();
    let categoria = $(selectCategoria).val();
    let marca = $(selectMarca).val();
    $.ajax({
        type: "get",
        url: `${baseUrl}getFiltro`,
        data: {
            tienda: tienda,
            categoria: categoria,
            marca: marca
        },
        success: function (response) {
            $("#table").html("");
            response.forEach(e => {
                $("#table").append(`<tr >
                <td>${e.store_name}</td>
                <td>${e.product_id}</td>
                <td>${e.product_name}</td>
                <td>${e.quantity}</td>
                <td><button type="button" class="btn btn-outline-success">Ver detalles</button></td>
            </tr>`);
            });
        }
    });
});