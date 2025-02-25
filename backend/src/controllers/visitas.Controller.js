const { addVisita, getVisitas } = require("../models/visitas.model");

exports.addVisita = async (req, res) => {
    const { id_usuario_sql, id_referencia_sql } = req.body;

    if (!id_usuario_sql || !id_referencia_sql) {
        return res.status(400).json({ error: "Faltan datos requeridos" });
    }

    try {
        const visita = {
            id_usuario_sql,
            id_referencia_sql,
            visitas: +1
        }

        const id = await addVisita(visita);
        res.status(201).json({ message: "Visita creada", id });
    }
    catch (error) {
        res.status(500).json({ error: "Error al crear la visita", details: error.message });
    }
};

exports.getVisitas = async (req, res) => {
    const filtro = {};

    if (req.query.id_referencia_sql) {
        filtro.id_referencia_sql = req.query.id_referencia_sql;
    }
    if (req.query.id_usuario_sql) {
        filtro.id_usuario_sql = req.query.id_usuario_sql;
    }

    try {
        const visitas = await getVisitas(filtro);
        res.status(200).json(visitas);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener las visitas", details: error.message });
    }
};