// aqui exportaras las funciones que necesites
/* eslint-disable */
export let err

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