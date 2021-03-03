const API_URL = "https://600a505b778d1a0017793991.mockapi.io/api";
var user = [{
        name: "Võ Công Đình",
        username: 'congdinh',
        phone: '0123456789',
        email: 'congdinh@gmail.com',
        address: 'Đà Nẵng',
        role: 'admin'
    },
    {
        name: "Nguyễn Đoàn Ngọc Hậu",
        username: 'ngochau',
        phone: '0123456789',
        email: 'ngochau@gmail.com',
        address: 'Quảng Trị',
        role: 'admin'
    }
];

UsersAdmin();

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
    for (var i in user)
        callAPI("Users", "POST", user[i]).then((ress) => {});
}

function push_data() {
    var add = {
        // id: document.getElementById("id").value,
        name: document.getElementById("name").value,
        username: document.getElementById("username").value,
        phone: document.getElementById("phone").value,
        email: document.getElementById("email").value,
        address: document.getElementById("address").value,
        role: document.getElementById("role").value,
    }
    callAPI("Users", "POST", add).then((response) => {
        alert("Thêm user thành công!");
    });
}

function UsersAdmin() {
    var listuser = "";
    user = [];
    callAPI("Users", "GET", null).then((ress) => {
        user = ress.data;
        // console.log(user);
        for (var i in user) {
            listuser = '<tr>';
            listuser += '<td>' + user[i].id + '</td>';
            listuser += '<td>' + user[i].name + '</td>';
            listuser += '<td>' + user[i].username + '</td>';
            listuser += '<td>' + user[i].phone + '</td>';
            listuser += '<td>' + user[i].email + '</td>';
            listuser += '<td>' + user[i].address + '</td>';
            listuser += '<td>' + user[i].role + '</td>';
            listuser += '<td><button onclick="editsp(' + user[i].id + ')" class="btn btn-outline-danger" data-toggle="modal" data-target="#updateProduct">  <i class="fas fa-cogs" placeholder="Edit User"></i></button>';
            listuser += '<button onclick="deletesp(' + user[i].id + ')" class="btn ml-1 btn-outline-warning"><i class="fas fa-trash" al></i></button></td>';
            listuser += '</tr>';
            document.getElementById("user-manager").innerHTML += listuser;
        }
    });
}

function deletesp(id) {
    var r = confirm("Bạn có chắc muốn xoá user này không?");
    if (r === true) {
        callAPI(`Users/${id}`, "DELETE", null).then((response) => {
            alert("Xoá thành công!");
            location.reload();
        });
    } else
        location.reload();
}

function editsp(id) {
    callAPI(`Users/${id}`, "GET", null).then((res) => {
        var data = res.data;
        console.log(data);
        document.getElementById("namee").value = data.name,
            document.getElementById("usernamee").value = data.username,
            document.getElementById("phonee").value = data.phone,
            document.getElementById("emaile").value = data.email,
            document.getElementById("addresse").value = data.address,
            document.getElementById("rolee").value = data.role
    });
    document.getElementById('sub').innerHTML = '<button style="margin-top:17px" onclick="editok(' + id + ')" type="button" class="btn btn-secondary">Save changes</button>';
}

function editok(id) {
    var oneProduct = {
        name: document.getElementById("namee").value,
        username: document.getElementById("usernamee").value,
        phone: document.getElementById("phonee").value,
        email: document.getElementById("emaile").value,
        address: document.getElementById("addresse").value,
        role: document.getElementById("rolee").value,

    };
    callAPI(`Users/${id}`, "PUT", oneProduct).then((response) => {
        alert("Cập nhật thành công!");
        location.reload();
    });
}


// LOCAL STROGARE


// function save() {
//     localStorage.setItem('listUser', JSON.stringify(user))
// }

// function load() {
//     user = JSON.parse(localStorage.getItem('listUser'))
// }

// if (localStorage.getItem('listUser') != null) {
//     load();
// }

// function updateUser(i) {
//     var d = user[i];
//     document.getElementById("id").value = d.id;
//     document.getElementById("named").value = d.name;
//     document.getElementById("usernamed").value = d.username;
//     document.getElementById("phoned").value = d.phone;
//     document.getElementById("emaild").value = d.email;
//     document.getElementById("addressd").value = d.address;
//     document.getElementById("roled").value = d.role;
// }

// function submitUpdate() {
//     var id = document.getElementById("id").value;
//     for (var i in user)
//         if (id == user[i].id) {
//             var d = user[i];
//             user[i].name = document.getElementById("named").value;
//             user[i].username = document.getElementById("usernamed").value;
//             user[i].phone = document.getElementById("phoned").value;
//             user[i].email = document.getElementById("emaild").value;
//             user[i].address = document.getElementById("addressd").value;
//             user[i].role = $("#roled").find(":selected").val();
//             localStorage.setItem('listUser', JSON.stringify(user));
//             window.location.reload();
//             break;
//         }
// }

// function deleteUser(i) {
//     document.getElementById("idDelete").innerHTML = user[i].id;
// }

// function submitDelete() {
//     var id = document.getElementById("idDelete").innerHTML;
//     for (var i in user) {
//         var d = JSON.parse(JSON.stringify(user[i]))
//         if (id == d.id) {
//             load();
//             user.splice(i, 1);
//             save();
//             window.location.reload();
//         }
//     }
// }

// function show() {
//     var listUSer = '';
//     for (i in user) {
//         var data = JSON.parse(JSON.stringify(user[i]))
//         listUSer += "<tr>";
//         listUSer += "<td>" + data.id + "</td>";
//         listUSer += "<td>" + data.username + "</td>";
//         listUSer += "<td>" + data.name + "</td>";
//         listUSer += "<td>" + data.phone + "</td>";
//         listUSer += "<td>" + data.email + "</td>";
//         listUSer += "<td>" + data.address + "</td>";
//         listUSer += "<td>" + data.role + "</td>";
//         listUSer += "<td>" + '<button class = "btn btn-danger" data-toggle = "modal"data-target = "#updateUser" onclick="updateUser(' + i + ')">';
//         listUSer += '<a href="#"> <i class="fa fa-cogs"> </i> </a>' + '</button>';
//         listUSer += '<button class = "btn btn-warning" data-toggle = "modal" data-target="#deleteUser" onclick="deleteUser(' + i + ')"> <a href="#"> <i class="fa fa-trash"> </i>  </a> </button>' + "</td>";
//         listUSer += "</tr>";
//     }
//     document.getElementById("user-manager").innerHTML = listUSer;
//     save();
// }

// function addUser() {
//     var pro = {
//         id: "User-" + parseInt(user.length + 1),
//         name: document.getElementById('name').value,
//         username: document.getElementById('username').value,
//         phone: document.getElementById('phone').value,
//         email: document.getElementById('email').value,
//         address: document.getElementById('address').value,
//         role: $("#role").find(":selected").val()
//     }
//     load();
//     user.push(pro);
//     save();
//     window.location.reload();
// }





// function push_data(){
//     var add = {
//         name: document.getElementById('name').value,
//         username: document.getElementById('username').value,
//         phone: document.getElementById('phone').value,
//         email: document.getElementById('email').value,
//         address: document.getElementById('address').value,
//         role: $("#role").find(":selected").value,
//     }
//     callAPI("Usres", "POST", add).then((response) => {  
//         alert("Thêm user thành công!");
//         });
//         userAdmin();
//         location.reload();
// }
// function userAdmin() {
//     var listuser1 = "";
//     for (var i in user) {
//         var listuser1 = '<tr>';
//         listuser1 += '<td>' + user[i].id + '</td>';
//         listuser1 += '<td>' + user[i].name + '</td>';
//         listuser1 += '<td>' + user[i].username + '</td>';
//         listuser1 += '<td>' + user[i].phone + '</td>';
//         listuser1 += '<td>' + user[i].email + '</td>';
//         listuser1 += '<td>' + user[i].address + '</td>';
//         listuser1 += '<td>' + user[i].role + '</td>';
//         listuser1 += '<td><button onclick="editsp(' + user[i].id + ')" class="btn btn-outline-danger" data-toggle="modal" data-target="#updateProduct">  <i class="fas fa-cogs" placeholder="Edit booking"></i></button>';
//         listuser1 += '<button onclick="deletesp(' + user[i].id+ ')" class="btn ml-1 btn-outline-warning"><i class="fas fa-trash" al></i></button></td>';
//         listuser1 += '</tr>';
//         document.getElementById("user-manager").innerHTML += listuser1;
//     }
// }
// function deletesp(id) {
//     var r = confirm("Bạn có chắc muốn xoá user?");
//     if (r === true) {
//     callAPI(`Users/${id}`, "DELETE", null).then((response) => {
//     alert("Xoá thành công!");
//     location.reload();
//     });
//     }
//     else
//     location.reload();
// }
// function editsp(id) {
//     callAPI(`Users/${id}`, "GET", null).then((res) => {
//         var data=res.data;
//     console.log(data);
//     document.getElementById('ide').value,
//     document.getElementById('namee').value,
//     document.getElementById('usernamee').value,
//     document.getElementById('phonee').value,
//     document.getElementById('emaile').value,
//     document.getElementById('addresse').value,
//     $("#rolee").find(":selected").value
//     });
//     document.getElementById('sub').innerHTML ='<button style="margin-top:17px" onclick="editok('+id+')" type="button" class="btn btn-secondary">Save changes</button>';
//     }
// function editok(id){
//      var oneProduct = {
//         name: document.getElementById('namee').value,
//         username: document.getElementById('usernamee').value,
//         phone: document.getElementById('phonee').value,
//         email: document.getElementById('emaile').value,
//         address: document.getElementById('addresse').value,
//         role: $("#rolee").find(":selected").value,

//         };
//         callAPI(`Users/${id}`, "PUT", oneProduct).then((response) => {
//             alert("Cập nhật thành công!");
//             location.reload();
//             });
//     }