// var inputImage = document.querySelector("#inputImage");
// var imageLink = "";
// inputImage.addEventListener('change', function(){
//     var inputImag = document.querySelector("#inputImage").value;
//     var reader = new FileReader();
//     reader.readAsDataURL(this.files[0]);
//     var nameImg ="image/" + this.files[0].name;
// })
function openSubList(e){
    var parent = e.parentElement;
    parent.querySelector(".link--sub").classList.toggle("open");
}
function openMenu(){
    document.querySelector(".menuBar__sub").classList.add("open");
}
function closeMenu(){
    document.querySelector(".menuBar__sub").classList.remove("open");
}
function renderUserList(id, gmail, name, pass){
    let childCart = document.createElement("tr");
    childCart.innerHTML = `<tr>
                                <td class="id">${id}</td>
                                <td class="gmailUser">${gmail}</td>
                                <td class="nameUser">${name}</td>
                                <td class="passUser">${pass}</td>
                            </tr>`
    document.querySelector(".container table").append(childCart);
}
function uploadUserList(){
    document.querySelector(".menuBar__sub").classList.remove("open");
    document.querySelector(".container table").innerHTML = "";
    var listUser = JSON.parse(localStorage.getItem("ListUser"));
    if(listUser == null){
        document.querySelector(".nametable").innerHTML = `<h2>HIỆN TẠI CHƯA CÓ NGƯỜI DÙNG NÀO</h2>`;
        return;
    }
    document.querySelector(".nametable").innerHTML = `<h2>BẢNG DANH SÁCH NGƯỜI DÙNG</h2>`;

    let childCart = document.createElement("tr");
    childCart.innerHTML = `<tr>
                                <td class="id">ID</td>
                                <td class="gmailUser">GMAIL</td>
                                <td class="nameUser">NAME</td>
                                <td class="passUser">PASSWORD</td>
                            </tr>`
    document.querySelector(".container table").append(childCart);
    for(var i = 0; i < listUser.length; i++){
        var id = i+1;
        var gmail = listUser[i].email;
        var name = listUser[i].name;
        var pass = listUser[i].pass;
        renderUserList(id, gmail, name, pass);
    }
}
var d = new Date();
console.log(d.getSeconds(), d.getMinutes(), d.getHours(), d.getDate(), Number(d.getMonth()+1), d.getFullYear())
  
function uploadOrderList(){
    var OrderList = JSON.parse(localStorage.getItem("Order"));
    if(OrderList == null){
        document.querySelector(".nametable").innerHTML = `<h2>HIỆN TẠI CHƯA CÓ ĐƠN HÀNG NÀO</h2>`;
        return;
    }
    document.querySelector(".nametable").innerHTML = `<h2>BẢNG DANH SÁCH ĐƠN HÀNG</h2>`;

    
}