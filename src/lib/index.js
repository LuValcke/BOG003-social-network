// aqui exportaras las funciones que necesites
/* eslint-disable */
export const createUser = (email, password) => {
  return firebase.auth().createUserWithEmailAndPassword(email, password)
};

export const signIn = (email, password) => {
  return firebase.auth().signInWithEmailAndPassword(email, password)
    .then(() => {
      window.location.hash = '#/feed';
    })
};

export const signInWithGoogle = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  return firebase.auth().signInWithPopup(provider);
}

export const createPost = (post, uid, name, date, time) => {
  return firebase.firestore().collection('posts').doc().set({
    post,
    uid,
    name,
    date,
    time,
  })
};

export const getPosts = () => firebase.firestore().collection('posts').get();

export const getPost = (id) => firebase.firestore().collection('posts').doc(id).get();

export const onGetPost = (callback) => firebase.firestore().collection('posts').onSnapshot(callback);

export const deletePost = idPost => firebase.firestore().collection('posts').doc(idPost).delete();

export const updatePost = (id, updatedPost) => firebase.firestore().collection('posts').doc(id).update(updatedPost);

export const sortPost = (doc, date) => doc.sort((a, b) => (b.date > a.date ? 1 : -1)); 