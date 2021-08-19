// importamos la funcion que vamos a testear
import { createUser, /* signIn */ signInWithGoogle } from '../src/lib/index.js';

const firebaseMock = require('firebase-mock');

const mockAuth = new firebaseMock.MockAuthentication();

const mockSdk = new firebaseMock.MockFirebaseSdk(
  () => null,
  () => mockAuth,
);
mockSdk.auth().autoFlush();
global.firebase = mockSdk;

describe('createUser', () => {
  it('Deberia ser una funcion', () => {
    expect(typeof (createUser)).toBe('function');
  });
  it('Deberia poder crear un nuevo usuario', async () => {
    createUser('laboratoria@gmail.com', '12345678');

    await mockSdk.auth().getUserByEmail('laboratoria@gmail.com').then((result) => {
      expect(result.email).toBe('laboratoria@gmail.com');
      expect(typeof result).toBe('object');
    });
  });
});

/* describe('signIn', () => {
  it('Deberia ser una funcion', () => {
    expect(typeof (signIn)).toBe('function');
  });
  it('Deberia poder iniciar sesion', async () => {
    signIn('laboratoria@gmail.com', '12345678');
    await mockSdk.auth().onAuthStateChanged((user) => user.email)
      .then((result) => {
        expect(result.email).toBe('laboratoria@gmail.com');
      });
  });
}); */

describe('signInWithGoogle', () => {
  it('Deberia ser una funcion', () => {
    expect(typeof (signInWithGoogle)).toBe('function');
  });
  it('Deberia poder iniciar sesion con Google', () => signInWithGoogle().then((result) => {
    expect(typeof result).toBe('object');
  }));
});
