const { addComentario, getComentarios, deleteComentario } = require("../models/Comentario");

// Crear un comentario
exports.createComentario = async (req, res) => {
    const { id_usuario_sql, id_referencia_sql, tipo_referencia, contenido, respuestas = [] } = req.body;

    try {
        const id = await addComentario({
            id_usuario_sql,
            id_referencia_sql,
            tipo_referencia,
            contenido,
            fecha_comentario: new Date(),
            respuestas
        });
        res.status(201).json({ message: "Comentario creado", id });
    } catch (error) {
        res.status(500).json({ error: "Error al crear el comentario", details: error.message });
    }
};

// Obtener comentarios
exports.getComentarios = async (req, res) => {
    try {
        const comentarios = await getComentarios(req.query);
        res.status(200).json(comentarios);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener comentarios", details: error.message });
    }
};

// Eliminar un comentario
exports.deleteComentario = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedCount = await deleteComentario(id);
        if (deletedCount > 0) {
            res.status(200).json({ message: "Comentario eliminado" });
        } else {
            res.status(404).json({ error: "Comentario no encontrado" });
        }
    } catch (error) {
        res.status(500).json({ error: "Error al eliminar el comentario", details: error.message });
    }
};
