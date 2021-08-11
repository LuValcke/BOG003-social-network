// Este es el punto de entrada de tu aplicacion

import { login } from "./lib/view/templateLogin.js";
import { changeRoute } from "./lib/view/router.js";

const init = () => {
  document.getElementById("data-router").innerHTML = login();
  changeRoute(window.location.hash);
  window.addEventListener("hashchange", () => {
    changeRoute(window.location.hash);
  });
};

window.addEventListener("load", init);


  //Sign Up
  /* document.getElementById("btn-register").addEventListener("click", () => {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    createUser(email, password);
  }); */

  //Sign In

/*   

  document.getElementById("btn-google").addEventListener("click", () => {
    signInWithGoogle();
    console.log("ok");
  }); */

