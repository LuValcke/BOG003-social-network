import {
  createPost,
  getPosts,
  onGetPost,
  deletePost,
  getPost,
  updatePost,
  sortPost,
} from '../index.js';

export const feed = () => {
  // Esta variable almacena la porción de html a adjuntar en el body
  const userName = firebase.auth().currentUser.displayName;
  const viewFeed = `
        <header class="header-feed">
          <img class="logo-feed" src="img/logo.png"> 
          <div class="icons">
            <img class="imgHome-header" title="Inicio" src="./img/home.png">
            <img class="imgLogout-header" title="Cerrar sesión" src="./img/logout.png">
          </div>
        </header>
        <main>
        <div class="displayPost">
          <div class="createPost">
            <img class="imgProfile" src="./img/imgProfile.png">
            <h3 id="userName">${userName}</h3>
            <textarea class="inputPost" placeholder="Hablemos de cine..."></textarea>
            <button id="postButton">Publicar</button>
          </div>
        </div>
          <div class="postContainer">
          </div>
        </main>
        <footer class="footer-feed">
          <img class="imgHome" src="./img/home.png">
          <img class="imgPost" src="./img/post.png">
          <img class="imgLogout" src="./img/logout.png">
        </footer>
      `;
  // Aquí se crea el div contenedor donde se adjunta la variable viewLogin
  const main = document.createElement('div');
  main.className = 'feed';
  main.innerHTML = viewFeed;

  const btnPostMobile = main.querySelector('.imgPost');

  btnPostMobile.addEventListener('click', () => {
    main.querySelector('.displayPost').style.display = 'block';
  });

  let editStatus = false;

  let id = '';

  const btnPost = main.querySelector('#postButton');

  const post = main.querySelector('.inputPost');

  const uid = firebase.auth().currentUser.uid;

  const name = firebase.auth().currentUser.displayName;

  const postContainer = main.querySelector('.postContainer');

  const date = new Date().toLocaleDateString('es-Es');

  const time = new Date().toLocaleTimeString('es-Es');

  btnPost.addEventListener('click', async () => {
    if (!editStatus) {
      await createPost(post.value, uid, name, date, time);
    } else {
      await updatePost(id, {
        post: post.value,
        uid,
        name,
        date,
        time,
      });
      editStatus = false;
      id = '';
      btnPost.innerText = 'Publicar';
    }
    post.value = '';
    post.focus();
  });
  onGetPost(() => {
    getPosts().then((querySnapshot) => {
      postContainer.innerHTML = '';
      console.log(sortPost(querySnapshot, date));
      querySnapshot.forEach((doc) => {
        postContainer.innerHTML += `
        <div class='post'>
          <img class="imgProfile" src="./img/imgProfile.png">
          <h3 id="userName">${doc.data().name}</h3>
          <div class="editPost" title="Editar" data-id="${doc.id}">🖉</div>
          <div class="deletePost" title="Borrar" data-id="${doc.id}">🗑</div>
          <h3 id="textPost">${doc.data().post}</h3>
          <h6 id="date">${doc.data().time} ${doc.data().date}</h6>
          <img class="like" title="Me gusta" src="./img/like.png">
        </div>
        `;
        const btnDelete = main.querySelectorAll('.deletePost');
        btnDelete.forEach((btn) => {
          btn.addEventListener('click', async (e) => {
            await deletePost(e.target.dataset.id);
          });
        });
        const btnEdit = main.querySelectorAll('.editPost');
        btnEdit.forEach((btn) => {
          btn.addEventListener('click', async (e) => {
            const docPost = await getPost(e.target.dataset.id);
            post.value = docPost.data().post;
            btnPost.innerText = 'Editar';
            editStatus = true;
            id = docPost.id;
          });
        });
      });
    });
  });
  return main;
};
