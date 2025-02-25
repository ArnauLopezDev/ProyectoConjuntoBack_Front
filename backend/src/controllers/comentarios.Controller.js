// controllers/comentarios.Controller.js
const { addComentario, getComentarios, deleteComentario } = require("../models/comentarios.model.js");



// Crear un comentario
exports.createComentario = async (req, res) => {
    const { id_usuario_sql, id_referencia_sql, tipo_referencia, contenido, respuestas } = req.body;

    // Validación básica
    if (!id_usuario_sql || !id_referencia_sql || !tipo_referencia || !contenido) {
        return res.status(400).json({ error: "Faltan datos requeridos" });
    }

    try {
        const comentario = {
            id_usuario_sql,
            id_referencia_sql,
            tipo_referencia,
            contenido,
            fecha_comentario: new Date(),
            respuestas: respuestas || []
        };

        const id = await addComentario(comentario);
        res.status(201).json({ message: "Comentario creado", id });
    } catch (error) {
        res.status(500).json({ error: "Error al crear el comentario", details: error.message });
    }
};

// Obtener comentarios
exports.getComentarios = async (req, res) => {
    // Permite filtrar por tipo_referencia e id_referencia_sql
    const filtro = {};
    if (req.query.tipo_referencia) {
        filtro.tipo_referencia = req.query.tipo_referencia;
    }
    if (req.query.id_referencia_sql) {
        // Aseguramos que sea numérico, según como se guarde en la BD SQL
        filtro.id_referencia_sql = parseInt(req.query.id_referencia_sql, 10);
    }

    try {
        const comentarios = await getComentarios(filtro);
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
exports.getComentariosPorReferencia = async (req, res) => {
    try {
        const { tipo_referencia, id_referencia_sql } = req.query;
        let filter = {};

        // Si se proporcionan filtros, aplicarlos
        if (tipo_referencia && id_referencia_sql) {
            filter = {
                tipo_referencia,
                id_referencia_sql: parseInt(id_referencia_sql) // Asegurar que sea un número
            };
        }

        const comentarios = await getComentarios(filter);
        res.json(comentarios);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener comentarios", details: error.message });
    }
};