export const feed = () => {
    // Esta variable almacena la porción de html a adjuntar en el body
    const viewFeed = `
        <header class="header-feed">
          <img class="logo-feed" src="img/logo.png"> 
          <div class="icons">
            <img class="imgHome-header" title="Inicio" src="./img/home.png">
            <img class="imgLogout-header" title="Cerrar sesión" src="./img/logout.png">
          </div>
        </header>
        <main>
        <div class="createPost">
          <img class="imgProfile" src="./img/imgProfile.png">
          <h3 id="userName">Amandine Perenceja </h3>
          <textarea class="inputPost" placeholder="Hablemos de cine..."></textarea>
          <button id="postButton">Publicar</button>
        </div>
          <div class="post">
            <img class="imgProfile" src="./img/imgProfile.png">
            <h3 id="userName">Amandine Perenceja </h3>
            <div id="editPost" title="Editar">🖉</div>
            <div id="deletePost" title="Borrar">🗑</div>
            <h3 id="textPost">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque maximus elit a tellus consectetur tempus. Aliquam tristique nisl id. </h3>
            <img class="like" title="Me gusta" src="./img/like.png">
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
    return main;
};