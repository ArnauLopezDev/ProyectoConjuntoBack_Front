const express = require('express');
const router = express.Router();
const zoologicoController = require('../controllers/zoologico.Controller');

// Rutas publicas
router.get('/', zoologicoController.getZoologicos);
router.get('/:id', zoologicoController.getZoologicoById);

// Rutas protegidas por rol de administrador
router.post('/', zoologicoController.createZoologico);
router.put('/:id', zoologicoController.updateZoologico);
router.delete('/:id', zoologicoController.deleteZoologico);

module.exports = router;