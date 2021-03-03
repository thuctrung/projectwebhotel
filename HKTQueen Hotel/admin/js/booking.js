// var product=[
//     {
//         id: "1",
//         name: "Ngoc Hau",
//         mobile: "0943 713 559",
//         email: "ndnh@gmail.com",
//         arrive: "2020-11-29T18:10:16.559Z",
//         depart: "2021-01-26T23:20:12.185Z",
//         roomtype: "Presidential Room",
//         img: "./image/r1.jpg",
//         status: "Paid",
//         price: "$1.200",
//         arivedate: "1/30/2021",
//         departdate: "2/8/2021"
//       },
//       {
//         id: "2",
//         name: "Dinh Kha",
//         mobile: "0943 713 569",
//         email: "ndk@gmail.com",
//         arrive: "2020-02-16T21:23:27.184Z",
//         depart: "2021-01-27T05:33:23.775Z",
//         roomtype: "Presidential Room",
//         img: "./image/r2.jpg",
//         status: "Unpaid",
//         price: "$2.300",
//         arivedate: "1/28/2021",
//         departdate: "2/6/2021"
//       },
//       {
//         id: "3",
//         name: "Thuc Trung",
//         mobile: "0943 713 557",
//         email: "ndnh@gmail.com",
//         arrive: "2020-03-06T22:35:28.370Z",
//         depart: "2021-01-26T20:28:45.416Z",
//         roomtype: "Presidential Room",
//         img: "./image/r3.jpg",
//         status: "Paid",
//         price: "$2.500",
//         arivedate: "1/30/2021",
//         departdate: "2/3/2021"
//       },



// ];
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

function Save() {
    localStorage.setItem('listProduct', JSON.stringify(product));
}


function load() {
    for (var i in product)
        callAPI("Booking", "POST", product[i]).then((response) => {});
}

function push_data() {
    var add = {
        name: document.getElementById("name").value,
        mobile: document.getElementById("mobile").value,
        email: document.getElementById("email").value,
        arivedate: document.getElementById("arive").value,
        departdate: document.getElementById("depart").value,
        roomtype: document.getElementById("roomtype").value,
        img: document.getElementById("img").value,
        price: document.getElementById("price").value,
        status: document.getElementById("status").value,
    }
    callAPI("Booking", "POST", add).then((response) => {
        alert("Thêm đặt phòng thành công!");
    });
}

function productAdmin() {
    var listproduct1 = "";
    var listproduct2 = "";
    callAPI("Booking", "GET", null).then((res) => {

        var product = res.data;
        for (var i in product) {
            var listproduct1 = '<tr>';
            listproduct1 += '<td>' + product[i].id + '</td>';
            listproduct1 += '<td>' + product[i].name + '</td>';
            listproduct1 += '<td>' + product[i].mobile + '</td>';
            listproduct1 += '<td>' + product[i].email + '</td>';
            listproduct1 += '<td>' + product[i].arrive + '</td>';
            listproduct1 += '<td>' + product[i].depart + '</td>';
            listproduct1 += '<td>' + product[i].roomtype + '</td>';
            listproduct1 += '<td><img style="width:100px" src="' + product[i].img + '" alt=""></td>';
            listproduct1 += '<td>' + product[i].price + '</td>';
            listproduct1 += '<td>' + product[i].status + '</td>';
            listproduct1 += '<td><button onclick="editsp(' + product[i].id + ')" class="btn btn-outline-danger" data-toggle="modal" data-target="#updateProduct">  <i class="fas fa-cogs" placeholder="Edit booking"></i></button>';
            listproduct1 += '<button onclick="deletesp(' + product[i].id + ')" class="btn ml-1 btn-outline-warning"><i class="fas fa-trash" al></i></button></td>';
            listproduct1 += '</tr>';
            document.getElementById("product-admin").innerHTML += listproduct1;
        }
    });

}

function deletesp(id) {
    var r = confirm("Bạn có chắc muốn xoá sản phẩm?");
    if (r === true) {
        callAPI(`Booking/${id}`, "DELETE", null).then((response) => {
            alert("Xoá thành công!");
            location.reload();
        });
    } else
        location.reload();
}

function editsp(id) {
    callAPI(`Booking/${id}`, "GET", null).then((res) => {
        var data = res.data;
        document.getElementById("namee").value = data.name,
            document.getElementById("mobilee").value = data.mobile,
            document.getElementById("emaile").value = data.email,
            document.getElementById("arrivee").value = data.arrive,
            document.getElementById("departe").value = data.depart,
            document.getElementById("roomtypee").value = data.roomtype,
            document.getElementById("imagee").value = data.img,
            document.getElementById("pricee").value = data.price,
            document.getElementById("statuse").value = data.status
    });
    document.getElementById('sub').innerHTML = '<button style="margin-top:17px" onclick="editok(' + id + ')" type="button" class="btn btn-secondary">Save changes</button>';
}

function editok(id) {
    var oneProduct = {
        name: document.getElementById("namee").value,
        mobile: document.getElementById("mobilee").value,
        email: document.getElementById("emaile").value,
        arrive: document.getElementById("arrivee").value,
        depart: document.getElementById("departe").value,
        roomtype: document.getElementById("roomtypee").value,
        img: document.getElementById("imagee").value,
        price: document.getElementById("pricee").value,
        status: document.getElementById("statuse").value
    };
    callAPI(`Booking/${id}`, "PUT", oneProduct).then((response) => {
        alert("Cập nhật thành công!");
        location.reload();
    });
}