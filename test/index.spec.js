// importamos la funcion que vamos a testear
import { myFunction, signIn } from '../src/lib/index';

describe('myFunction', () => {
  it('debería ser una función', () => {
    expect(typeof myFunction).toBe('function');
  });
});


/* describe('signIn', () => {
  it('Debería poder iniciar sesión', (done) => {
    
    signIn('soy@gmail.com', '12345678').then((email) => {
      
      expect(email).toBe('soy@gmail.com');
      done();
    });
  });
}); */

