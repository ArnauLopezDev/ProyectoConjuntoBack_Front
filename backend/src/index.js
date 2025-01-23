const express = require('express');
const bodyParser = require('body-parser');

const config = require(".config");
const Animals = require("./views/animals.view");
const Zoos = require("./views/zoos.view");
const Tickets = require("./views/tickets.view");
const Eventos = require("./views/eventos.view");
const Visitas = require("./views/visitas.view");

//cration of the express app
const app = express();
const port = config.port || 3000;

app.use(bodyParser.json());
app.use(express.static('public'));

app.use('/api/animals', Animals);
app.use('api/zoo', Zoos);
app.use('api/tickets', Tickets);
app.use('api/eventos', Eventos);
app.use('api/visitas', Visitas);

//start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
