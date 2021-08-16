// importamos la funcion que vamos a testear

import { signIn } from '../src/lib/index.js';

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