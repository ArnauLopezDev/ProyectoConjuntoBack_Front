const mysql = require("mysql2/promise");
const config = require("../config/config");

// Crear un pool de conexiones
const pool = mysql.createPool({
    host: config.MYSQL_HOST,
    user: config.MYSQL_USER,
    password: config.MYSQL_PASSWORD,
    database: config.MYSQL_DATABASE,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});

// Modelo para Comentarios
exports.comentarios = {
    async getAll() {
        const [rows] = await pool.query("SELECT * FROM Comentarios");
        return rows;
    },
    async create(id_usuario, id_evento, comentario, fecha_comentario) {
        const [result] = await pool.query(
            "INSERT INTO Comentarios (id_usuario, id_evento, comentario, fecha_comentario) VALUES (?, ?, ?, ?)",
            [id_usuario, id_evento, comentario, fecha_comentario]
        );
        return { id: result.insertId, id_usuario, id_evento, comentario, fecha_comentario };
    },
    async getById(id) {
        const [rows] = await pool.query("SELECT * FROM Comentarios WHERE id_comentario = ?", [id]);
        return rows[0] || null;
    },
    async update(id, id_usuario, id_evento, comentario, fecha_comentario) {
        const [result] = await pool.query(
            "UPDATE Comentarios SET id_usuario = ?, id_evento = ?, comentario = ?, fecha_comentario = ? WHERE id_comentario = ?",
            [id_usuario, id_evento, comentario, fecha_comentario, id]
        );
        return result.affectedRows > 0;
    },
    async delete(id) {
        const [result] = await pool.query("DELETE FROM Comentarios WHERE id_comentario = ?", [id]);
        return result.affectedRows > 0;
    },
};