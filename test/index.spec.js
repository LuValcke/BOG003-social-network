// importamos la funcion que vamos a testear

import { signIn } from '../src/lib/index.js';

describe('signIn', () => {
  it('Debería retornar error en password', (done) => {
    signIn('juesdavajovi2426@gmail.com', '123456').catch((error) => {
      expect(error.code).toBe('auth/wrong-password');
      done();
    });
  });
});
