// Este es el punto de entrada de tu aplicacion

import { createUser, signIn, signInWithGoogle } from './lib/index.js';

document.getElementById("register").addEventListener("click", () => {
    document.getElementById("formRegister").style.display = "block";
    document.getElementById("login").style.display = "none";

})

document.getElementById("signUp").addEventListener("click", () => {
    document.getElementById("formRegister").style.display = "none";
    document.getElementById("login").style.display = "block";

})

//Sign Up 
document.getElementById("btn-register").addEventListener("click", () => {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    createUser(email, password);
})

//Sign In

document.getElementById("btn-login").addEventListener("click", () => {
    const email = document.getElementById("email-login").value;
    const password = document.getElementById("password-login").value;
    signIn(email, password);
})

document.getElementById("btn-google-register").addEventListener("click", () => {
    signInWithGoogle();
    console.log("ok");
})

document.getElementById("btn-google").addEventListener("click", () => {
    signInWithGoogle();
    console.log("ok");
})