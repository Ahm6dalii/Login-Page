// !html element
var LoginEmail = document.querySelector("#signInEmail");
var loginpassword = document.querySelector("#signInPass");

var singUpName = document.querySelector("#singUpName");
var singUpEmail = document.querySelector("#singUpEmail");
var singUpPassword = document.querySelector("#singUpPassword");

var btnSignUp = document.querySelector("#btnSignUp");
var btnSignIn = document.querySelector("#btnSignIn");


// ^Variable
var users;
if (localStorage.getItem("Users") != null) {
  users = JSON.parse(localStorage.getItem("Users"));
} else {
  users = [];
}

var pathparts = location.pathname.split("/");
var baseURL = "";
for (var i = 0; i < pathparts.length - 1; i++) {
  baseURL += "/" + pathparts[i];
}

var uName = "";
if ((uName = localStorage.getItem("seesionUser"))) {
  console.log("uname", uName);
  document.querySelector("#welcomeUser").innerHTML = `Welcome ${uName}`;
  console.log("uname", uName);
}


// to say welcome in home page
var username = localStorage.getItem("sessionUsername");
if (username) {
  document.getElementById("username").innerHTML = "Welcome " + username;
}

// &Function

// --------for sign UP--------
function signUP() {
  // document.getElementById("signUpMess").innerHTML =``;
  if (isSignUpEmpty() == true) {
    document.getElementById("signUpMess").innerHTML =
      '<span class="p-2 text-danger">All inputs is required</span>';
    return false;
  }

  if (isSignUpEmailExit() == true) {
    document.getElementById("signUpMess").innerHTML =
      '<span class="p-2 text-danger">email exit</span>';
    return;
  }

  if (
    validateInput(singUpName) &&
    validateInput(singUpEmail) &&
    validateInput(singUpPassword)
  ) {
    var user = {
      name: singUpName.value,
      email: singUpEmail.value,
      password: singUpPassword.value,
    };
    users.push(user);
    localStorage.setItem("Users", JSON.stringify(users));
    console.log(user);
    console.log(users);
    document.getElementById("signUpMess").innerHTML =
      '<span class="p-2 text-success">Add Success</span>';
    clearForm();
  } 
}

function isSignUpEmpty(){
  if (singUpName.value == "" || singUpEmail.value == ""|| singUpPassword.value == "") {
    return true;
  }
}

function isSignUpEmailExit() {
  var email = singUpEmail.value;
  for (var i = 0; i < users.length; i++) {
    if (users[i].email == email) {
      return true;
    }
  }
}




// -------for Login---------- 
function signIN() {
  var email = LoginEmail.value;
  var password = loginpassword.value;
  if (isloginEmpty() == true) {
    document.getElementById("wrong").innerHTML =
      '<span class="p-2 text-danger">All inputs is required</span>';
    return false;
  }

  if (isLoginEmailExit(email)) {
    document.querySelector("#emailExit").innerHTML="Email not Exit You must sign up first";
    document.querySelector("#emailExit").classList.replace("d-none", "d-block");
    LoginEmail.classList.add("is-invalid");
    return false;
  }



  for (var i = 0; i < users.length; i++) {
    if (users[i].email.includes(email) && password == users[i].password) {
      localStorage.setItem("seesionUser", users[i].name);
      if (baseURL == "/") {
        location.replace("https://" + location.hostname +"/"+location.pathname.split("/")[1].toString()+ "/home.html");
      } else {
        location.replace(baseURL + "/home.html");
      }    
      return true;
    }
  }
  document.getElementById("wrong").innerHTML =
    '<span class="p-2 text-danger">incorrect email or password</span>';
}

function isloginEmpty() {
  if (LoginEmail.value == "" || loginpassword.value == "") {
    return true;
  }
}

function isLoginEmailExit(email) {
  // var email = LoginEmail.value;
  for (var i = 0; i < users.length; i++) {
    if (users[i].email == email) {
      return false;
    }
  }
  return true;
  
}

// --------Validation---------
function validateInput(element) {
  // password must begain with capital litter and contain number
  var regix = {
    signInEmail: /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/,
    signInPass: /^([A-Z]{1,10})+([1-9]{1,9})+([a-z]{1,10})?$/,
    singUpName:
      /^([a-zA-Z]{1,10})?(\s{1,})?([a-zA-Z]{1,10})?(\s{1,})?([a-z]{1,10})?$/,
    singUpEmail: /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/,
    singUpPassword: /^(?=.*?[a-z])?(?=.*?[A-Z])(?=.*?[0-9]).{2,}$/,
  };
  if (regix[element.id].test(element.value) == true) {
    element.classList.add("is-valid");
    element.classList.remove("is-invalid");
    element.nextElementSibling.classList.replace("d-block", "d-none");
    element.nextElementSibling.nextElementSibling.classList.replace(
      "d-block",
      "d-none"
    );
    return true;
  } else {
    element.classList.add("is-invalid");
    element.classList.remove("is-valid");
    element.nextElementSibling.classList.replace("d-none", "d-block");

    return false;
  }
}


function clearForm() {
  singUpName.value = "";
  singUpName.classList.remove("is-valid");
  singUpEmail.value = "";
  singUpEmail.classList.remove("is-valid");
  singUpPassword.value = "";
  singUpPassword.classList.remove("is-valid");
}

