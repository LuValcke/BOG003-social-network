// importamos la funcion que vamos a testear

/* import { signIn } from '../src/lib/index.js';

// funcion de firebase de iniciar sesion
describe('Iniciar sesion', () => {
  it('Debería poder iniciar sesión', (done) => {
    signIn('soyuncacahuate@gmail.com', '12345678').then((user) => {
      expect(user.email).toBe('soyuncacahuate@gmail.com');
      expect(user.isAnonymous).toBe(false);
      done();
    });
  });
});

// configurando firebase mock
const firebasemock = require('firebase-mock');

const mockauth = new firebasemock.MockAuthentication();
mockauth.autoFlush();

global.firebase = firebasemock.MockFirebaseSdk(
  () => null,
  () => mockauth,
);

// funcion de firebase de iniciar sesion
describe('Iniciar sesion', () => {
  it('Debería poder iniciar sesión', (done) => {
    signIn('soyuncacahuate@gmail.com', '12345678').then((user) => {
      expect(user.email).toBe('soyuncacahuate@gmail.com');
      expect(user.isAnonymous).toBe(false);
      done();
    });
  });
}); */

/* // test crear un nuevo usuario
describe('Crear un usuario', () => {
  it('Debería poder registrarse con email szapata013@gmail.com y password 12345678', (done) => {
    createNewUser('szapata013@gmail.com', '12345678').then((user) => {
      expect(user.email).toBe('szapata013@gmail.com');
      expect(user.password).toBe('12345678');
      done();
    });
  });
});

// funcion de iniciar sesion con google
describe('Iniciar sesion con google', () => {
  it('Deberia iniciar sesion con Google', () => {
    signInWithGoogle().then((user) => {
      expect(user.isAnonymous).toBe(false);
    });
  });
}); */

// configurando firebase moc
import { signIn } from '../src/lib/index.js';

const firebasemock = require('firebase-mock');

const mockauth = new firebasemock.MockFirebase();
const mockfirestore = new firebasemock.MockFirestore();
mockfirestore.autoFlush();
mockauth.autoFlush();

/* global.firebase = firebasemock.MockFirebaseSdk(
  (path) => (path ? mockdatabase.child(path) : null),
  () => mockauth,
  () => mockfirestore,
);  */

describe('signIn', () => {
  it('Deberia ser una funcion', () => {
    expect(typeof (signIn)).toBe('function');
  });
  it('Deberia poder iniciar sesion', () => signIn('lore4@gmail', '123456')
    .then((user) => {
      expect(user.email).toBe('lore4@gmail');
    }));
});
