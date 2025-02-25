// controllers/admin.controller.js
const animalModel = require('../models/animals.model.js');

exports.updateAnimalVisibility = async (req, res) => {
    const { id } = req.params;
    const { mostrar } = req.body;

    if (typeof mostrar !== 'boolean') {
        return res.status(400).json({ error: 'El campo "mostrar" debe ser booleano' });
    }

    try {
        const success = await animalModel.updateAnimalVisibility(parseInt(id), mostrar);
        if (!success) {
            return res.status(404).json({ error: 'Animal no encontrado' });
        }
        res.status(200).json({ message: 'Visibilidad del animal actualizada correctamente' });
    } catch (error) {
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

exports.getAnimals = async (req, res) => {
    try {
        const animals = await animalModel.getAllAnimals();
        res.status(200).json(animals);
    } catch (error) {
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};
