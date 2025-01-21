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
    const animal = req.params.animal;
    res.json({ message: 'Hello, World!' });
});
app.get('/api/persona/:persona', (req, res) => {
    console.log(req.params.animal);
    const persona = req.params.persona;
    res.json({ message: 'Hello, World!' });
});
app.get('/api/eventos/:evento', (req, res) => {
    console.log(req.params.animal);
    const evento = req.params.evento;
    res.json({ message: 'Hello, World!' });
});

app.post('/api/animal', (req, res) => {
    console.log(req.body);
    res.json({ message: 'Hello, World!' });
});

app.post('/api/persona', (req, res) => {
    console.log(req.body);
    res.json({ message: 'Hello, World!' });
});

app.post('/api/eventos', (req, res) => {
    console.log(req.body);
    res.json({ message: 'Hello, World!' });
});

app.delete('/api/animal/:animal', (req, res) => {
    console.log(req.params.animal);
    if (!req.session.loggedin) return res.status(401).send('Unauthorized request').redirect("/login");
    else {
        connection.query('DELETE FROM animal WHERE id_animal = ?', [req.params.animal], function (error, results, fields) {
            if (error) throw error;
            res.json({ message: 'Deleted successfully' });
        });
    }
});
app.delete('/api/persona/:persona', (req, res) => {
    console.log(req.params.persona);
    if (!req.session.loggedin) return res.status(401).send('Unauthorized request').redirect("/login");
    else {
        connection.query('DELETE FROM persona WHERE id_persona = ?', [req.params.persona], function (error, results, fields) {
            if (error) throw error;
            res.json({ message: 'Deleted successfully' });
        });
    }

});
app.delete('/api/eventos/:evento', (req, res) => {
    console.log(req.params.evento);
    if (!req.session.loggedin) return res.status(401).send('Unauthorized request').redirect("/login");
    else {
        connection.query('DELETE FROM eventos WHERE id_evento = ?', [req.params.evento], function (error, results, fields) {
            if (error) throw error;
            res.json({ message: 'Deleted successfully' });
        });
    }
});