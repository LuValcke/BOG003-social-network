import { login } from './templateLogin.js';
import { register } from './templateRegister.js';
import { feed } from './templateFeed.js';

const showTemplate = (hash) => {
  /* Esta función hace las validaciones de email verificado del usuario actual
  y redirige según corresponda en cada caso */
  const containerRoot = document.getElementById('data-router');
  containerRoot.innerHTML = '';
  switch (hash) {
    case '#/login':
      if (currentUser && emailVerified) {
        window.location.hash = '#/feed';
      } else {
        containerRoot.appendChild(login());
      }
      break;
    case '#/register':
      if (currentUser && emailVerified) {
        window.location.hash = '#/login';
      } else {
        containerRoot.appendChild(register());
      }
      break;
    case '#/feed':
      if (currentUser && emailVerified) {
        containerRoot.appendChild(feed());
      } else {
        window.location.hash = '#/login';
      }
      break;
    default:
      containerRoot.innerHTML = 'Not Found';
  }
};

export const changeRoute = (hash) => {
  /* Este bloque de código extrae el hash y llama a la función ShowTemplate */
  setTimeout(() => {
    if (hash === '#/login') {
      return showTemplate(hash);
    } if (hash === '#/register') {
      return showTemplate(hash);
    } if (hash === '#/feed') {
      return showTemplate(hash);
    }
    return showTemplate(hash);
  }, 100);
};
