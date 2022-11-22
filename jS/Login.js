var regExp = /[a-zA-Z]/g;
var regEm = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/; 

function errorWarning(lable, input){
    document.getElementById(lable).style.color = 'red'
    document.getElementById(lable).style.top = '-10px'
    document.getElementById(input).style.borderBottom = '1px solid red'
}
function trueWarning(lable, input){
    document.getElementById(lable ).style.top = '-10px'
    document.getElementById(lable).style.color = 'rgb(34, 140, 10)'
    document.getElementById(input).style.borderBottom = '1px solid rgb(34, 140, 10)'
}
function myN(){
    var x = document.getElementById("inputName").value;
    if(x.length >= 8 && regExp.test(x)){
        trueWarning("lableName", "inputName");
    }else{
        errorWarning("lablePass", "inputPass")
    }
}


function myP(){
    var y = document.getElementById("inputPass").value;
    if(y.length >= 6){
        trueWarning("lablePass", "inputPass")
    }else{
        errorWarning("lablePass", "inputPass")
    }
}
// 

function myNS(){
    var x = document.getElementById("inputNameS").value;
    if(x.length >= 8 && regExp.test(x)){
        trueWarning("lableNameS", "inputNameS")
    }else{
        errorWarning("lableNameS", "inputNameS")
    }
}


function myPS(){
    var y = document.getElementById("inputPassS").value;
    if(y.length >= 6){
        trueWarning("lablePassS", "inputPassS")
    }else{
        errorWarning("lablePassS", "inputPassS")
    }
}

function myES(){
    var z = document.getElementById("inputEmail").value;
    if(z.length != 0 && regEm.test(z)){
        trueWarning("lableEmail", "inputEmail")
    }else{
        errorWarning("lableEmail", "inputEmail")
    }
}

const LinksignUp = document.querySelector(".linkSignup");
const formLogin = document.querySelector("#formLogin")
const formSignup = document.querySelector("#formSignup");
var ListUser = [];
// regBackLogin
const btnBackLoginForm = document.querySelector("#formSignup .ti-arrow-left");
LinksignUp.addEventListener("click", () => {
    formSignup.classList.add("formSignUp-open");
    formLogin.classList.add("formLogin-close");
})
btnBackLoginForm.addEventListener("click", ()=>{
    formSignup.classList.remove("formSignUp-open");
    formLogin.classList.remove("formLogin-close");
})


// Add array list
var EmailSign = document.getElementById("inputEmail");
var NameSign = document.getElementById("inputNameS");
var PassSign = document.getElementById("inputPassS");
var list = []
var currentUser
function addElement(Email, Name, Pass){
    list.push({
        email: Email,
        name: Name,
        pass: Pass
    })
}

// Save localStorage
function saveData(){
    var listSt = JSON.parse(localStorage.getItem("ListUser"));
    list = [];
    if(listSt != null){
        for(var i = 0; i < listSt.length; i++){
            list.push(listSt[i])
        }
    }
    localStorage.removeItem("ListUser");
    addElement(EmailSign.value, NameSign.value, PassSign.value);
    localStorage.setItem("ListUser", JSON.stringify(list));
}


// check data input, after save data and submit form
function submitForm(){
    SignUpF.submit();
    document.getElementById("SignUp-success").classList.remove("SignUp-open")
}
function checkDataSignUp(){
    var EmailSign = document.getElementById("inputEmail").value;
    var NameSign = document.getElementById("inputNameS").value;
    var PassSign = document.getElementById("inputPassS").value;
    var list = JSON.parse(localStorage.getItem("ListUser"));
    mark = 0;
    if(list != null){
        for(var i = 0; i < list.length; i++){
            console.log(list[i].email);
            console.log(list[i].name);
            if(EmailSign === list[i].email){
                document.getElementById("inputEmail").value = '';
                document.getElementById("contentMessS").style.display = "block";
                document.getElementById("contentMessS").innerText = "Email đã được sử dụng"
                mark = 1;
            }
            if(NameSign === list[i].name){
                document.getElementById("inputNameS").value = '';
                document.getElementById("contentMessS").style.display = "block";
                document.getElementById("contentMessS").innerText = "Tên người dùng đã được sử dụng"
                mark = 1;
            }
        }
    }
    if(mark == 1){
        return;
    }else{
        document.getElementById("contentMessS").style.display = "none";
    }
    if(regEm.test(EmailSign) && regExp.test(NameSign) && NameSign.length >= 8 && PassSign.length >= 6){
        saveData();
        document.getElementById("SignUp-success").classList.add("SignUp-open")
        setTimeout(submitForm, 3000);
    }
    if(NameSign == ''){
        errorWarning("lableNameS", "inputNameS")
    }
    if(PassSign == ''){
        errorWarning("lablePassS", "inputPassS")
    }
    if(EmailSign == ''){
        errorWarning('lableEmail', 'inputEmail');
    }
}

// check userName, Pass.
function navigation(){
    window.location = "http://127.0.0.1:5500/index.html";
}
function checkUserLogin(){
    var mark = 0;
    var NameLog = document.getElementById("inputName").value;
    var PassLog = document.getElementById("inputPass").value;
    ListUser = JSON.parse(localStorage.getItem("ListUser"));
    if(ListUser == null){
        document.getElementById("contentMess").style.display = "block";
        return;
    }
    if(regExp.test(NameLog) && NameLog.length >= 8 && PassLog.length >= 6){
        for(var i = 0; i < ListUser.length; i++){
            if(ListUser[i].name === NameLog && ListUser[i].pass === PassLog){
                mark = 1
                currentUser = {
                    name: NameLog,
                    pass: PassLog
                }
                localStorage.setItem("currentUser", JSON.stringify(currentUser));
                document.getElementById("inputName").value = "";
                document.getElementById("inputPass").value = "";
                setTimeout(navigation, 300);
            }
        }
        if(mark == 0){
            document.getElementById("contentMess").style.display = "block";
        }
    }
    if(NameLog == ''){
        errorWarning("lableName", "inputName")
    }
    if(PassLog == ''){
        errorWarning("lablePass", "inputPass")
    }
}
window.onload = function(){
    // var listSt = JSON.parse(localStorage.getItem("ListUser"));
    // if(listSt != null){
    //     for(var i = 0; i < listSt.length; i++){
    //         list.push(listSt[i])
    //     }
    // }
}