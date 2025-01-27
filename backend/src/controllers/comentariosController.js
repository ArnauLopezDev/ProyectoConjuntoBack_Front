const comentarioModel = require('../models/comentarios.model.js');

exports.getComentarios = async (req, res) => {
    try {
        const comentarios = await comentarioModel.getAll();
        res.status(200).json(comentarios);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los comentarios', error });
    }
};

exports.createComentario = async (req, res) => {
    const { contenido, id_usuario, id_zoologico } = req.body;
    try {
        const newComentario = await comentarioModel.create(contenido, id_usuario, id_zoologico);
        res.status(201).json(newComentario);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear el comentario', error });
    }
};

exports.getComentarioById = async (req, res) => {
    try {
        const comentario = await comentarioModel.getById(parseInt(req.params.id));
        if (!comentario) {
            return res.status(404).json({ message: 'Comentario no encontrado' });
        }
        res.status(200).json(comentario);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener el comentario', error });
    }
};

exports.updateComentario = async (req, res) => {
    const { contenido, id_usuario, id_zoologico } = req.body;
    try {
        const success = await comentarioModel.update(
            parseInt(req.params.id),
            contenido,
            id_usuario,
            id_zoologico
        );
        if (!success) {
            return res.status(404).json({ message: 'Comentario no encontrado' });
        }
        res.status(200).json({ message: 'Comentario actualizado correctamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar el comentario', error });
    }
};

exports.deleteComentario = async (req, res) => {
    try {
        const success = await comentarioModel.delete(parseInt(req.params.id));
        if (!success) {
            return res.status(404).json({ message: 'Comentario no encontrado' });
        }
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el comentario', error });
    }
};
