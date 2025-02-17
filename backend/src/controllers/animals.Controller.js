const animalModel = require('../models/animals.model.js');

exports.getAnimals = async (req, res) => {
    try {
        const animals = await animalModel.getAllAnimals();
        res.status(200).json(animals);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los animales', error });
    }
};

exports.createAnimal = async (req, res) => {
    const { image, name, species, habitat, dieta, estado_salud, id_zoologico } = req.body;
    try {
        const newAnimal = await animalModel.createAnimal(image, name, species, habitat, dieta, estado_salud, id_zoologico);
        res.status(201).json(newAnimal);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear el animal', error });
    }
};

exports.getAnimalById = async (req, res) => {
    try {
        const animal = await animalModel.getAnimalById(parseInt(req.params.id));
        if (!animal) {
            return res.status(404).json({ message: 'Animal no encontrado' });
        }
        res.status(200).json(animal);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener el animal', error });
    }
};

exports.updateAnimal = async (req, res) => {
    const { image, name, especie, habitat, dieta, estado_salud, id_zoologico } = req.body;
    try {
        const success = await animalModel.update(
            parseInt(req.params.id),
            image,
            name,
            especie,
            habitat,
            dieta,
            estado_salud,
            id_zoologico
        );
        if (!success) {
            return res.status(404).json({ message: 'Animal no encontrado' });
        }
        res.status(200).json({ message: 'Animal actualizado correctamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar el animal', error });
    }
};

exports.deleteAnimal = async (req, res) => {
    try {
        const success = await animalModel.delete(parseInt(req.params.id));
        if (!success) {
            return res.status(404).json({ message: 'Animal no encontrado' });
        }
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el animal', error });
    }
};
