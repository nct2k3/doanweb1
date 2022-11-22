const btnCart = document.querySelector(".ti-shopping-cart");
const interfaceCart = document.querySelector(".InterfaceCart");
btnCart.addEventListener("click", () => {
    interfaceCart.classList.toggle("open");
})

var listT;
var User = JSON.parse(localStorage.getItem("currentUser"));
var nameUser, passUser;
if(User != null){
    nameUser = User.name;
    passUser = User.pass;
}

function renderProduct(image, name, price){
    let cartChild = document.createElement("div");
    cartChild.classList.add("productItem");
    cartChild.innerHTML =   `<div class="imageProduct" onclick="focusInform(this)">
                            <img src= ${image} alt="">
                            </div>
                            <div class="InformProduct" onclick="focusInform(this)">
                            <h4 class="name">${name}</h4>
                            <span class="price">${price}$</span>
                            </div>
                            <div class="btn" onclick="getInformProduct(this)">
                            <button>
                            <ti class="ti-shopping-cart-full"></ti>
                            </button>
                            <div class="mess-btn">
                            <span>Thêm vào giỏ</span>
                            </div>
                            </div>`
    document.getElementById("subProduct").append(cartChild);
}
randomShow();
function randomShow(){
    listProduct = JSON.parse(localStorage.getItem("listProduct"));
    var similarO = Math.floor(Math.random() * 12);
    if(listProduct != null)
    for(var i = 0; i < 4; i++){
        var image = listProduct[similarO+i].image;
        var name = listProduct[similarO+i].name;
        var price = listProduct[similarO+i].price;
        renderProduct(image, name, price);
    }
}
renderInform();
function renderInform(){
    listT = JSON.parse(localStorage.getItem("listT"));
    listProduct = JSON.parse(localStorage.getItem("listProduct"));
    var image = listT[0].image;
    var name = listT[0].name;
    var price = listT[0].price;
    var title;
    if(listProduct != null)
    for(var i = 0; i < listProduct.length; i++){
        priceTmp = listProduct[i].price + "$";
        if(name == listProduct[i].name && price == priceTmp){
            title = listProduct[i].title;
        }
    }
    var parentCart = document.querySelector("#parentItem");
    var childCart = document.createElement("div");
    childCart.classList.add("mainProduct");
    childCart.innerHTML = `<div class="mainProduct__image">
                                    <img src=${image} alt="">
                                </div>
                                <div class="mainProduct__subContent">
                                    <div class="mainProduct__subContent--name">
                                        <h2>${name}</h2>
                                    </div>
                                    <div class="mainProduct__subContent--price">
                                        <span>${price}</span>
                                    </div>
                                    <div class="title">
                                        <h4>${title}</h4>
                                    </div>
                                    <div class="mainProduct__subContent--btn">
                                        <div class="amount--minus--plus">
                                            <ti class="ti-minus" onclick="minusAmountProduct(this)"></ti>
                                            <span class="amount">1</span>
                                            <ti class="ti-plus" onclick="plusAmountProduct(this)"></ti>
                                        </div>
                                        <button class="addCart" onclick="getInformMainProduct(this)">
                                            Thêm vào giỏ hàng
                                        </button>
                                    </div>
                                </div>`
    parentCart.append(childCart);
}
function getInformMainProduct(e){
    if(User == null){
        window.location = "http://127.0.0.1:5500/login.html";
        return;
    }
    var parentBtn = e.parentElement.parentElement.parentElement;
    var image = parentBtn.querySelector(".mainProduct__image img").src;
    var name = parentBtn.querySelector(".mainProduct__subContent--name h2").innerText;
    var price = parentBtn.querySelector(".mainProduct__subContent--price span").innerText;
    var amount = parentBtn.querySelector(".amount").innerText;
    addProduct(image, name, price, amount);
}
function getInformProduct(e){
    if(User == null){
        window.location = "http://127.0.0.1:5500/login.html";
        return;
    }
    var parentBtn = e.parentElement;
    var image = parentBtn.querySelector(".imageProduct img").src;
    var name = parentBtn.querySelector(".InformProduct .name").innerText;
    var price = parentBtn.querySelector(".InformProduct .price").innerText;
    addProduct(image, name, price, 1);
}
// add product to cart
function addProduct(image, name, price, amount){
    var mark = 0;
    const productAddeds = document.querySelectorAll(".InterfaceCart table tr");
    productAddeds.forEach(product => {
        var namelast = product.querySelector(".name").innerText;
        var pricelast = product.querySelector(".price").innerText;
        var imagelast = product.querySelector("img").src;
        if(name == namelast && price == pricelast && image == imagelast){
            var e = product.querySelector(".ti-plus");
            if(amount == 1){
                plusAmountProduct(e, 1);
            }else{
                parentE = e.parentElement;
                var amountTxt = parentE.querySelector(".amount");
                var nowAmount = amountTxt.innerText;
                var newAmount = Number(nowAmount) + Number(amount);
                amountTxt.innerText = Number(newAmount);
                saveLocal();
            }
            mark = 1;
        }
    })
    if(mark == 1){
        return;
    }
    let childCart = document.createElement("tr");
    childCart.innerHTML = `<td class="image">
                            <img src=${image} alt="">
                        </td>
                        <td class="inform--amount">
                            <h4 class="name">${name}</h4>
                            <span class="price">${price}</span>
                            <ti class="ti-minus" onclick="minusAmountProduct(this)"></ti>
                            <span class="amount">${amount}</span>
                            <ti class="ti-plus" onclick="plusAmountProduct(this)"></ti>
                        </td>
                        <td>
                            <ti class="ti-trash" onclick="deleteProduct(this)"></ti>
                        </td>`
    document.querySelector(".InterfaceCart table").append(childCart);
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
    saveLocal();
}
function plusAmountProduct(e){
    parentE = e.parentElement;
    var amount = parentE.querySelector(".amount");
    var nowAmount = amount.innerText;
    var newAmount = Number(nowAmount) + Number(1);
    amount.innerText = Number(newAmount);
    saveLocal();
}
function deleteProduct(e){
    parentE = e.parentElement.parentElement;
    parentE.remove();
    saveLocal();
}
function saveLocal(){
    const parentEs = document.querySelectorAll(".InterfaceCart table tr");
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
    parentEs.forEach(parentE => {
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
    })
    localStorage.setItem("InformUser", JSON.stringify(listProductCart));
}
function uploadCartOfUser(){
    var productOnCart = JSON.parse(localStorage.getItem("InformUser"));
    if(productOnCart != null){
        for(var i = 0; i < productOnCart.length; i++){
            if(nameUser == productOnCart[i].nameuser && passUser == productOnCart[i].passuser){
                addProduct(productOnCart[i].imageproduct, productOnCart[i].nameproduct, productOnCart[i].priceproduct, productOnCart[i].amountproduct);
            }
        }
    }
}
function focusInform(e){
    var parentCart = e.parentElement;
    var image = parentCart.querySelector("img").src;
    var name = parentCart.querySelector(".name").innerText;
    var price = parentCart.querySelector(".price").innerText;
    var listT = [
        {
            image: image,
            name: name,
            price: price

        }
    ]
    localStorage.setItem("listT", JSON.stringify(listT));
    window.location = "http://127.0.0.1:5500/focusInform.html";
}
window.onload = function(){
    listProduct = JSON.parse(localStorage.getItem("listProduct"));
    uploadCartOfUser();
}