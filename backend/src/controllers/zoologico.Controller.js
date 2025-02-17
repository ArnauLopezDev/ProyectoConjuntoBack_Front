const zoologicoModel = require('../models/zoologicos.model.js');

exports.getZoologicos = async (req, res) => {
    try {
        const zoologicos = await zoologicoModel.getAllZooos();
        res.status(200).json(zoologicos);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los zoológicos', error });
    }
};

exports.createZoologico = async (req, res) => {
    const { nombre, description, ubicacion, horario_apertura, horario_cierre } = req.body;
    try {
        const newZoologico = await zoologicoModel.createZoologico(nombre, description, ubicacion, horario_apertura, horario_cierre);
        res.status(201).json(newZoologico);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear el zoológico', error });
    }
};

exports.getZoologicoById = async (req, res) => {
    try {
        const zoologico = await zoologicoModel.getZoologicoById(parseInt(req.params.id));
        if (!zoologico) {
            return res.status(404).json({ message: 'Zoológico no encontrado' });
        }
        res.status(200).json(zoologico);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener el zoológico', error });
    }
};

exports.updateZoologico = async (req, res) => {
    const { nombre, description, ubicacion, horario_apertura, horario_cierre, mapa } = req.body;
    try {
        const success = await zoologicoModel.updateZoologico(
            parseInt(req.params.id),
            nombre,
            description,
            ubicacion,
            horario_apertura,
            horario_cierre,
            mapa
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
        const success = await zoologicoModel.deleteZoologico(parseInt(req.params.id));
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
        const animals = await zoologicoModel.getAnimalByZooID(parseInt(req.params.id));
        res.status(200).json(animals);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los animales del zoológico', error });
    }
};
exports.getEventosByZoologico = async (req, res) => {
    try {
        const eventos = await zoologicoModel.getEventosByZooID(parseInt(req.params.id));
        res.status(200).json(eventos);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los eventos del zoológico', error });
    }
};