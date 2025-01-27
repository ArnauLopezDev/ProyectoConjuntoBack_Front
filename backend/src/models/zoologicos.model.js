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

// Model Zoológicos
exports.zoologicos = {
    async getAll() {
        const [rows] = await pool.query("SELECT * FROM Zoologicos");
        return rows;
    },
    async create(nombre, ubicacion, horario_apertura, horario_cierre) {
        const [result] = await pool.query(
            "INSERT INTO Zoologicos (nombre, ubicacion, horario_apertura, horario_cierre) VALUES (?, ?, ?, ?)",
            [nombre, ubicacion, horario_apertura, horario_cierre]
        );
        return { id: result.insertId, nombre, ubicacion, horario_apertura, horario_cierre };
    },
    async getById(id) {
        const [rows] = await pool.query("SELECT * FROM Zoologicos WHERE id_zoologico = ?", [id]);
        return rows[0] || null;
    },
    async update(id, nombre, ubicacion, horario_apertura, horario_cierre) {
        const [result] = await pool.query(
            "UPDATE Zoologicos SET nombre = ?, ubicacion = ?, horario_apertura = ?, horario_cierre = ? WHERE id_zoologico = ?",
            [nombre, ubicacion, horario_apertura, horario_cierre, id]
        );
        return result.affectedRows > 0;
    },
    async delete(id) {
        const [result] = await pool.query("DELETE FROM Zoologicos WHERE id_zoologico = ?", [id]);
        return result.affectedRows > 0;
    },
};