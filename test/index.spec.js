// En este archivo se hacen las pruebas para autenticación con Firebase
import {
  createUser,
  signIn,
  signInWithGoogle,
  signOut,
} from '../src/lib/index.js';

const firebaseMock = require('firebase-mock');

const mockAuth = new firebaseMock.MockAuthentication();

const mockSdk = new firebaseMock.MockFirebaseSdk(
  () => null,
  () => mockAuth,
);
mockSdk.auth().autoFlush();
global.firebase = mockSdk;

/* Test para crear un usuario. */
describe('createUser', () => {
  it('Deberia ser una funcion', () => {
    expect(typeof createUser).toBe('function');
  });
  it('Deberia poder crear un nuevo usuario', async () => {
    createUser('laboratoria1@gmail.com', '12345678');

    await mockSdk
      .auth()
      .getUserByEmail('laboratoria1@gmail.com')
      .then((result) => {
        expect(result.email).toBe('laboratoria1@gmail.com');
        expect(typeof result).toBe('object');
      });
  });
});

/* Test para SignIn. */

describe('signIn', () => {
  it('Deberia ser una funcion', () => {
    expect(typeof signIn).toBe('function');
  });
  it('Debería poder iniciar sesión', () => signIn('laboratoria@hotmail.com', '123123')
    .then((user) => {
      expect(user.email).toBe('laboratoria@hotmail.com');
    }));
});

/* Test para Google. */
describe('signInWithGoogle', () => {
  it('Deberia ser una funcion', () => {
    expect(typeof signInWithGoogle).toBe('function');
  });
  it('Deberia poder iniciar sesion con Google', () => signInWithGoogle().then((result) => {
    expect(typeof result).toBe('object');
  }));
});

/* Test para cerrar sesión. */
describe('Cerrar sesión', () => {
  it('Deberia cerrar sesion', () => {
    signOut().then((user) => {
      expect(user).toBe(null);
    });
  });
});
