import { login } from './templateLogin.js';
import { register } from './templateRegister.js';

const showTemplate = (hash) => {
    /* Esta fución según el hash extraído con changeRoute, le adjunta una porción de código html al body */
    const containerRoot = document.getElementById('data-router');
    containerRoot.innerHTML = '';
    //console.log("función showteplate")
    switch(hash) {
        case  '':
            containerRoot.appendChild(login());
            //console.log("case vacio");
            break;
        case '#/login':
            containerRoot.appendChild(login());
            //console.log("Login");
            break;
        case '#/register':
            containerRoot.appendChild(register());
            //console.log("Register");
            break;
        default:
            containerRoot.innerHTML = 'Not Found'
    }
}

export const changeRoute = (hash) => {
    /* Este bloque de código extrae el hash y llama a la función ShowTemplate */

    if (hash === '#/login'){
        return showTemplate(hash);
    }else if (hash === '#/register'){
        return showTemplate(hash);
    }else{
        return showTemplate(hash);
    }
}


