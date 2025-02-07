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
          <br>
          <h2><a href="https://visitar.zoodelpirineu.com/">Zoo del Pirineu</a></h2>
        
          <h4>El Zoo del Pirineu es un centro de rescate y conservación de fauna autóctona ubicado en los Pirineos catalanes. Sus instalaciones están diseñadas para brindar un entorno adecuado a los animales y ofrecer a los visitantes una experiencia educativa y cercana a la naturaleza.</h4>
          <p>Recintos de animales: El zoológico alberga diversas especies de fauna autóctona, especialmente aves rapaces y mamíferos, en recintos adaptados a sus necesidades específicas.</p>
          <p>Anfiteatro al aire libre: Un espacio destinado a exhibiciones de vuelo y presentaciones educativas, donde los visitantes pueden observar de cerca el comportamiento de las aves y aprender sobre su biología y conservación.</p>
          <p>Áreas de interacción: Zonas designadas para actividades como el "Toca-Toca", donde los visitantes, especialmente niños, tienen la oportunidad de interactuar y acariciar a ciertos animales bajo la supervisión del personal.</p>
          <p>Senderos naturales: Caminos que permiten a los visitantes recorrer el parque y disfrutar del entorno natural, observando tanto a los animales residentes como la fauna salvaje local en su hábitat.</p>
          <p>Servicios para visitantes: El parque cuenta con estacionamiento amplio para coches, autocaravanas y autobuses. </p>
            <hr>
            <br>

            <h2>Servicios disponibles en el parque:</h2>
            <p>El Zoo del Pirineu no dispone de cafeterías ni restaurantes en sus instalaciones. Sin embargo, invita a los visitantes a disfrutar del entorno natural y aprovechar su visita para explorar los establecimientos de la zona que mejor se adapten a sus necesidades y presupuesto. Además, al comer en ciertos establecimientos locales, los visitantes pueden beneficiarse de un 20% de descuento en la entrada a la Visita Guiada y al Espectáculo de Aves Rapaces del Zoo del Pirineu.</p>
            
            <hr> 
            <br>
            <h2>Algunos animales del zoologico</h2>
            <p>Aves rapaces: Águilas, búhos, halcones y otras aves de presa que, debido a lesiones o situaciones de vulnerabilidad, no pueden ser reintroducidas en su hábitat natural.</p>
            <p>Mamíferos autóctonos: Especies como zorros, jabalíes y otros mamíferos propios de la región, muchos de los cuales han sido rescatados y reciben cuidados en el centro.</p>


          <hr> 
          <br>
          <h2>Horarios</h2>
          <p>El parque está abierto de 10:00 h – 18:00 h.</p>
          <p>El Zoo del Pirineu está abierto todos los días del año. Sin embargo, las actividades y experiencias que ofrecen tienen horarios específicos y un número máximo de participantes.</p>
  	      

          <hr>
          <br>
          <h2>Entradas</h2>
          <p>Los precios varían según la actividad seleccionada y el método de compra. Se recomienda visitar su pagina web para obtener mejor sus precios.</p>
          <p>Visita Guiada: Un recorrido educativo por las instalaciones del zoológico, donde se aprende sobre las diferentes especies y su conservación.</p>
          <p>Espectáculo de Aves Rapaces: Una exhibición que permite observar de cerca el vuelo y comportamiento de diversas aves rapaces.</p>
          <p>Experiencia Animal: Una actividad interactiva que ofrece la oportunidad de interactuar directamente con algunos animales bajo la supervisión de los cuidadores.</p>
          <hr>
          <br>
          <h2>Mapa</h2>
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3471.80676097996!2d1.496043212001655!3d42.122025749986165!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12a5c7138a448751%3A0x94a38b73d95dd68c!2sZoo%20del%20Pirineu%20(Visites%20amb%20reserva%20online)!5e1!3m2!1ses!2ses!4v1738580855363!5m2!1ses!2ses" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>        </section>

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
  p::before {
        content: "• "; /* Esto agrega un punto antes del párrafo */
        font-size: 20px; /* Tamaño del punto */
      }
    </style>