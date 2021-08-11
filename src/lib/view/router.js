import { login } from './templateLogin.js';
import { register } from './templateRegister.js';

export const changeRoute = (hash) => {
    if (hash === '#/login'){
        return showTemplate(hash);
    }else if (hash === '#/register'){
        return showTemplate(hash);
    }else{
        return showTemplate(hash);
    }
}

const showTemplate = (hash) => {
    
    const containerRoot = document.getElementById('data-router');
    containerRoot.innerHTML = login();

    switch(hash) {
        case'':

        case '#/':
            containerRoot.appendChild(login());
            break;
        case '#/login':
            containerRoot.appendChild(login());
            break;
        case '#/register':
            containerRoot.appendChild(register());
            break;
        default:
            containerRoot.innerHTML = 'Not Found'
    }
}
