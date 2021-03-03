var userInfor = [];

function information() {
    var infor = {
            Name: document.getElementById("name").value,
            Email: document.getElementById("email").value,
            Subject: document.getElementById("subject").value,
            Contact: document.getElementById("message").value,
        }
        // đẩy ar vao mảng tên là user
    userInfor.push(infor);
    // Kiểm tra đã đẩy vào user chưa
    console.log(userInfor);
    // đẩy vào localstorage  , đặt tên cho nó và chuyển sang tất cả dạng stringify trong mảng user
    localStorage.setItem('ListUserInformation', JSON.stringify(userInfor));
    //
    alert("send information is success");
    window.location.href = 'contact.html';
}
//
function Uninformation() {
    var infor = {
            Name: document.getElementById("name").value = '',
            Email: document.getElementById("email").value = '',
            Subject: document.getElementById("subject").value = '',
            Contact: document.getElementById("message").value = '',
        }
        // đẩy ar vao mảng tên là user
    userInfor.push(infor);
    // Kiểm tra đã đẩy vào user chưa
    console.log(userInfor);
    // đẩy vào localstorage  , đặt tên cho nó và chuyển sang tất cả dạng stringify trong mảng user
    localStorage.setItem('ListUserInformation', JSON.stringify(userInfor));
    //
    alert("Unsend information");
    window.location.href = 'contact.html';
}