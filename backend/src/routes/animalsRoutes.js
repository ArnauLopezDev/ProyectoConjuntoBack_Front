// animalsRoutes.js

const express = require('express');
const router = express.Router();
const animalsController = require('../controllers/animalsController');
// const { authenticate, authenticateAdmin } = require('../middlewares/authMiddleware');

// Rutas públicas
router.get('/', animalsController.getAnimals);
router.get('/:id', animalsController.getAnimalById);

// Rutas protegidas por rol de administrador
router.post('/', animalsController.createAnimal);
router.put('/:id', animalsController.updateAnimal);
router.delete('/:id', animalsController.deleteAnimal);

module.exports = router;
