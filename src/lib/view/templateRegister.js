import { createUser, signInWithGoogle, emailVerification } from '../index.js';

export const register = () => {
  // Esta variable almacena la porción de html a adjuntar en el body
  const viewRegister = `
            <section class="description">
                <figure>
                    <img class="img-logo" src="img/logo.png">
                </figure>
                <p class="description-text">Aquí encontrarás una gran comunidad alrededor del séptimo arte.
                    </br>
                    ¡Únete!</p>
            </section>
            <section id="formRegister">
                <div class="form-login">
                    <h3 class="login-text">Nombre de usuario</h3>
                    <input id="userName" placeholder="Alguien" required>
                    <h3 class="login-text" id="email-text">Correo electrónico</h3>
                    <input id="email" placeholder="alguien@correo.com">
                    <h3 class="login-text">Contraseña</h3>
                    <input type="password" id="password" placeholder="••••••">
                    <h3 class="login-text">Confirme su contraseña</h3>
                    <input type="password" id="passConfirm" placeholder="••••••">
                    <span id="errormessage" required></span>
                    <button type="submit" id="btn-register">Registrarse</button>
                    <button type="submit" id="btn-google-register">Registrarse con Google</button>
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
    const userName = divRegister.querySelector('#userName').value;
    const passConfirm = divRegister.querySelector('#passConfirm').value;
    const errorMessage = divRegister.querySelector('#errormessage');
    if (password === passConfirm && userName !== '') {
      createUser(email, password)
        .then(() => {
          const user = firebase.auth().currentUser;
          user.updateProfile({
            displayName: userName,
          });
          return emailVerification();
        })
        .then(() => {
          divRegister.querySelector('#errormessage').innerHTML = '¡Usuario creado! &#9989 </br>  Revisa tu bandeja de entrada  para verificar la cuenta';
        })
        .catch((error) => {
          const errorCode = error.code;
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
    } else if (userName === '') {
      errorMessage.innerHTML = '⚠️ Debe ingresar nombre de usuario';
    } else {
      errorMessage.innerHTML = '⚠️ Las contraseñas no coinciden';
    }
  });

  // Aquí se le agrega el evento click al botón de Google y se llama la función sigInWithGoogle
  btnGoogleRegister.addEventListener('click', async () => {
    await signInWithGoogle();
    window.location.hash = '#/feed';
  });

  return divRegister;
};
