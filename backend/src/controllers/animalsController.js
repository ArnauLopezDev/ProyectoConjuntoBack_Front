// animalsController.js
const animalModel = require('../models/animals.model.js');

exports.getAnimals = (req, res) => {
    const animals = animalModel.getAllAnimals();
    res.status(200).json(animals);
};

exports.createAnimal = (req, res) => {
    const { name, species } = req.body;
    const newAnimal = animalModel.createAnimal(name, species);
    res.status(201).json(newAnimal);
};

exports.getAnimalById = (req, res) => {
    const animal = animalModel.getAnimalById(parseInt(req.params.id));
    if (!animal) {
        return res.status(404).json({ message: 'Animal no encontrado' });
    }
    res.status(200).json(animal);
};

exports.updateAnimal = (req, res) => {
    const animal = animalModel.updateAnimal(parseInt(req.params.id), req.body.name, req.body.species);
    if (!animal) {
        return res.status(404).json({ message: 'Animal no encontrado' });
    }
    res.status(200).json(animal);
};

exports.deleteAnimal = (req, res) => {
    const success = animalModel.deleteAnimal(parseInt(req.params.id));
    if (!success) {
        return res.status(404).json({ message: 'Animal no encontrado' });
    }
    res.status(204).send();
};
