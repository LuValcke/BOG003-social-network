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

describe('createUser', () => {
    it('Deberia ser una funcion', () => {
        expect(typeof(createUser)).toBe('function');
    });
    it('Deberia poder crear un nuevo usuario', async() => {
        createUser('laboratoria1@gmail.com', '12345678');

        await mockSdk.auth().getUserByEmail('laboratoria1@gmail.com').then((result) => {
            expect(result.email).toBe('laboratoria1@gmail.com');
            expect(typeof result).toBe('object');
        });
    });
});

/* describe('signIn', () => {
  it('Deberia ser una funcion', () => {
    expect(typeof (createUser)).toBe('function');
  });
  it('Deberia poder loguear el usuario', async () => {
    signIn('laboratoria@gmail.com', '12345678');

    await mockSdk.auth().getUserByEmail('laboratoria@gmail.com').then((result) => {
      expect(result.email).toBe('laboratoria@gmail.com');
      expect(typeof result).toBe('object');
    });
  });
}); */

describe('signIn', () => {
    it('Deberia ser una funcion', () => {
        expect(typeof(signIn)).toBe('function');
    });
    it('Deberia poder iniciar sesion', async() => {
        signIn('laboratoria1@gmail.com', '12345678');
        await mockSdk.auth().changeAuthState({
            email: 'laboratoria1@gmail.com',
        });
        expect(window.location.hash).toBe('#/feed');
    });
});

describe('signInWithGoogle', () => {
    it('Deberia ser una funcion', () => {
        expect(typeof(signInWithGoogle)).toBe('function');
    });
    it('Deberia poder iniciar sesion con Google', () => signInWithGoogle().then((result) => {
        expect(typeof result).toBe('object');
    }));
});

// funcion de iniciar sesion con google
describe('Iniciar sesion con google', () => {
    it('Deberia iniciar sesion con Google', () => {
        signInWithGoogle().then((user) => {
            expect(user.isAnonymous).toBe(false);
        });
    });
});

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
        expect(typeof(signIn)).toBe('function');
    });
    it('Deberia poder iniciar sesion', () => signIn('lore4@gmail', '123456')
        .then((user) => {
            expect(user.email).toBe('lore4@gmail');
        }));
});