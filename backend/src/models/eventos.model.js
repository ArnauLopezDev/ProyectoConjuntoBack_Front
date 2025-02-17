const mysql = require("mysql2/promise");
const config = require("../config/config");

// Create a connection pool
const pool = mysql.createPool({
    host: config.MYSQL_HOST || "db",
    user: config.MYSQL_USER || "user",
    password: config.MYSQL_PASSWORD || "user",
    database: config.MYSQL_DATABASE || "zoologicos",
    port: process.env.MYSQL_PORT || 3306,
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
    async create(image, nombre_evento, fecha, tiempo, location, descripcion, id_zoologico) {
        const [result] = await pool.query(
            "INSERT INTO Eventos (image, nombre_evento, fecha, tiempo, location ,descripcion, id_zoologico) VALUES (?, ?, ?, ?, ?,?,?)",
            [image, nombre_evento, fecha, tiempo, location, descripcion, id_zoologico]
        );
        return { id: result.insertId, image, nombre_evento, fecha, tiempo, location, descripcion, id_zoologico };
    },
    async getById(id) {
        const [rows] = await pool.query("SELECT * FROM Eventos WHERE id_evento = ?", [id]);
        return rows[0] || null;
    },
    async update(id, image, nombre_evento, fecha, tiempo, location, descripcion, id_zoologico) {
        const [result] = await pool.query(
            "UPDATE Eventos SET image=?, nombre_evento = ?, fecha = ?, tiempo = ?, location = ?, descripcion = ?, id_zoologico = ? WHERE id_evento = ?",
            [image, nombre_evento, fecha, tiempo, location, descripcion, id_zoologico, id]
        );
        return result.affectedRows > 0;
    },
    async delete(id) {
        const [result] = await pool.query("DELETE FROM Eventos WHERE id_evento = ?", [id]);
        return result.affectedRows > 0;
    },
};