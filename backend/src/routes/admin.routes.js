// routes/admin.routes.js
const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin.controller.js');
const { requireAdmin } = require('../middleware/auth.middleware.js');

// Todas las rutas definidas a partir de aquí requieren rol de admin
router.use(requireAdmin);

// Ruta para obtener todos los animales (para listarlos en el panel)
router.get('/animals', adminController.getAnimals);

// Ruta para actualizar la visibilidad de un animal
router.put('/animals/:id/visibility', adminController.updateAnimalVisibility);

module.exports = router;
