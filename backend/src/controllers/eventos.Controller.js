const eventoModel = require('../models/eventos.model.js');

exports.getEventos = async (req, res) => {
    try {
        const eventos = await eventoModel.eventos.getAll();
        res.status(200).json(eventos);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los eventos', error });
    }
};

exports.createEvento = async (req, res) => {
    const { nombre_evento, fecha, descripcion, id_zoologico } = req.body;
    try {
        const newEvento = await eventoModel.eventos.create(nombre_evento, fecha, descripcion, id_zoologico);
        res.status(201).json(newEvento);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear el evento', error });
    }
};

exports.getEventoById = async (req, res) => {
    try {
        const evento = await eventoModel.eventos.getById(parseInt(req.params.id));
        if (!evento) {
            return res.status(404).json({ message: 'Evento no encontrado' });
        }
        res.status(200).json(evento);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener el evento', error });
    }
};

exports.updateEvento = async (req, res) => {
    const { nombre_evento, fecha, descripcion, id_zoologico } = req.body;
    try {
        const success = await eventoModel.eventos.update(
            parseInt(req.params.id),
            nombre_evento,
            fecha,
            descripcion,
            id_zoologico
        );
        if (!success) {
            return res.status(404).json({ message: 'Evento no encontrado' });
        }
        res.status(200).json({ message: 'Evento actualizado correctamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar el evento', error });
    }
};

exports.deleteEvento = async (req, res) => {
    try {
        const success = await eventoModel.eventos.delete(parseInt(req.params.id));
        if (!success) {
            return res.status(404).json({ message: 'Evento no encontrado' });
        }
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el evento', error });
    }
};
