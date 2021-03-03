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

function load() {
    for (var i in product1)
        callAPI("Room", "POST", product1[i]).then((response) => {

        });

}
function push_data() {
    var add = {
        name: document.getElementById("name").value,
        img: document.getElementById("img").value,
        price: document.getElementById("price").value,
    }
    callAPI("Room", "POST", add).then((response) => {
        alert("Thêm phòng thành công!");
    });

}
function productAdmin() {
    var listproduct1 = "";
    var product1 = "";
    callAPI("Room", "GET", null).then((res) => {
        product1 = res.data;
        console.log(product1)
        for (var i in product1) {
            listproduct1 = '<tr>';
            listproduct1 += '<td>' + product1[i].id + '</td>';
            listproduct1 += '<td>' + product1[i].name + '</td>';
            listproduct1 += '<td><img style="width:100px" src="' + product1[i].img + '" alt=""></td>';
            listproduct1 += '<td>' + product1[i].price + '</td>';
            listproduct1 += '<td><button onclick="editsp(' + product1[i].id + ')" class="btn btn-outline-danger" data-toggle="modal" data-target="#updateProduct">  <i class="fas fa-cogs" placeholder="Edit room"></i></button>';
            listproduct1 += '<button onclick="deletesp(' + product1[i].id + ')" class="btn ml-1 btn-outline-warning"><i class="fas fa-trash" al></i></button></td>';
            listproduct1 += '</tr>';
            document.getElementById("room").innerHTML += listproduct1;
        }
    });

}
function deletesp(id) {
    var r = confirm("Bạn có chắc muốn xoá phòng này không?");
    if (r === true) {
        callAPI(`Room/${id}`, "DELETE", null).then((response) => {
            alert("Xoá thành công!");
            location.reload();
        });
    }
    else
        location.reload();
}
function editsp(id) {
    callAPI(`Room/${id}`, "GET", null).then((res) => {
        var data = res.data;
        console.log(data);
        document.getElementById("idd").value = data.id,
            document.getElementById("named").value = data.name,
            document.getElementById("imgd").value = data.img,
            document.getElementById("priced").value = data.price
    });
    document.getElementById('sub').innerHTML = '<button style="margin-top:17px" onclick="editok(' + id + ')" type="button" class="btn btn-secondary">Save changes</button>';
}
function editok(id) {
    var oneProduct = {
        name: document.getElementById("named").value,
        img: document.getElementById("imgd").value,
        price: document.getElementById("priced").value,

    };
    callAPI(`Room/${id}`, "PUT", oneProduct).then((response) => {
        alert("Cập nhật thành công!");
        location.reload();
    });
}



//Presidential Room
// var product1 = [
    // {

    //         name: "Presidential Room 1 ",
    //         img: "./image/r1.jpg",
    //         price: '$' + 1.2 +'00',
    //     },
    //     {

    //         name: "Presidential Room 2",
    //         img: "./image/r2.jpg",
    //         price: '$' + 2.3 +'00',
    //     },
    //     {

    //         name: "Presidential Room 3",
    //         img: "./image/r3.jpg",
    //         price: '$' + 2.5 +'00',
    //     },
    //     {

    //         name: "Presidential Room 4",
    //         img: "./image/r4.jpg",
    //         price: '$' + 3.5 +'00',
    //     },
    //     {

    //         name: "Presidential Room 5",
    //         img: "./image/r5.jpg",
    //         price: '$' + 4.5 +'00',
    //     },
    //     {

    //         name: "Presidential Room 6",
    //         img: "./image/r6.jpg",
    //         price: '$' + 5.5 +'00',
    //     },
    //     {

    //         name: "Presidential Room 7",
    //         img: "./image/r7.jpg",
    //         price: '$' + 6.1 +'00',
    //     },
    //     {

    //         name: "Presidential Room 8",
    //         img: "./image/r8.jpg",
    //         price: '$' + 8.7 +'00',
    //     },
    //     {

    //         name: "Deluxe Room 1 ",
    //         img: "./image/p1.jpg",
    //         price: '$' + 1.0 +'00',
    //     },
    //     {

    //         name: "Deluxe Room 2",
    //         img: "./image/p2.jpg",
    //         price: '$' + 8 +'00',
    //     },
    //     {

    //         name: "Deluxe Room 3",
    //         img: "./image/p3.jpg",
    //         price: '$' + 7 +'00',
    //     },
    //     {

    //         name: "Deluxe Room 4",
    //         img: "./image/p4.jpg",
    //         price: '$' + 5 +'00',
    //     },
    //     {

    //         name: "Deluxe Room 5",
    //         img: "./image/p5.jpg",
    //         price: '$' + 3 +'00',
    //     },
    //     {

    //         name: "Deluxe Room 6",
    //         img: "./image/p6.jpg",
    //         price: '$' + 2 +'50',
    //     },
    //     {

    //         name: "Deluxe Room 7",
    //         img: "./image/p7.jpg",
    //         price: '$' + 2 +'70',
    //     },
    //     {

    //         name: "Deluxe Room 8",
    //         img: "./image/p8.jpg",
    //         price: '$' + 2 +'75',
    //     },
    //     {

    //         name: "Superior Room 1 ",
    //         img: "./image/room1.jpg",
    //         price: '$' + 5 +'00',
    //     },
    //     {

    //         name: "Superior Room 2",
    //         img: "./image/room2.jpg",
    //         price: '$' + 2 +'00',
    //     },
    //     {

    //         name: "Superior Room 3",
    //         img: "./image/room3.jpg",
    //         price: '$' + 2 +'10',
    //     },
    //     {

    //         name: "Superior Room 4",
    //         img: "./image/room4.jpg",
    //         price: '$' + 2 +'55',
    //     },
    //     {

    //         name: "Superior Room 5",
    //         img: "./image/room5.jpg",
    //         price: '$' + 2 +'75',
    //     },
    //     {

    //         name: "Superior Room 6",
    //         img: "./image/room6.jpg",
    //         price: '$' + 3 +'70',
    //     },
    //     {

    //         name: "Superior Room 7",
    //         img: "./image/room7.jpg",
    //         price: '$' + 4 +'50',
    //     },
    //     {

    //         name: "Superior Room 8",
    //         img: "./image/room8.jpg",
    //         price: '$' + 9 +'00',
    //     },
    //     {

    //         name: "Standard Room 1 ",
    //         img: "./image/picture1.jpg",
    //         price: '$' + 1 +'80',
    //     },
    //     {

    //         name: "Standard Room 2",
    //         img: "./image/picture2.jpg",
    //         price: '$' + 3 +'50',
    //     },
    //     {

    //         name: "Standard Room 3",
    //         img: "./image/picture3.jpg",
    //         price: '$' + 7+'70',
    //     },
    //     {

    //         name: "Standard Room 4",
    //         img: "./image/picture4.jpg",
    //         price: '$' + 8 +'10',
    //     },
    //     {

    //         name: "Standard Room 5",
    //         img: "./image/picture5.jpg",
    //         price: '$' + 3 +'90',
    //     },
    //     {

    //         name": "Standard Room 6",
    //         img: "./image/picture6.jpg",
    //         price: '$' + 8 +'15',
    //     },
    //     {

    //         name: "Standard Room 7",
    //         img: "./image/picture7.jpg",
    //         price: '$' + 3 +'85',
    //     },
    //     {

    //         name: "Standard Room 8",
    //         img: "./image/picture8.jpg",
    //         price: '$' + 9 +'00',
    //     }
    // ];

