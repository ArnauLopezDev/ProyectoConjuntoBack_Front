const mysql = require("mysql2/promise");
const config = require("../config/config");

// Create a pool for connexions
const pool = mysql.createPool({
    host: config.MYSQL_HOST,
    user: config.MYSQL_USER,
    password: config.MYSQL_PASSWORD,
    database: config.MYSQL_DATABASE,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});

// Modelo para Eventos
exports.eventos = {
    async getAll() {
        const [rows] = await pool.query("SELECT * FROM Eventos");
        return rows;
    },
    async create(nombre_evento, fecha, descripcion, id_zoologico) {
        const [result] = await pool.query(
            "INSERT INTO Eventos (nombre_evento, fecha, descripcion, id_zoologico) VALUES (?, ?, ?, ?)",
            [nombre_evento, fecha, descripcion, id_zoologico]
        );
        return { id: result.insertId, nombre_evento, fecha, descripcion, id_zoologico };
    },
    async getById(id) {
        const [rows] = await pool.query("SELECT * FROM Eventos WHERE id_evento = ?", [id]);
        return rows[0] || null;
    },
    async update(id, nombre_evento, fecha, descripcion, id_zoologico) {
        const [result] = await pool.query(
            "UPDATE Eventos SET nombre_evento = ?, fecha = ?, descripcion = ?, id_zoologico = ? WHERE id_evento = ?",
            [nombre_evento, fecha, descripcion, id_zoologico, id]
        );
        return result.affectedRows > 0;
    },
    async delete(id) {
        const [result] = await pool.query("DELETE FROM Eventos WHERE id_evento = ?", [id]);
        return result.affectedRows > 0;
    },
};