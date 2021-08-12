import { signIn, signInWithGoogle } from "../index.js";
export const login = () => {
    const viewLogin = `
        <section class="description">
            <figure>
                <img class="img-logo" src="img/logo.png">
            </figure>
            <p class="description-text">Aquí encontrarás una gran comunidad al rededor del séptimo arte.
                </br>
                ¡Únete!</p>
        </section>
        <section id="login">
            <div class="form-login">
                <h3 class="login-text" id="email-text">Correo electrónico</h3>
                <input id="email-login" placeholder="alguien@correo.com">
                <h3 class="login-text">Contraseña</h3>
                <input type="password" id="password-login" placeholder="••••••">
                <span id="errormessage" required></span>
                <button id="btn-login">Iniciar sesión</button>
                <button id="btn-google">Ingresar con Google</button>
                <div class="links">
                    <h4>¿No tienes una cuenta?</h4>
                    <h4 id="register"><a href='#/register'>Regístrate</a></h4>
                </div>
            </div>
        </section>
    `
    const main = document.createElement('div');
    main.className = 'login';
    main.innerHTML = viewLogin;

    const btnLogin = main.querySelector('#btn-login');
    const btnGoogle = main.querySelector('#btn-google');

    btnLogin.addEventListener('click', () => {
        const email = main.querySelector("#email-login").value;
        const password = main.querySelector("#password-login").value;
        signIn(email, password).catch(error => {
                console.log(error);
                const errorCode = error.code;
                
                const errorMessage = main.querySelector('#errormessage');
                switch (errorCode) {
                    case 'auth/invalid-email':
                        errorMessage.innerHTML = '⚠️ Por favor ingrese un correo válido';
                        break;
                    case 'auth/wrong-password':
                        errorMessage.innerHTML = '⚠️ La contraseña ingresada es incorrecta';
                        break;
                    case 'auth/too-many-requests':
                        errorMessage.innerHTML = '⚠️ Has superado el número de intentos para ingresar';
                        break;
                    case 'auth/user-not-found':
                            errorMessage.innerHTML = '⚠️ El usuario no se encuentra registrado';
                            break;
                    default:
                            errorMessage.innerHTML = "⚠️ Ha ocurrido un error inesperado";
                            break;
                } 
            })  


    })
    btnGoogle.addEventListener("click", () => {
        signInWithGoogle();
        console.log("ok");
    });

    return main;
}