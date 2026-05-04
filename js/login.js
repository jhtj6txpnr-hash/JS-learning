console.log("Login logik geladen...");
// Holen der Id'S
let usernameInput = document.getElementById("usernameInput");
let passwordInput = document.getElementById("passwordInput");
let rememberMe = document.getElementById("rememberMe");
let loginBtn = document.getElementById("loginBtn");
let loginMessage = document.getElementById("loginMessage");

// aktiviert funktion für die benutzer merken checkBox



// redirect falls der benutzer schon eingeloggt ist
if ( localStorage.getItem("loggedIn") === "true" || sessionStorage.getItem("loggedIn") === "true" ) {
   window.location.href = "/html/index.html";
}


// Test loginBtn klick
loginBtn.addEventListener("click", function() {
   console.log(usernameInput.value);
   console.log(passwordInput.value);

   // Check ob leere eingaben getätigt werden
   if ( usernameInput.value === "NomicGDev" && passwordInput.value === "999" ) {
      if (rememberMe.checked) {
      localStorage.setItem("loggedIn", "true");
      } else {
         sessionStorage.setItem("loggedIn", "true");
      }
    loginMessage.style.color = "LimeGreen";
    loginMessage.textContent = " Login Erfolgreich!"
    window.location.href = "/html/index.html";
   } else if ( usernameInput.value === "" || passwordInput.value === "" ) {
    loginMessage.textContent = "Bitte alles ausfüllen!";
    loginMessage.style.color = "orange";
   } else {
    loginMessage.textContent = "Login fehlgeschlagen";
    loginMessage.style.color = "red";
   }
})

