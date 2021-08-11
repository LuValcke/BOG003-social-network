import { createUser, signInWithGoogle } from "../index.js";
export const register = () => {
    const divRegister = document.createElement('div');
    const viewRegister = `
            <section class="description">
                <figure>
                    <img class="img-logo" src="img/logo.png">
                </figure>
                <p class="description-text">Aquí encontrarás una gran comunidad al rededor del séptimo arte.
                    </br>
                    ¡Únete!</p>
            </section>
            <section id="formRegister">
                <div class="form-login">
                    <h3 class="login-text">Nombre de usuario</h3>
                    <input id="userName">
                    <h3 class="login-text" id="email-text">Correo electrónico</h3>
                    <input id="email">
                    <h3 class="login-text">Contraseña</h3>
                    <input type="password" id="password">
                    <button id="btn-register">Registrarse</button>
                    <button id="btn-google-register">Registrarse con Google</button>
                    <div class="links">
                        <h4>¿Ya tienes una cuenta?</h4>
                        <h4 id="signUp"><a href='#/login'>Inicia sesión</a></h4>
                    </div>
                </div>
            </section>
    `
    divRegister.className = 'login';
    divRegister.innerHTML = viewRegister;

    const btnRegister = divRegister.querySelector('#btn-register');
    const btnGoogleRegister = divRegister.querySelector('#btn-google-register');

    btnRegister.addEventListener('click', () => {
        const email = divRegister.querySelector("#email").value;
        const password = divRegister.querySelector("#password").value;
        createUser(email, password);
    })
    btnGoogleRegister.addEventListener("click", () => {
      signInWithGoogle();
      console.log("ok");
    });
    return divRegister;
}