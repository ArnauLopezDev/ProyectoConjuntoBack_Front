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
/* Estilos generales */
body {
  font-family: 'Arial', sans-serif;
  margin: 0;
  padding: 0;
  color: #333;
  background-color: #f4f4f9;
  line-height: 1.6;
}

header {
  background-color: #4CAF50;
  padding: 1rem 0;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

header nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

.boton {
  background-color: #007bff;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  text-decoration: none;
  display: inline-block;
  
}

.boton:hover {
  background-color: #0056b3;
}

header nav a {
  color: white;
  text-decoration: none;
  margin: 0 0.5rem;
  font-weight: bold;
  transition: color 0.3s;
}

header nav a:hover {
  color: #ffdd57;
}

main {
  max-width: 1200px;
  margin: 2rem auto;
  padding: 0 1rem;
}

section {
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
  padding: 1.5rem;
}

section h2 {
  color: #4CAF50;
  margin-bottom: 1rem;
  border-bottom: 2px solid #4CAF50;
  display: inline-block;
  padding-bottom: 0.3rem;
}

section img {
  display: block;
  margin: 1rem 0;
  border-radius: 8px;
}

section p {
  margin: 1rem 0;
  color: #555;
}

ul {
  list-style: none;
  padding: 0;
}

ul li {
  background: #e8f5e9;
  margin: 0.5rem 0;
  padding: 0.5rem;
  border-radius: 4px;
  color: #333;
}

footer {
  text-align: center;
  background-color: #4CAF50;
  color: white;
  padding: 1rem 0;
  margin-top: 2rem;
}

footer a {
  color: #ffdd57;
  text-decoration: none;
  margin: 0 0.5rem;
}

footer a:hover {
  text-decoration: underline;
}

/* Diseño responsivo */
@media (max-width: 768px) {
  header nav {
    flex-wrap: wrap;
  }

  header nav a {
    margin: 0.5rem 0;
  }

  section {
    padding: 1rem;
  }

  section img {
    width: 100%;
  }
  
}

  </style>