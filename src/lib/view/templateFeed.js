export const feed = () => {
  // Esta variable almacena la porción de html a adjuntar en el body
  const viewFeed = `
        <header class="header-feed">
          <img class="logo-feed" src="img/logo.png"> 
          <div class="icons">
            <img class="imgHome-header" src="./img/home.png">
            <img class="imgLogout-header" src="./img/logout.png">
          </div>
        </header>
        <main>
          <div class="post">
            <img class="imgProfile" src="./img/imgProfile.png">
            <h2 id="userName">Amandine Perenceja</h2>
            <h3 id="textPost">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque maximus elit a tellus consectetur tempus. Aliquam tristique nisl id. </h3>
            <img class="like" src="./img/like.png">
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
