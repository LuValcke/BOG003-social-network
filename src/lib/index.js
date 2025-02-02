// Funciones de Auth y Firestore

export const createUser = (email, password) => firebase.auth()
  .createUserWithEmailAndPassword(email, password);

export const emailVerification = () => firebase.auth().currentUser.sendEmailVerification();

export const signIn = (email, password) => firebase.auth()
  .signInWithEmailAndPassword(email, password);

export const signInWithGoogle = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  return firebase.auth().signInWithPopup(provider);
};

export const createPost = (post, uid, name, dataTime) => firebase.firestore()
  .collection('posts').doc().set({
    post,
    uid,
    name,
    dataTime,
    likes: [],
  });

/* La siguiente función obtiene todos los posts y
los organiza de manera descendente según su fecha y hora */
export const getPosts = () => firebase.firestore().collection('posts').orderBy('dataTime', 'desc').get();

/* La siguiente función trae un post de acuerdo a su id */
export const getPost = (id) => firebase.firestore().collection('posts').doc(id).get();

/* La siguiente función actúa como listener trayendo una instantánea
del documento de inmediato con los contenidos actuales de ese documento. */
export const onGetPost = (callback) => firebase.firestore().collection('posts').onSnapshot(callback);

export const deletePost = (idPost) => firebase.firestore().collection('posts').doc(idPost).delete();

export const updatePost = (id, updatedPost) => firebase.firestore().collection('posts').doc(id).update(updatedPost);

export const formatDateTime = (dataTime) => new Intl.DateTimeFormat('default', {
  year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric',
}).format(new Date(dataTime));

export const signOut = () => firebase.auth().signOut();

export const updateLikes = (uid, idPost) => firebase.firestore().collection('posts').doc(idPost).update(({
  likes: firebase.firestore.FieldValue.arrayUnion(uid),
}));

export const removeLikes = (uid, idPost) => firebase.firestore().collection('posts').doc(idPost).update(({
  likes: firebase.firestore.FieldValue.arrayRemove(uid),
}));
