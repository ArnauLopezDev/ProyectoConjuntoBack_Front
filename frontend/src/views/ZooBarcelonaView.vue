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
          <h2><a href="https://zoobarcelona.cat/es">Zoo de Barcelona</a></h2>
        
          <h4>El Zoo de Barcelona, situado en el Parque de la Ciutadella, cuenta con diversas instalaciones que buscan recrear los hábitats naturales de las especies que alberga. Entre las más destacadas se encuentran:</h4>
          <p>Terrario: Inaugurado en 1972, posee una de las colecciones más amplias de reptiles y anfibios en Europa.</p>
          <p>Aviario: Construido en la década de 1970 y renovado en 2002, alberga alrededor de 70 especies de aves de todo el mundo.</p>
          <p>Palmeral: Ubicado cerca de la entrada, consta de trece aviarios que exhiben diversas especies de guacamayos y cacatúas.</p>
          <p>Galería de Titís: Establecida en 1990, esta área ofrece recintos interiores y exteriores para siete especies de titís y tamarinos.</p>
          <p>Sabana del Sahel: Inaugurada en 2018, esta zona mejora los hábitats de animales africanos como jirafas, leones y elefantes, recreando la vegetación típica de la región del Sahel.</p>
            <hr>
            <br>

            <h2>Servicios disponibles en el parque:</h2>
            <p>Restauración: El parque cuenta con opciones de restauración que incluyen servicio de cafetería, opciones veganas/vegetarianas, menú infantil y comida para llevar a las zonas de pícnic del parque.</p>
            <p>Tienda de recuerdos: Para comprar recuerdos del Zoo de Barcelona y artículos relacionados con la fauna y la naturaleza, visita la tienda del Zoo. </p>
            <p>Áreas de descanso y pícnic: El zoológico dispone de zonas de pícnic donde los visitantes pueden disfrutar de sus propias comidas en un entorno natural. </p>     
            <p>Área de juegos infantiles: Cerca de la instalación de los Flamencos de Cuba, hay una zona de juegos adaptada para niños y niñas con movilidad reducida.</p>
            <p>Accesibilidad: Todas las instalaciones del Zoo están adaptadas para personas con movilidad reducida. Además, se ofrece un servicio gratuito de sillas de ruedas para quienes puedan necesitarlo durante su visita.</p>
            <p>Aparcamiento para bicicletas y patinetes: El zoológico dispone de aparcamientos gratuitos en el interior del parque, junto a cada una de las dos entradas, donde también es posible cargar patinetes eléctricos. Por seguridad, no está permitido circular con estos vehículos dentro del parque. </p>
            <h1>Servicios para familias:</h1>
            <p>Sala de lactancia: Situada al lado del Restaurante La Morera, ofrece un espacio confortable para atender las necesidades de alimentación e higiene de los bebés.</p>
            <p>Cambiadores de pañales: Disponibles en varios lavabos del parque, como los ubicados en Komodos, el Aviario o en la entrada de la calle Wellington.</p>
            <hr> 
            <br>
            <h2>Algunos animales del zoologico</h2>
            <p>León africano: Conocido como el "rey de la selva", este majestuoso felino es uno de los principales atractivos del zoológico.</p>
            <p>Jirafa: El animal terrestre más alto del mundo, fácilmente reconocible por su largo cuello y manchas distintivas.</p>
            <p>Elefante africano: El mamífero terrestre más grande, conocido por sus impresionantes colmillos y orejas de gran tamaño.</p>
            <p>Tigre de Bengala: Este impresionante felino destaca por su pelaje anaranjado con rayas negras y su mirada penetrante.</p>
            <p>Pingüino de Humboldt: Originario de las costas de Perú y Chile, este pingüino se caracteriza por su tamaño mediano y su distintiva franja negra en el pecho.</p>
            


          <hr> 
          <br>
          <h2>Horarios</h2>
          <p>De noviembre a marzo: 10:00 h a 17:00 h.</p>
  	      <p>Abril y octubre: 10:00 h a 18:00 h.</p>
          <p>Mayo y septiembre: 10:00 h a 19:00 h.</p>
          <p>De junio a agosto: 10:00 h a 20:00 h.</p>

          <hr>
          <br>
          <h2>Entradas</h2>
          <p>Adultos (a partir de 13 años): 22,00 €</p>
          <p>Niños (de 3 a 12 años): 13,00 €</p>
          <p>Menores de 3 años: Entrada gratuita</p>
          <p>Personas con diversidad funcional: 5,65 €</p>
          <p>Mayores de 65 años: 11,00 €</p>
          <p>Al presentar el carné de familia monoparental en las taquillas, se aplica un descuento del 20% sobre el precio de la entrada.</p>
          <hr>
          <br>
          <h2>Mapa</h2>
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d964.9925728487788!2d2.187299602570598!3d41.38621300570445!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12a4a2fe3417f6ef%3A0x7c67c58532139b19!2sZoo%20de%20Barcelona!5e1!3m2!1ses!2ses!4v1738579433143!5m2!1ses!2ses" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
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