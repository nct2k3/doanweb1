// Dynamic
window.addEventListener("scroll", function(){
    let offset = window.pageYOffset;
    if(offset > 50){
        this.document.getElementById("header").style.backgroundColor = "black";
        this.document.getElementById("header").style.color = "white";
        this.document.getElementById("user--login-signup").style.backgroundColor = "black";
        const a = document.querySelectorAll("#header a")
        a.forEach(element => {
            element.style.color = 'white';
        });
    }
    if(offset <= 50){
        this.document.getElementById("header").style.backgroundColor = "transparent";
        this.document.getElementById("header").style.color = "black";
        this.document.getElementById("user--login-signup").style.backgroundColor = "white";
        const a = document.querySelectorAll("#header a")
        a.forEach(element => {
            element.style.color = 'black';
        });
    }
})

function regEventShowScroll(e){
    var locationE = e.getClientRects()[0]
    var heightScreen = window.innerHeight;
    if(!(locationE.bottom < 0 || locationE.top > heightScreen)){
        e.classList.add("open");
    }else{
        e.classList.remove("open");
    }
}
var ElementAnimation = document.querySelectorAll(".show-when-sroll");
function checkAnimation(){
    ElementAnimation.forEach(element => { 
        regEventShowScroll(element)
    });
}
window.onscroll = checkAnimation

// Name Currenr User
window.onload = function(){
    var currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if(currentUser != null){
        document.getElementById("nameUser").innerText = currentUser.name;
    }else{
        document.getElementById("nameUser").innerText = '';
    }
}

// 
function openSubmenu(){
    document.querySelector(".submenu--close").classList.toggle("open");
}
function logOut(){
    localStorage.removeItem("currentUser");
}