const express = require('express');
const router = express.Router();
const zoologicoController = require('../controllers/zoologico.Controller');

// Rutas publicas
router.get('/', zoologicoController.getZoologicos);
router.get('/:id', zoologicoController.getZoologicoById);
router.get('/:id/animals', zoologicoController.getAnimalsByZoologico);
router.get('/:id/eventos', zoologicoController.getEventosByZoologico);
// Rutas protegidas por rol de administrador
router.post('/', zoologicoController.createZoologico);
router.put('/:id', zoologicoController.updateZoologico);
router.delete('/:id', zoologicoController.deleteZoologico);

module.exports = router;