// Este es el punto de entrada de tu aplicacion

import { changeRoute } from './lib/view/router.js';

const init = () => {
  /* Esta función se encarga de llamar a la función changeRoute y le pasa el hash tanto inicialmente
  como cuando cambie el hash  */
  window.location.hash = '#/login';
  changeRoute(window.location.hash);
  window.addEventListener('hashchange', () => {
    changeRoute(window.location.hash);
  });
};

// Esta línea de código llama a la función init una vez se cargue la página
window.addEventListener('load', init);
