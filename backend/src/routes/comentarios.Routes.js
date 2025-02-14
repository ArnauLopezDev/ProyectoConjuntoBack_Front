const express = require('express');
const router = express.Router();
const comentariosController = require('../controllers/comentarios.Controller');

// Rutas publicas
router.get('/', comentariosController.getComentariosPorReferencia);
// Rutas protegidas por rol de administrador
router.post('/', comentariosController.createComentario);
// router.put('/:id', zoologicoController.updateZoologico);
router.delete('/:id', comentariosController.deleteComentario);

module.exports = router;