const zoologicoModel = require('../models/zoologicos.model.js');

exports.getZoologicos = async (req, res) => {
    try {
        const zoologicos = await zoologicoModel.getAll();
        res.status(200).json(zoologicos);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los zoológicos', error });
    }
};

exports.createZoologico = async (req, res) => {
    const { nombre, ubicacion, horario_apertura, horario_cierre } = req.body;
    try {
        const newZoologico = await zoologicoModel.create(nombre, ubicacion, horario_apertura, horario_cierre);
        res.status(201).json(newZoologico);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear el zoológico', error });
    }
};

exports.getZoologicoById = async (req, res) => {
    try {
        const zoologico = await zoologicoModel.getById(parseInt(req.params.id));
        if (!zoologico) {
            return res.status(404).json({ message: 'Zoológico no encontrado' });
        }
        res.status(200).json(zoologico);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener el zoológico', error });
    }
};

exports.updateZoologico = async (req, res) => {
    const { nombre, ubicacion, horario_apertura, horario_cierre } = req.body;
    try {
        const success = await zoologicoModel.update(
            parseInt(req.params.id),
            nombre,
            ubicacion,
            horario_apertura,
            horario_cierre
        );
        if (!success) {
            return res.status(404).json({ message: 'Zoológico no encontrado' });
        }
        res.status(200).json({ message: 'Zoológico actualizado correctamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar el zoológico', error });
    }
};

exports.deleteZoologico = async (req, res) => {
    try {
        const success = await zoologicoModel.delete(parseInt(req.params.id));
        if (!success) {
            return res.status(404).json({ message: 'Zoológico no encontrado' });
        }
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el zoológico', error });
    }
};

exports.getAnimalsByZoologico = async (req, res) => {
    try {
        const animals = await zoologicoModel.getAnimalsByZoologico(parseInt(req.params.id));
        res.status(200).json(animals);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los animales del zoológico', error });
    }
};