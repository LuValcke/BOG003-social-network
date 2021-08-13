// aqui exportaras las funciones que necesites

export const createUser = (email, password) => {
    /* Esta función utiliza un método de Firebase para crear un usuario con email y contraseña */
    return auth.createUserWithEmailAndPassword(email, password)
};

export const signIn = (email, password) => {
    /* Esta función utiliza un método de Firebase para loguear un usuario con email y contraseña */
    return auth.signInWithEmailAndPassword(email, password)
};

export const signInWithGoogle = () => {
    /* Esta función utiliza un método de Firebase para crear y loguear un usuario con cuenta de Google  */
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
}