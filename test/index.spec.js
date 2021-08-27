// importamos la funcion que vamos a testear
import { createUser, signIn, signInWithGoogle } from '../src/lib/index.js';

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
  it('Deberia poder iniciar sesion', async () => {
    await signIn('laboratoria1@gmail.com', '12345678');
    expect(window.location.hash).toBe('#/feed');
  });
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
