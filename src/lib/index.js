// aqui exportaras las funciones que necesites
/* eslint-disable */
export const createUser = (email, password) => {return auth.createUserWithEmailAndPassword(email, password)};

export const signIn = (email, password) => {return auth.signInWithEmailAndPassword(email, password)};

export const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
}