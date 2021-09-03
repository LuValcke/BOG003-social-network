import {
  createPost,
  getPosts,
  onGetPost,
  deletePost,
  getPost,
  updatePost,
  formatDateTime,
  signOut,
  updateLikes,
  removeLikes,
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
            <textarea class="inputPost" placeholder="Hablemos de cine... "></textarea>
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
  // Aquí se crea el div contenedor donde se adjunta la variable viewFeed
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

  const inputPost = main.querySelector('.inputPost');

  inputPost.addEventListener('keydown', () => {
    btnPost.style = 'background-color: #8B1820';
  });

  inputPost.addEventListener('blur', () => {
    btnPost.style = 'background-color: #AFAFAF';
  });

  btnPost.addEventListener('click', async () => {
    if (inputPost.value !== '') {
      const dataTime = new Date().getTime();
      if (!editStatus) {
        // Se crea post nuevo
        await createPost(post.value, uid, name, dataTime);
      } else {
        // Se edita un post ya creado
        await updatePost(id, {
          post: post.value,
          uid,
          name,
          dataTime,
        });
        editStatus = false;
        id = '';
        btnPost.innerText = 'Publicar';
      }
      post.value = '';
      post.focus();
      inputPost.placeholder = 'Hablemos de cine... ';
    } else {
      inputPost.placeholder = 'Por favor escribe algo';
    }
  });
  onGetPost(() => {
    /* En este bloque de código se traen y se renderizan cada uno de los post
    con la funcionalidad de sus botones de editar, borrar, eliminar y like */
    getPosts().then((querySnapshot) => {
      postContainer.innerHTML = '';
      querySnapshot.forEach((doc) => {
        postContainer.innerHTML += `
        <div class='post'>
          <img class="imgProfile" src="./img/imgProfile.png">
          <h3 id="userName">${doc.data().name}</h3>
          ${uid === doc.data().uid ? `
          <div class="editPost" title="Editar" data-id="${doc.id}">🖉</div>
          <div class="deletePost" title="Borrar" data-id="${doc.id}">🗑</div>` : ''}
          <h3 id="textPost">${doc.data().post}</h3>
          <h6 id="date">${formatDateTime(doc.data().dataTime)}</h6>
          ${doc.data().likes.includes(uid) ? `
          <img class="like" title="Me gusta" data-id="${doc.id}" src="./img/like.png"><span class="likesNum">${doc.data().likes.length}</span>` : `<img class="like" title="Me gusta" data-id="${doc.id}" src="./img/unlike.png"><span class="likesNum">${doc.data().likes.length}</span>`}
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
        const btnLike = main.querySelectorAll('.like');
        btnLike.forEach((btn) => {
          btn.addEventListener('click', async (e) => {
            const docPost = await getPost(e.target.dataset.id);
            const like = docPost.data().likes;
            if (like.includes(uid)) {
              removeLikes(uid, e.target.dataset.id);
            } else {
              updateLikes(uid, e.target.dataset.id);
            }
          });
        });
      });
    });
  });

  const btnLogOut = main.querySelector('.imgLogout-header');

  btnLogOut.addEventListener('click', () => {
    signOut().then(() => {
      window.location.hash = '#/login';
    });
  });

  const btnLogOutMobile = main.querySelector('.imgLogout');

  btnLogOutMobile.addEventListener('click', () => {
    signOut().then(() => {
      window.location.hash = '#/login';
    });
  });

  const btnHome = main.querySelector('.imgHome-header');

  btnHome.addEventListener('click', () => {
    window.location.reload();
  });

  const btnHomeMobile = main.querySelector('.imgHome');

  btnHomeMobile.addEventListener('click', () => {
    window.location.reload();
  });

  return main;
};
