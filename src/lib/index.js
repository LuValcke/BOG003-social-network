// Funciones de Auth y Firestore
const POST_COLLECTION_NAME = 'posts_new';

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
  .collection(POST_COLLECTION_NAME).doc().set({
    post,
    uid,
    name,
    dataTime,
  });

/* La siguiente función obtiene todos los posts y
los organiza de manera descendente según su fecha y hora */
export const getPosts = () => firebase.firestore().collection(POST_COLLECTION_NAME).orderBy('dataTime', 'desc').get();

/* La siguiente función trae un post de acuerdo a su id */
export const getPost = (id) => firebase.firestore().collection(POST_COLLECTION_NAME).doc(id).get();

/* La siguiente función actúa como listener trayendo una instantánea
del documento de inmediato con los contenidos actuales de ese documento. */
export const onGetPost = (callback) => firebase.firestore().collection(POST_COLLECTION_NAME).onSnapshot(callback);

export const deletePost = (idPost) => firebase.firestore().collection(POST_COLLECTION_NAME).doc(idPost).delete();

export const updatePost = (id, updatedPost) => firebase.firestore().collection(POST_COLLECTION_NAME).doc(id).update(updatedPost);

export const formatDateTime = (dataTime) => new Intl.DateTimeFormat('default', {
  year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric',
}).format(new Date(dataTime));

export const signOut = () => firebase.auth().signOut();

export const updateLikes = (uid, displayName, idPost) => {
  const postRef = firebase.firestore().collection(POST_COLLECTION_NAME).doc(idPost);
  const likedByRef = postRef.collection("likedBy").doc();
  likedByRef.set({
    uid: uid,
    name: displayName,
  });
};

export const removeLikes = (uid, idPost) => {
  const postRef = firebase
    .firestore()
    .collection(POST_COLLECTION_NAME)
    .doc(idPost);
  postRef
    .collection("likedBy")
    .where("uid", "==", uid)
    .get()
    .then((likedBySnapshot) => {
      if (likedBySnapshot.docs.length > 0) {
        let likedByRef = likedBySnapshot.docs[0].ref;
        likedByRef.delete();
      }
    });
};
