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
          <h2><a href="https://www.molloparc.com/es/">Malló parc</a></h2>
        
          <h4>Molló Parc, situado en el corazón del Valle de Camprodon, ofrece una variedad de actividades para disfrutar en plena naturaleza:</h4>
          <p>Recorrido por el Parque de Animales: Pasea por senderos forestales y observa especies autóctonas como osos, linces, lobos, águilas reales, marmotas, ciervos, jabalíes y zorros en semi-libertad. El recorrido dura aproximadamente 2-3 horas y cuenta con áreas de descanso y zonas de picnic.</p>
          <p>Molló Parc Aventura: Disfruta de circuitos de aventura entre los árboles, con tirolinas y puentes tibetanos. Hay cuatro circuitos de diferentes niveles de dificultad, aptos para todas las edades, incluyendo uno diseñado para niños de 2 a 5 años.</p>
          <p>Área de Granja: Interactúa con animales de granja como cabras, ponis, conejos y gallinas. Es una experiencia ideal para los más pequeños, que pueden acercarse y aprender sobre estos animales en un entorno seguro.</p>
          <p>Senderismo y Naturaleza: Aprovecha los senderos del parque para disfrutar de la flora local, incluyendo pinos, robles y hayas. Es una oportunidad para los amantes de la naturaleza y el senderismo.</p>
            <hr>
            <br>

            <h2>Servicios disponibles en el parque:</h2>
            <p>Zonas de Picnic: El parque cuenta con dos áreas de picnic al aire libre donde los visitantes pueden descansar y comer durante su recorrido. Ambas zonas disponen de máquinas expendedoras de bebidas y aperitivos que funcionan todo el año.</p>
            <p>Cafetería/Bar: Ubicada en una de las áreas de picnic, la cafetería ofrece una variedad de opciones como pizzas, bocadillos, hamburguesas y helados. El horario de atención varía según la temporada, por lo que se recomienda consultar el calendario del parque para obtener información actualizada.</p>
            <p>Tienda de Recuerdos: En la entrada del parque, los visitantes pueden encontrar una tienda de recuerdos donde adquirir souvenirs relacionados con la fauna y flora del parque.</p>
            
            
            <hr> 
            <br>
            <h2>Algunos animales del zoologico</h2>
            <p>Mamíferos: Osos pardos, Lobos, Linces, Marmotas, Ciervos, Jabalíes, Zorros.</p>
            <p>Aves: Águilas reales, Búhos reales, Urogallos.</p>
            <p>Animales de granja: Cabras, Ovejas, Gallinas, Ponis.</p>


          <hr> 
          <br>
          <h2>Horarios</h2>
          <p>Molló Parc está abierto al público durante todo el año, excepto los días 25 y 26 de diciembre, y el 1 y 6 de enero.</p>
          <p>El horario de apertura varía según la temporada, por lo que se recomienda consultar el calendario actualizado en la página oficial del parque antes de planificar tu visita.</p>
  	      

          <hr>
          <br>
          <h2>Entradas</h2>
          <p>Adultos (a partir de 14 años): 17,00 € por persona.</p>
          <p>Niños de 3 a 13 años: 13,00 € por persona.</p>
          <p>Niños menores de 3 años: Entrada gratuita.</p>
          <p>Personas mayores de 65 años: 13,00 € por persona.</p>
          <p>Personas con discapacidad:</p>
          <p>Adultos: 13,00 € por persona.</p>
          <p>Niños: 9,00 € por persona.</p>

          <hr>
          <br>
          <h2>Mapa</h2>
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d833242.0177507405!2d1.6554681473751836!3d42.54753982679437!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12a54d9421e73c91%3A0x434865ad9ef17d09!2sMoll%C3%B3%20Parc%20-%20Parc%20d&#39;animals%20a%20la%20Vall%20de%20Camprodon!5e1!3m2!1ses!2ses!4v1738584059809!5m2!1ses!2ses" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
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