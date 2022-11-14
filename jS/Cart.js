// choose option :default, low-hight, hight-low
function openOption(){
    document.querySelector(".option-close").classList.toggle("open");
}
const option = document.querySelectorAll(".option li");
option.forEach(Element => {
    Element.addEventListener("click", () => {
        document.getElementById("newOption").innerHTML = Element.innerHTML;
        document.querySelector(".option-close").classList.toggle("open");
    })
})
// open interface cart
const btnCart = document.querySelector(".ti-shopping-cart");
const interfaceCart = document.querySelector(".InterfaceCart");
btnCart.addEventListener("click", () => {
    interfaceCart.classList.toggle("open");
})
// open interface filter
const btnFilter = document.querySelector("#btnFilter");
btnFilter.addEventListener("click", () => {
    document.querySelector(".filter .InterfaceFilter").classList.toggle("open");
})
// change border bottom layout Grid and Full
const grid = document.querySelector(".ti-layout-grid4")
const full = document.querySelector(".ti-layout-width-full")
grid.addEventListener("click", () => {
    full.classList.remove("open");
    grid.classList.add("open");
})
full.addEventListener("click", () => {
    grid.classList.remove("open");
    full.classList.add("open");
})
// list product 
var listProduct = [
    {
        image: "image/render1.jpeg",
        name: "Tranmisu",
        price: 300,
        type: "Cake"
    },
    {
        image: "image/render2.webp",
        name: "Cheese Cake",
        price: 260,
        type: "Cake"
    },
    {
        image: "image/render3.webp",
        name: "Milted Chocolate",
        price: 200,
        type: "Cake"
    },
    {
        image: "image/render4.jpeg",
        name: "Cake On White Tray",
        price: 109,
        type: "Cake"
    },
    {
        image: "image/render5.jpeg",
        name: "Blue Cupcakes",
        price: 110,
        type: "Cake"
    },
    {
        image: "image/render1.jpeg",
        name: "Tranmisu",
        price: 300,
        type: "Cake"
    },
    {
        image: "image/render2.webp",
        name: "Cheese Cake",
        price: 260,
        type: "Cake"
    },
    {
        image: "image/render6.webp",
        name: "Chocolate CupcakeS",
        price: 106,
        type: "Cake"
    },
    {
        image: "image/render7.jpeg",
        name: "Brown Cake",
        price: 190,
        type: "Cake"
    },
    {
        image: "image/render8.jpeg",
        name: "Ice Cream Dish",
        price: 103,
        type: "Cake"
    },
    {
        image:  "image/render9.webp",
        name:   "dinosaur egg candy",
        price:  80,
        type: "Candy"
    },
    {
        image:  "image/render10.jpeg",
        name:   "fruits candy",
        price:  100,
        type: "Candy"
    },
    {
        image:  "image/render11.webp",
        name:   "Heart Shaped Candy",
        price:  90,
        type: "Candy"
    },
    {
        image:  "image/render12.webp",
        name:   "organge candy",
        price:  50,
        type: "Candy"
    },
    {
        image:  "image/render13.webp",
        name:   "Pumpkin candy",
        price:  46,
        type: "Candy"
    },
    {
        image:  "image/render14.webp",
        name:   "socola candy",
        price:  30,
        type: "Candy"
    },
    {
        image:  "image/render15.jpeg",
        name:   "apple candy",
        price:  20,
        type: "Candy"
    },
    {
        image:  "image/render11.webp",
        name:   "Heart Shaped Candy",
        price:  90,
        type: "Candy"
    },
    {
        image:  "image/render12.webp",
        name:   "organge candy",
        price:  50,
        type: "Candy"
    },
    {
        image:  "image/render16.webp",
        name:   "soft candy",
        price:  10,
        type: "Candy"
    },
];
var listTmp = [];
var pageNumber = 1, listBtn, btnAdds, typeName ='', pages, regExp = /[a-zA-Z]/g;
var User = JSON.parse(localStorage.getItem("currentUser"));
var nameUser, passUser;
if(User != null){
    nameUser = User.name;
    passUser = User.pass;
}
var typeLayout = 0;
const layoutGrid = document.querySelector(".ti-layout-grid4");
const layoutFull = document.querySelector(".ti-layout-width-full");
layoutGrid.addEventListener("click", () => {
    document.getElementById("searchIp").value = '';
    typeLayout = 0;
})
layoutFull.addEventListener("click", () => {
    document.getElementById("searchIp").value = '';
    typeLayout = 1;
})
// search
function Search(){
    var parentItem = document.getElementById("parentItem");
    parentItem.innerHTML = '';
    var dataSearch = document.getElementById("searchIp").value.trim().toLowerCase();
    for(var i = 0; i < listProduct.length; i++){
        if((listProduct[i].name.toLowerCase()).includes(dataSearch) == true
        || String(listProduct[i].price).includes(dataSearch) == true
        || (listProduct[i].type.toLowerCase()).includes(dataSearch) == true){
            listTmp.push({
                image: listProduct[i].image,
                name: listProduct[i].name,
                price: listProduct[i].price,
                type: listProduct[i].type
            })
            renderProduct(listProduct[i].image, listProduct[i].name, listProduct[i].price);
        }
    }
    if(parentItem.innerHTML == ''){
        parentItem.innerHTML = `<h3 style="margin-top: 200px;">Không tìm thấy kết quả</h3>`
    }
    document.querySelector(".filter").classList.remove("close")
    document.getElementById("pageSales").classList.add("close");
}
// sort low-hight
function sortLowToHight(){
    var list = document.querySelectorAll(".productItem");
    console.log(list)
    listProduct.sort((a, b) => {
        return a.price - b.price;
    })
    pageNumber = 1;
    changeBackGImagebtnList();
}
// sort hight-low
function sortHightToLow(){
    listProduct.sort((a, b) => {
        return b.price - a.price;
    })
    pageNumber = 1;
    changeBackGImagebtnList();
}
// sort of choose user
const btnSort = document.querySelectorAll(".option li");
btnSort.forEach(Element => {
    Element.addEventListener("click", () =>{
        if(Element.innerText === "Low To Hight"){
            sortLowToHight();
            if(typeLayout == 0){
                updateProductOfPageNum(1);
            }else{
                updateProductAll();
            }
        }else if(Element.innerText === "Hight To Low"){
            sortHightToLow();
            if(typeLayout == 0){
                updateProductOfPageNum(1);
            }else{
                updateProductAll();
            }
        }else{
            // sort default
            listProduct = JSON.parse(localStorage.getItem("listProduct"));
            pageNumber = 1;
            changeBackGImagebtnList();
            if(typeLayout == 0){
                updateProductOfPageNum(1);
            }else{
                updateProductAll();
            }
        }
    })
})
// update NumericalOrder page
function NumericalOrder(i){
    let childCart = document.createElement("div");
    childCart.innerHTML = `<h5 class="bcolor-now" onclick="chooseToSwitchPages(this)">${i}</h5>`;
    document.getElementById("ParentNumericalOrder").append(childCart);
}
function updateNumericalOrder(){
    pages = (listProduct.length)/8;
    if(pages > Math.floor(listProduct.length/8)){
        pages += 1;
    }
    pages = Math.floor(pages/1);
    for(var i = 1; i <= pages; i++){
        NumericalOrder(i);    
    }
    document.querySelector(".numericalOrder h5").classList.add("new");
}
function chooseToSwitchPages(Element){
    let parentE = Element.parentElement.parentElement;
    listBtn = parentE.querySelectorAll("h5");
    listBtn.forEach(e => {
        e.classList.remove("new")
    })
    Element.classList.add("new")
    pageNumber = Element.innerText;
    updateProductOfPageNum(pageNumber);
}
function changeBackGImagebtnList(){
    listBtn.forEach(e => {
        e.classList.remove("new");
        if(pageNumber == e.innerText){
            e.classList.add("new");
        }
    })
}
function clickSwitchPageLeft(){
    if(pageNumber > 1){
        pageNumber--;
        updateProductOfPageNum(pageNumber)
    }
    changeBackGImagebtnList();
}
function clickSwitchPageRight(){
    if(pageNumber < pages){
        pageNumber++;
        updateProductOfPageNum(pageNumber)
    }
    changeBackGImagebtnList();
}
// render product
function renderProduct(image, name, price){
    let cartChild = document.createElement("div");
    cartChild.classList.add("productItem");
    cartChild.innerHTML =   `<div class="imageProduct">
                                <img src= ${image} alt="">
                            </div>
                            <div class="InformProduct">
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
    document.getElementById("parentItem").append(cartChild);
}
// render all product on one page
function updateProductAll(){
    let parentItem = document.getElementById("parentItem");
    parentItem.innerHTML = '';
    for(var i = 0; i < listProduct.length; i++){
        renderProduct(listProduct[i].image, listProduct[i].name, listProduct[i].price);
    }
}
// render product of page
function updateProductOfPageNum(pageNumber){
    let parentItem = document.getElementById("parentItem");
    parentItem.innerHTML = '';
    var start = (Number(pageNumber) - 1)*8;
    var end = Number(pageNumber)*8;
    for(var i = start; i < end; i++){
        if(i < listProduct.length){
            renderProduct(listProduct[i].image, listProduct[i].name, listProduct[i].price);
        }
    }
}
//
// make information product after added
function getInformProduct(e){
    parentBtn = e.parentElement;
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
            plusAmountProduct(e);
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

// up or down amount product
function minusAmountProduct(e){
    parentE = e.parentElement;
    var amount = parentE.querySelector(".amount");
    var nowAmount = amount.innerText;
    var newAmount = Number(nowAmount) - Number(1);
    amount.innerText = newAmount;
    saveLocal();
}
function plusAmountProduct(e){
    parentE = e.parentElement;
    var amount = parentE.querySelector(".amount");
    var nowAmount = amount.innerText;
    var newAmount = Number(nowAmount) + Number(1);
    amount.innerText = newAmount;
    saveLocal();
}
// remove product
function deleteProduct(e){
    parentE = e.parentElement.parentElement;
    parentE.remove();
    saveLocal();
}

// filter
const type = document.querySelectorAll(".typeProduct");
function chooseType(e){
    type.forEach(Element => {
        Element.classList.remove("new")
    })
    if(typeName == e.innerText){
        typeName = '';
    }else{
        e.classList.add("new");
        typeName = e.innerText;
    }
}
const FilterButton = document.querySelector(".btnFilter button");
FilterButton.addEventListener("click", () => {
    var priceF = document.getElementById("priceF").value;
    var priceT = document.getElementById("priceT").value;
    Filter(priceF, priceT, typeName);
    document.querySelector(".filter .InterfaceFilter").classList.toggle("open");
})
function checkInputPrice(e){
    if(regExp.test(e.value)){
        e.classList.add("error");
    }else{
        e.classList.remove("error");

    }
}
function Filter(priceF, priceT, typeName){
    console.log(priceF, priceT, typeName);
    console.log(listTmp);
    let parentItem = document.getElementById("parentItem");
    parentItem.innerHTML = '';
    document.getElementById("pageSales").classList.add("close");
    for(var i = 0; i < listTmp.length; i++){
        if(listTmp[i].price >= priceF && listTmp[i].price <= priceT && listTmp[i].type == typeName){
            renderProduct(listTmp[i].image, listTmp[i].name, listTmp[i].price);
        }else if(priceF == '' && priceT == '' && typeName == ''){
            updateProductAll();
            return;
        }else if(priceF == '' && priceT == '' && listTmp[i].type == typeName){
            renderProduct(listTmp[i].image, listTmp[i].name, listTmp[i].price);
        }else if(listTmp[i].price >= priceF && listTmp[i].price <= priceT && typeName == ''){
            renderProduct(listTmp[i].image, listTmp[i].name, listTmp[i].price);
        }else if(regExp.test(priceF) || regExp.test(priceT)){
            parentItem.innerHTML = `<h3 style="margin-top: 200px;">Vui lòng nhập giá trị bằng số</h3>`;
            return;
        }else if(priceF == '' && listTmp[i].price <= priceT && listTmp[i].type == typeName){
            renderProduct(listTmp[i].image, listTmp[i].name, listTmp[i].price);
        }else if(priceF == '' && listTmp[i].price <= priceT && typeName == ''){
            renderProduct(listTmp[i].image, listTmp[i].name, listTmp[i].price);
        }else if(priceT == '' && listTmp[i].price >= priceF && listTmp[i].type == typeName){
            renderProduct(listTmp[i].image, listTmp[i].name, listTmp[i].price);
        }else if(priceT == '' && listTmp[i].price >= priceF && typeName == ''){
            renderProduct(listTmp[i].image, listTmp[i].name, listTmp[i].price);
        }
    }
    if(parentItem.innerHTML == ''){
        parentItem.innerHTML = `<h3 style="margin-top: 200px;">Không tìm thấy kết quả</h3>`
    }
}
function updateLayoutAll(e){
    updateProductAll();
    document.getElementById("pageSales").classList.add("close");
}
function updateLayoutGrid(e){
    updateProductOfPageNum(1);
    document.getElementById("pageSales").classList.remove("close");
}
// make inform Product added save local and upload after login of name, pass user
var listProductCart = [];
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
window.onload = function(){
    updateNumericalOrder();
    updateProductOfPageNum(1);
    localStorage.setItem("listProduct", JSON.stringify(listProduct));
    listBtn = document.querySelectorAll("h5");
    uploadCartOfUser();
}