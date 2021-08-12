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
    containerRoot.innerHTML = '';
    console.log("función showteplate")
    switch(hash) {
        case  '':
            containerRoot.appendChild(login());
            console.log("case vacio");
            break;
        case '#/login':
            containerRoot.appendChild(login());
            console.log("Login");
            break;
        case '#/register':
            containerRoot.appendChild(register());
            console.log("Register");
            break;
        default:
            containerRoot.innerHTML = 'Not Found'
    }
}
