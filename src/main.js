// Este es el punto de entrada de tu aplicacion

import { changeRoute } from './lib/view/router.js';

export const init = () => {
  /* Esta función se encarga de validar que haya un usuario logueado y con email verificado,
  llama a la función changeRoute y le pasa el hash tanto inicialmente
  como cuando cambie el hash  */
  setTimeout(() => {
    if (currentUser && emailVerified) {
      window.location.hash = '#/feed';
    } else {
      window.location.hash = '#/login';
    }
  }, 600);

  changeRoute(window.location.hash);
  window.addEventListener('hashchange', () => {
    changeRoute(window.location.hash);
  });
};

// Esta línea de código llama a la función init una vez se cargue la página
window.addEventListener('load', init);
