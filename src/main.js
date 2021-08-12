// Este es el punto de entrada de tu aplicacion

import { login } from "./lib/view/templateLogin.js";
import { changeRoute } from "./lib/view/router.js";

const init = () => {
  changeRoute(window.location.hash);
  window.addEventListener("hashchange", () => {
    changeRoute(window.location.hash);
  });
};

window.addEventListener("load", init);


