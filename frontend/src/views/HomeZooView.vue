<template>
    <div>
      <header>
        <nav>
          <a href="#">
            <img src="" alt="Logo-panda" width="50">
          </a>
         <router-link to="/home">Home</router-link>          
          <router-link to="/Zoologicos">Zoologicos</router-link>          
          <a href="#">Animales</a>
          <router-link to="/eventos">Eventos</router-link>          
          <a href="#">Login</a>
          <a href="#">Signup</a>
        </nav>
      </header>
  
      <main>
        
<section>
<h2>Lista de los zoologicos más populares de Cataluña</h2>
<router-link to="/Zoologicos"class="boton">
    Lista de Zoologicos
</router-link>
</section>
 

<section>
          <h2>Proximos eventos en los zoologicos</h2>
          <br>
          <router-link to="/eventos" class="boton" >Eventos</router-link>   
          <img src="https://metropolitano.gal/wp-content/uploads/2023/10/Luces-salvajes-portugal.jpg" alt="foto-noche" width="20%">
          <h3>Aventura Salvaje Nocturna</h3>
          <p>Explora el zoológico bajo las estrellas y descubre los secretos de los animales nocturnos. Únete a nuestras visitas guiadas por expertos y aprende sobre las adaptaciones de las especies nocturnas. ¡Una experiencia educativa y emocionante!</p>
          <p><strong>Fecha y Hora:</strong> 30/1/25 20:00</p>
        </section>

<section>
  <h2>zoos en españa</h2>
  <iframe src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d8660312.654402576!2d-3.485664713295834!3d41.59947166630526!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1szoo!5e1!3m2!1ses!2ses!4v1738581332246!5m2!1ses!2ses" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
</section>
      </main>
  
      <footer>
        <p>Síguenos en nuestras redes sociales:</p>
        <a href="#">Instagram</a> | <a href="#">YouTube</a> | <a href="#">LinkedIn</a>
        <p><a href="#">Contacto</a> | <a href="#">Política de Privacidad</a></p>
      </footer>
    </div>
  </template>
  
  <script>
  export default {
    name: 'ZooPrincipal',
  };
  </script>
  
  <style scoped>
header {
    background-color: #4CAF50;
    padding: 10px 0;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

header nav {
    display: flex;
    justify-content: space-around;
    align-items: center;
}

header nav a {
    color: white;
    text-decoration: none;
    font-size: 18px;
    padding: 10px 20px;
    transition: background-color 0.3s ease;
}

header nav a:hover {
    background-color: #45a049;
    border-radius: 5px;
}

header nav img {
    vertical-align: middle;
}

main {
    padding: 20px;
    max-width: 1200px;
    margin: 0 auto;
}

section {
    margin-bottom: 40px;
}

section h2 {
    font-size: 28px;
    margin-bottom: 20px;
}

section h3 {
    font-size: 24px;
    margin-top: 10px;
}

section p {
    font-size: 18px;
    line-height: 1.6;
}

section img {
    display: block;
    margin: 20px auto;
    border-radius: 10px;
}

.boton {
    display: inline-block;
    padding: 10px 20px;
    margin-top: 10px;
    background-color: #4CAF50;
    color: white;
    text-decoration: none;
    border-radius: 5px;
    transition: background-color 0.3s ease;
}

.boton:hover {
    background-color: #45a049;
}

footer {
    background-color: #f1f1f1;
    padding: 10px 0;
    text-align: center;
    box-shadow: 0 -2px 4px rgba(0, 0, 0, 0.1);
}

footer p, footer a {
    font-size: 16px;
    color: #333;
}

footer a {
    text-decoration: none;
    margin: 0 5px;
}

footer a:hover {
    text-decoration: underline;
}

  </style>