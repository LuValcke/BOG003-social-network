// aqui exportaras las funciones que necesites

export const createUser = (email, password) => {
    auth
        .createUserWithEmailAndPassword(email, password)

};

export const signIn = (email, password) => {
    return auth
        .signInWithEmailAndPassword(email, password)


};

export const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
}