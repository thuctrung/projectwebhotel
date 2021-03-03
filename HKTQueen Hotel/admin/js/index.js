var product = [];
const API_URL = "https://600a505b778d1a0017793991.mockapi.io/api";

function callAPI(endpoint, method, body) {
    return axios({
        method: method,
        url: `${API_URL}/${endpoint}`,
        data: body,
    }).catch((err) => {
        console.log(err);
    });
}
productAdmin();

function load() {
    for (var i in product)
        callAPI("Booking", "POST", product[i]).then((response) => {});
}

function productAdmin() {

    var listproduct2 = "";
    callAPI("Booking", "GET", null).then((res) => {

        product = res.data;
        console.log(product);
        for (var i in product) {

            listproduct2 += '<tr>';
            listproduct2 += '<td>' + product[i].name + '</td>';
            listproduct2 += '<td>' + product[i].mobile + '</td>';
            listproduct2 += '<td>' + product[i].email + '</td>';
            listproduct2 += '<td>' + product[i].arrive + '</td>';
            listproduct2 += '<td>' + product[i].depart + '</td>';
            listproduct2 += '<td>' + product[i].roomtype + '</td>';
            listproduct2 += '<td>' + product[i].price + '</td>';
            listproduct2 += '<td>' + product[i].status + '</td>';
            // listproduct2 += '<td><button onclick="editsp(' + product[i].id + ')" class="btn btn-danger" data-toggle="modal" data-target="#updateProduct">  <i class="fas fa-cogs" placeholder="Edit booking"></i></button>';
            // listproduct2 += '<button onclick="deletesp(' + product[i].id + ')" class="btn ml-1 btn-outline-warning"><i class="fas fa-trash" al></i></button></td>';
            listproduct2 += '</tr>';
        }
        document.getElementById('tbl').innerHTML += listproduct2;
    });


}