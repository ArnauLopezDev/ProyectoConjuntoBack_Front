// animalsRoutes.js

const express = require('express');
const router = express.Router();
const animalsController = require('../controllers/animalsController');

// Rutas de la API REST para animales
router.get('/', animalsController.getAnimals);
router.post('/', animalsController.createAnimal);
router.get('/:id', animalsController.getAnimalById);
router.put('/:id', animalsController.updateAnimal);
router.delete('/:id', animalsController.deleteAnimal);

module.exports = router;
