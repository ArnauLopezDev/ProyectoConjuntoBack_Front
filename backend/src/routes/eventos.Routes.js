
const express = require('express');
const router = express.Router();
const eventoController = require('../controllers/eventos.Controller');

// Rutas publicas
router.get('/', eventoController.getEventos);
router.get('/:id', eventoController.getEventoById);

// Rutas protegidas por rol de administrador
router.post('/', eventoController.createEvento);
router.put('/:id', eventoController.updateEvento);
router.delete('/:id', eventoController.deleteEvento);

module.exports = router;