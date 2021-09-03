import MockFirebase from 'mock-cloud-firestore';
// En este archivo se hacen las pruebas para Firestore
import {
  getPost,
  deletePost,
  updatePost,
  getPosts,
} from '../src/lib/index.js';

const fixtureData = {
  __collection__: {
    posts: {
      __doc__: {
        postUno: {
          dataTime: 1630531680392,
          name: 'Lore',
          post: 'Que bonita nuestra app',
          uid: '123456',
        },
        postDos: {
          dataTime: 1630531817574,
          name: 'Lu',
          post: 'Hola mundo',
          uid: '789123',
        },
        postTres: {
          dataTime: 1630531563977,
          name: 'Dannis',
          post: 'Probando... Sonido... Sonido...',
          uid: '456789',
        },
        postCuatro: {
          dataTime: 1630533845349,
          name: 'Monstruo',
          post: 'No les va a funcionar el test',
          uid: '987654',
        },
      },
    },
  },
};

window.firebase = new MockFirebase(fixtureData);

describe('getPost', () => {
  it('Debería poder obtener el post id= postCuatro', async () => {
    await getPost('postCuatro').then((doc) => {
      const result = doc.data();
      expect(result.post).toBe('No les va a funcionar el test');
    });
  });
});

describe('deletePost', () => {
  it('Debería poder eliminar el post con id: postCuatro', () => {
    deletePost('postCuatro').then((doc) => {
      const result = doc.data();
      expect(result.post).toBe(undefined);
      getPost('postCuatro');
    });
  });
});

describe('updatePost', () => {
  it('debería poder actualizar un post por su id: postCuatro', async () => {
    const posts = await getPosts();
    posts.forEach((doc) => {
      if (doc.id === 'postCuatro') {
        updatePost('postCuatro', { post: 'Sí nos va a pasar el test' }).then(() => {
          const result = doc.data();
          expect(result.post).toBe('Sí nos va a pasar el test');
        });
      }
    });
  });
});
