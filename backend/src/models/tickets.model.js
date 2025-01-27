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
// Modelo para Tickets
exports.tickets = {
    async getAll() {
        const [rows] = await pool.query("SELECT * FROM Tickets");
        return rows;
    },
    async create(fecha_compra, id_usuario, id_evento) {
        const [result] = await pool.query(
            "INSERT INTO Tickets (fecha_compra, id_usuario, id_evento) VALUES (?, ?, ?)",
            [fecha_compra, id_usuario, id_evento]
        );
        return { id: result.insertId, fecha_compra, id_usuario, id_evento };
    },
    async getById(id) {
        const [rows] = await pool.query("SELECT * FROM Tickets WHERE id_ticket = ?", [id]);
        return rows[0] || null;
    },
    async update(id, fecha_compra, id_usuario, id_evento) {
        const [result] = await pool.query(
            "UPDATE Tickets SET fecha_compra = ?, id_usuario = ?, id_evento = ? WHERE id_ticket = ?",
            [fecha_compra, id_usuario, id_evento, id]
        );
        return result.affectedRows > 0;
    },
    async delete(id) {
        const [result] = await pool.query("DELETE FROM Tickets WHERE id_ticket = ?", [id]);
        return result.affectedRows > 0;
    },
};