const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
//se pueden realizar varias funciones de get, cada una se podra redirigir a un controlador distinto y estos lo que realizan
//son lo que lo controlador manda y entonces responde con el return del controlador adecuado
app.get('/api/animal/:animal', (req, res) => {
    console.log(req.params.animal);
    res.json({ message: 'Hello, World!' });
});
app.get('/api/persona/:animal', (req, res) => {
    console.log(req.params.animal);
    res.json({ message: 'Hello, World!' });
});