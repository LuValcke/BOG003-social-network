import { login } from './templateLogin.js';
import { register } from './templateRegister.js';

const showTemplate = (hash) => {
  const containerRoot = document.getElementById('data-router');
  containerRoot.innerHTML = '';
  // console.log("función showteplate")
  switch (hash) {
    case '':
      containerRoot.appendChild(login());
      // console.log("case vacio");
      break;
    case '#/login':
      containerRoot.appendChild(login());
      // console.log("Login");
      break;
    case '#/register':
      containerRoot.appendChild(register());
      // console.log("Register");
      break;
    default:
      containerRoot.innerHTML = 'Not Found';
  }
};

export const changeRoute = (hash) => {
  /* Este bloque de código extrae el hash y llama a la función ShowTemplate */

  if (hash === '#/login') {
    return showTemplate(hash);
  } if (hash === '#/register') {
    return showTemplate(hash);
  }
  return showTemplate(hash);
};
