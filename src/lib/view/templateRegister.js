import { createUser, signInWithGoogle } from '../index.js';

export const register = () => {
  // Esta variable almacena la porción de html a adjuntar en el body
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
                    <input id="userName" placeholder="Alguien">
                    <h3 class="login-text" id="email-text">Correo electrónico</h3>
                    <input id="email" placeholder="alguien@correo.com">
                    <h3 class="login-text">Contraseña</h3>
                    <input type="password" id="password" placeholder="••••••">
                    <span id="errormessage" required></span>
                    <button id="btn-register">Registrarse</button>
                    <button id="btn-google-register">Registrarse con Google</button>
                    <div class="links">
                        <h4>¿Ya tienes una cuenta?</h4>
                        <h4 id="signUp"><a href='#/login'>Inicia sesión</a></h4>
                    </div>
                </div>
            </section>
    `;
  // Aquí se crea el div contenedor donde se adjunta la variable viewRegister
  const divRegister = document.createElement('div');
  divRegister.className = 'login';
  divRegister.innerHTML = viewRegister;

  // Aquí se crean las variables para llamar a los botones que tendrán un evento click
  const btnRegister = divRegister.querySelector('#btn-register');
  const btnGoogleRegister = divRegister.querySelector('#btn-google-register');

  /* Aquí se le agrega el evento click al botón register, se capturan los valores de los inputs
  y se hacen las validaciones respectivas (capturar errores) */
  btnRegister.addEventListener('click', () => {
    const email = divRegister.querySelector('#email').value;
    const password = divRegister.querySelector('#password').value;

    createUser(email, password)
    .then(()=> {
      divRegister.querySelector('#errormessage').innerHTML='¡Usuario creado! &#9989 </br>  Revisa tu bandeja de entrada  para verificar la cuenta';
    })
    .catch((error) => {
      const errorCode = error.code;

      const errorMessage = divRegister.querySelector('#errormessage');
      switch (errorCode) {
        case 'auth/invalid-email':
          errorMessage.innerHTML = '⚠️ Por favor ingrese un correo válido';
          break;
        case 'auth/email-already-in-use':
          errorMessage.innerHTML = '⚠️ Ya existe un usuario con este correo';
          break;
        case 'auth/weak-password':
          errorMessage.innerHTML = '⚠️ La contraseña debe contener al menos 6 dígitos';
          break;
        default:
          errorMessage.innerHTML = '⚠️ Ha ocurrido un error inesperado';
          break;
      }
    });
  });

  // Aquí se le agrega el evento click al botón de Google y se llama la función sigInWithGoogle
  btnGoogleRegister.addEventListener('click', () => {
    signInWithGoogle();
  });

  return divRegister;
};
