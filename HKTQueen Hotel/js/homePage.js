const API_URL = "https://600b2e2738fd25001702c6c5.mockapi.io/hktq";

var users = [

];

function callAPI(endpoint, method, body) {
    return axios({
        method: method,
        url: `${API_URL}/${endpoint}`,
        data: body,
    }).catch((err) => {
        console.log(err);
    });
}

// function saveAPI() {
//     for (var i in users)
//         callAPI("users", "POST", users[i]).then((res) => {});
// }

function signUp() {
    var name = document.getElementById("fullname").value;
    var email = document.getElementById("emailSU").value;
    var pass = document.getElementById("passwordSU").value;
    var repass = document.getElementById("repasswordSU").value;
    if (name && email && pass && repass != null) {
        if (pass == repass) {
            var user = {
                fullname: name,
                email: email,
                pass: pass,
                role: 'user',
                cart: [],
                status: true
            }
            callAPI('users', 'POST', user);
        } else {
            alert("Password is incorrect!");
        }
    }
}
// var idUser = -1;

function loadUsers() {
    users = [];
    callAPI("users", "GET", null).then((res) => {
        users = res.data;
    });
}

var userLocal = [];

function signIn() {
    var email = document.getElementById("email").value;
    var pass = document.getElementById("password").value;
    var check;
    users = [];
    callAPI("users", "GET", null).then((res) => {
        users = res.data;
        for (var i in users) {
            // console.log(users);
            if (users[i].pass == pass && users[i].email == email) {
                alert("Sign in successfully!");
                // idUser = users[i].id;
                users[i].status = true;
                callAPI(`users/${users[i].id}`, "PUT", users[i]);
                check = true;
                userLocal = users[i];
                localStorage.setItem('userLocal', JSON.stringify(userLocal));
                checkSignIn();
                location.href = "index.html";
            }
        }
        if (!check) {
            alert("Email or password is incorrect!");
        }
    })
}

function checkSignIn() {
    userLocal = JSON.parse(localStorage.getItem('userLocal'));
    // console.log(userLocal);
    if ('userLocal' in localStorage) {
        if (userLocal.status) {
            // console.log(123)
            document.getElementById('signin').style.display = 'none';
            document.getElementById('signup').style.display = 'none';
            document.getElementById('userDropdown').style.display = 'block';
        }
        if (userLocal.role == "admin") {
            document.getElementById('admin').style.display = 'block';
        }
    }
}

function logout() {
    users = [];
    userLocal = JSON.parse(localStorage.getItem("userLocal"));
    callAPI(`users/${userLocal.id}`, "GET", null).then((res) => {
        users = res.data;
        console.log(users);
        users.status = false;
        callAPI(`users/${users.id}`, "PUT", users);
        localStorage.removeItem("userLocal");
        document.getElementById('signin').style.display = 'block';
        document.getElementById('signup').style.display = 'block';
        document.getElementById('userDropdown').style.display = 'none';
        if (users.role == 'admin') {
            document.getElementById('admin').style.display = 'none';
        }
        location.href = "signin.html";
        // location.reload();
    });
}

// loadUsers();

// function checkSignIn() {
//     loadUsers();
//     if ()
// }

// var content;

// function sendEmail() {
//     // var title = "Mã xác nhận"
//     //var content = document.getElementById('content').value
//     content = TaoSoNgauNhien(100000, 999999);
//     var email = document.getElementById('emailSU').value

//     Email.send({
//         Host: "smtp.gmail.com",
//         Username: "hktqueenhotel@gmail.com",
//         Password: "ocdhctiojcopzgop",
//         To: email,
//         From: "hktqueen@gmail.com",
//         Subject: "Mã xác nhận",
//         Body: content + "-This is your account verification code. Thank you to HKTQueen Hotel!<br><br>Best regards,<br>HKTQueen Hotel"
//     }).then(
//         message => console.log('data ', message)
//     );

//     function TaoSoNgauNhien(min, max) {
//         return Math.floor(Math.random() * (max - min)) + min;
//     }
//     signup();

// }
// var code;

// function signup() {
//     code = prompt("Nhập mã xác nhận của bạn:", );
//     xacnhan();
// }

// function xacnhan() {
//     if (content == code) {
//         alert('Bạn đã đăng ký thành công!');
//     } else {
//         alert('Bạn đăng kí không thành công.Vui lòng nhập lại!');
//         signup();
//     }
// }

// // /=================================================
// // var checkLogIn = false;

// // function signIn() {
// //     var mail = document.getElementById("email").value;
// //     var password = document.getElementById("password").value;
// //     loadUser();
// //     saveUser();
// //     for (var i in user) {
// //         if (mail == user[i].email && password == user[i].pass) {
// //             console.log(mail + password)
// //             alert("sign success");
// //             checkLogIn = true;
// //             afterSignIn();
// //             break;
// //         }
// //     }
// //     if (!checkLogIn) {
// //         alert("Email or password incorrect!");
// //         return checkLogIn;
// //     }
// //     return checkLogIn;
// // }


var rooms = [
    // {
    //     ID: "1",
    //     name: "Deluxe 1",
    //     img: "room6.jpg",
    //     descript: "30m2 - King / Twin x 1 - Garden view - Bathroom x 1 - Non-smoking",
    //     free: "Cable/Satellite TV <br> Wireless Internet <br> Air conditioned <br> Daily Room Service <br> Room Safe",
    //     perNight: "1 night, 2 guests",
    //     price: 1600000
    // },
    // {
    //     ID: "6",
    //     name: "Standard 1",
    //     img: "room7.jpg",
    //     descript: "30m2 - King / Twin x 1 - Garden view - Bathroom x 1 - Non-smoking",
    //     free: "Cable/Satellite TV <br> Wireless Internet <br> Air conditioned <br> Daily Room Service <br> Room Safe",
    //     perNight: "1 night, 2 guests",
    //     price: 1600000
    // },
    // {
    //     ID: "2",
    //     name: "Superior 1",
    //     img: "room8.jpg",
    //     descript: "30m2 - King / Twin x 1 - Garden view - Bathroom x 1 - Non-smoking",
    //     free: "Cable/Satellite TV <br> Wireless Internet <br> Air conditioned <br> Daily Room Service <br> Room Safe",
    //     perNight: "1 night, 2 guests",
    //     price: 1600000
    // },
    // {
    //     ID: "3",
    //     name: "Presidential",
    //     img: "room6.jpg",
    //     descript: "30m2 - King / Twin x 1 - Garden view - Bathroom x 1 - Non-smoking",
    //     free: "Cable/Satellite TV <br> Wireless Internet <br> Air conditioned <br> Daily Room Service <br> Room Safe",
    //     perNight: "1 night, 2 guests",
    //     price: 1600000
    // },
    // {
    //     ID: "4",
    //     name: "Deluxe 1",
    //     img: "room7.jpg",
    //     descript: "30m2 - King / Twin x 1 - Garden view - Bathroom x 1 - Non-smoking",
    //     free: "Cable/Satellite TV <br> Wireless Internet <br> Air conditioned <br> Daily Room Service <br> Room Safe",
    //     perNight: "1 night, 2 guests",
    //     price: 1600000
    // },
    // {
    //     ID: "5",
    //     name: "Standard 1",
    //     img: "room8.jpg",
    //     descript: "30m2 - King / Twin x 1 - Garden view - Bathroom x 1 - Non-smoking",
    //     free: "Cable/Satellite TV <br> Wireless Internet <br> Air conditioned <br> Daily Room Service <br> Room Safe",
    //     perNight: "1 night, 2 guests",
    //     price: 1600000
    // }
];

function callAPI(endpoint, method, body) {
    return axios({
        method: method,
        url: `${API_URL}/${endpoint}`,
        data: body,
    }).catch((err) => {
        console.log(err);
    });
}

// function saveRooms() {
//     for (var i in rooms) {
//         callAPI("rooms", "POST", rooms[i]);
//     }
// }

// function saveListRoom() {
//     localStorage.setItem('listRoom', JSON.stringify(listRoom));
// }

// function loadListRoom() {
//     listRoom = JSON.parse(localStorage.getItem('listRoom'));
// }

// if (localStorage.getItem('listRoom') != null) {
//     loadListRoom();
// }


// var basket = [];

// function saveBasket() {
//     localStorage.setItem('basket', JSON.stringify(basket));
//     console.log(basket)
// }

// function loadBasket() {
//     basket = JSON.parse(localStorage.getItem('basket'));
// }

// if (localStorage.getItem('basket') != null) {
//     loadBasket();
// }


function showListRoom() {
    var list = '';
    // loadListRoom();
    rooms = [];
    callAPI("rooms", "GET", null).then((res) => {
        rooms = res.data;
        for (var i in rooms) {
            list += '<div class="row">';
            list += '<div class="col-lg-4 thumbnail">';
            list += '<img src="images/Basket/' + rooms[i].img + '" alt="" width="100%"> </div>';
            list += '<div class = "col-lg-8">';
            list += '<h5>' + rooms[i].name + '</h5>';
            list += '<p>' + rooms[i].descript + '<br>' + rooms[i].free + '</p>';
            list += '<p class="priceRoom">' + rooms[i].perNight + '<br>' + rooms[i].price + ' VNĐ' + '</p>';
            list += '<button class = "btn btn-success btn-select" onclick="addToBasket(' + i + ')"> Select </button>';
            list += '</div>';
            list += '</div>';
        }
        document.getElementById('listRooms').innerHTML = list;
        // saveListRoom();
    });
}

function addToBasket(i) {
    rooms = '';
    callAPI("rooms", "GET", null).then((res) => {
        rooms = res.data;
        if ("userLocal" in localStorage) {
            for (var k in rooms) {
                if (i == k) {
                    users = '';
                    callAPI("users", "GET", null).then((res) => {
                        users = res.data;
                        userLocal = JSON.parse(localStorage.getItem('userLocal'));
                        for (var d in users) {
                            if (userLocal.id == users[d].id) {
                                users[d].cart.push({
                                    id: users[d].cart.length + 1,
                                    idRoom: rooms[i].id,
                                    name: rooms[i].name,
                                    night: rooms[i].perNight,
                                    price: rooms[i].price
                                });
                                callAPI(`users/${users[d].id}`, "PUT", users[d]);
                                userLocal = users[d];
                                localStorage.setItem('userLocal', JSON.stringify(userLocal));
                                showBasket();
                            }
                        }
                    });
                }
            }
        } else {
            alert('Please sign in before booking!');
            location.href = 'signin.html';
        }
    });
}

function showBasket() {
    if ('userLocal' in localStorage) {
        userLocal = JSON.parse(localStorage.getItem('userLocal'));
        console.log("acc", userLocal);
        var list = '';
        for (var i in userLocal.cart) {
            list += '<div> <hr>';
            list += '<h6>' + userLocal.cart[i].name + '</h6>';
            list += '<p>' + userLocal.cart[i].night + '<br>' + userLocal.cart[i].price + ' VNĐ' + '<a class = "trash" onclick = "removeBasket(' + i + ')"></a> </p> </div>';
        }
        document.getElementById('roomInBasket').innerHTML = list;
        // location.reload();
    }
    // showBtnBook();
}