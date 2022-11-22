var User = JSON.parse(localStorage.getItem("currentUser"));
var nameUser, passUser;
if(User != null){
    nameUser = User.name;
    passUser = User.pass;
}
var listPayment = [];
window.onload = function(){
    var listProductAdded = JSON.parse(localStorage.getItem("InformUser"));
    if(listProductAdded != null){
        for(var i = 0; i < listProductAdded.length; i++){
            if(nameUser == listProductAdded[i].nameuser && passUser == listProductAdded[i].passuser){
                var image = listProductAdded[i].imageproduct;
                var name = listProductAdded[i].nameproduct;
                var price = listProductAdded[i].priceproduct;
                var amount = listProductAdded[i].amountproduct;
                renderPageProductAdded(image, name, price, amount);
            }
        }
    }
}
function renderPageProductAdded(image, name, price, amount){
    var parentCart = document.querySelector(".listProductAdded table");
    var childCart = document.createElement("tr");
    childCart.innerHTML = `<tr>
                                <td>
                                    <input id="checkSelected" onclick="checkSelected()" type="checkbox">
                                </td>
                                <td>
                                    <img class="image" src=${image} alt="">
                                </td>
                                <td>
                                    <h3 class="name">${name}</h3>
                                </td>
                                <td>
                                    <span class="price">${price}</span>
                                </td>
                                <td>
                                    <ti class="ti-minus" onclick="minusAmountProduct(this)"></ti>
                                    <span class="amount">${amount}</span>
                                    <ti class="ti-plus" onclick="plusAmountProduct(this)"></ti>
                                </td>
                                <td>
                                    <ti class="ti-trash" onclick="removeItem(this)"></ti>
                                </td>
                            </tr>`
    parentCart.append(childCart);
}
function checkSelected(){
    updateTotalPayment();
}
function updateTotalPayment(){
    var sum = 0;
    var listCheckBox = document.querySelectorAll("#checkSelected");
    listCheckBox.forEach(e => {
        var parentItem = e.parentElement.parentElement;
        var price = parentItem.querySelector(".price").innerText;
        var price = price.slice(0, -1);
        amount = parentItem.querySelector(".amount").innerText;
        if(e.checked == true){
            sum += price*amount;
        }
    })
    document.getElementById("totalPayment").innerText = sum + "$";
}
function removeItem(e){
    var parentItem = e.parentElement.parentElement;
    parentItem.remove();
    updateTotalPayment();
    saveLocal();
}
function minusAmountProduct(e){
    parentE = e.parentElement;
    var amount = parentE.querySelector(".amount");
    var nowAmount = amount.innerText;
    if(Number(nowAmount) <= 1){
        return;
    }
    var newAmount = Number(nowAmount) - Number(1);
    amount.innerText = newAmount;
    updateTotalPayment();
    saveLocal();
}
function plusAmountProduct(e){
    parentE = e.parentElement;
    var amount = parentE.querySelector(".amount");
    var nowAmount = amount.innerText;
    var newAmount = Number(nowAmount) + Number(1);
    amount.innerText = Number(newAmount);
    updateTotalPayment();
    saveLocal();
}
function saveLocal(){
    const parentEs = document.querySelectorAll(".listProductAdded table tr");
    var nameProduct, imageProduct, priceProduct, amountProduct;
    listProductCart = [];
    var listSaved = JSON.parse(localStorage.getItem("InformUser"));
    if(listSaved != null){
        listSaved.forEach(e => {
            if(e.nameuser != null)
            if(e.nameuser != nameUser || e.passuser != passUser){
                listProductCart.push({
                    nameuser: e.nameuser,
                    passuser: e.passuser,
                    nameproduct:  e.nameproduct,
                    priceproduct: e.priceproduct,
                    imageproduct: e.imageproduct,
                    amountproduct: e.amountproduct
                })
            }
        })
    }
    var mark = 0;
    parentEs.forEach(parentE => {
        if(mark != 0){
            nameProduct = parentE.querySelector(".name").innerText;
            priceProduct = parentE.querySelector(".price").innerText;
            imageProduct = parentE.querySelector("img").src;
            amountProduct = parentE.querySelector(".amount").innerText;
            listProductCart.push({
                nameuser: nameUser,
                passuser: passUser,
                nameproduct:  nameProduct,
                priceproduct: priceProduct,
                imageproduct: imageProduct,
                amountproduct: amountProduct
            })
        }
        mark++;
    })
    localStorage.setItem("InformUser", JSON.stringify(listProductCart));
}
function getConfirmation(){
    listPayment = [];
    var totalPayment = document.getElementById("totalPayment").innerText;
    totalPayment = totalPayment.slice(0, -1);
    if(totalPayment <= 0){
        alert("Bạn chưa chọn sản phẩm");
        return;
    }
    if(User == null){
        window.location = "http://127.0.0.1:5500/login.html";
        return;
    }
    var retVal = confirm("Bạn chắc chắn muốn mua?");
    if( retVal == true ){
        document.getElementById("totalPayment").innerText = "0$";
        var listCheckBox = document.querySelectorAll("#checkSelected");
        var Order = JSON.parse(localStorage.getItem("Order"));
        if(Order != null){
            for(var i = 0; i < Order.length; i++){
                listPayment.push({
                    nameUser: Order[i].nameUser,
                    passUser: Order[i].passUser,
                    imageProduct: Order[i].imageProduct,
                    nameProduct: Order[i].nameProduct,
                    priceProduct: Order[i].priceProduct,
                    amountProduct: Order[i].amountProduct
                })
            }
        }
        listCheckBox.forEach(e => {
            if(e.checked == true){
                var parentItem = e.parentElement.parentElement;
                var image = parentItem.querySelector(".image").src;
                var price = parentItem.querySelector(".price").innerText;
                var name = parentItem.querySelector(".name").innerText;
                amount = parentItem.querySelector(".amount").innerText;
                listPayment.push({
                    nameUser: nameUser,
                    passUser: passUser,
                    imageProduct: image,
                    nameProduct: name,
                    priceProduct: price,
                    amountProduct: amount,
                })
            }
        })
        listCheckBox.forEach(e => {
            e.checked = false;
        })
        localStorage.setItem("Order", JSON.stringify(listPayment));
        return true;
    }
    else{
       return false;
    }
 }