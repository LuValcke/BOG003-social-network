// aqui exportaras las funciones que necesites
/* eslint-disable */
export const createUser = (email, password) => firebase.auth()
  .createUserWithEmailAndPassword(email, password);

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

export const createPost = (post, uid, name, dataTime) => firebase.firestore()
  .collection('posts').doc().set({
      post,
      uid,
      name,
      dataTime,
      likes: [],
    });

export const getPosts = () => firebase.firestore().collection('posts').orderBy('dataTime', 'desc').get();

export const getPost = (id) => firebase.firestore().collection('posts').doc(id).get();

export const onGetPost = (callback) => firebase.firestore().collection('posts').onSnapshot(callback);

export const deletePost = (idPost) => firebase.firestore().collection('posts').doc(idPost).delete();

export const updatePost = (id, updatedPost) => firebase.firestore().collection('posts').doc(id).update(updatedPost);

export const formatDateTime = (dataTime) => new Intl.DateTimeFormat('default', { year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric' }).format(new Date(dataTime));

export const signOut = () => firebase.auth().signOut(); 

export const updateLikes = (uid, idPost) => firebase.firestore().collection('posts').doc(idPost).update(({
  likes: firebase.firestore.FieldValue.arrayUnion(uid)
}));

export const removeLikes = (uid, idPost) => firebase.firestore().collection('posts').doc(idPost).update(({
  likes: firebase.firestore.FieldValue.arrayRemove(uid)
}));