const express = require('express');
const router = express.Router();
const visitasController = require('../controllers/visitas.Controller');

// Rutas publicas
router.get('/', visitasController.getVisitas);
router.post('/', visitasController.addVisita);