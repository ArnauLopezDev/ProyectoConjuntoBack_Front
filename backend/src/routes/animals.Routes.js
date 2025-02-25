// animalsRoutes.js

const express = require('express');
const router = express.Router();
const animalsController = require('../controllers/animals.Controller');
// const { authenticate, isAdmin } = require('../middleware/authMiddleware.js');

// // Rutas protegidas
// router.get('/', authenticate, animalsController.getAnimals);
// router.post('/', authenticate, isAdmin, animalsController.createAnimal);
// router.get('/:id', authenticate, animalsController.getAnimalById);
// router.put('/:id', authenticate, isAdmin, animalsController.updateAnimal);
// router.delete('/:id', authenticate, isAdmin, animalsController.deleteAnimal);

// Rutas públicas
router.get('/', animalsController.getAnimals);
router.get('/:id', animalsController.getAnimalById);
// Rutas protegidas por rol de administrador
router.post('/', animalsController.createAnimal);
router.put('/:id', animalsController.updateAnimal);
router.delete('/:id', animalsController.deleteAnimal);

module.exports = router;
