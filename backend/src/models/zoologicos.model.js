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

// Model Zoológicos
exports.getAllZooos = async () => {
    try {
        const [rows] = await pool.query("SELECT * FROM Zoologicos");
        return rows;
    } catch (error) {
        console.error("Error fetching animals:", error);
        throw error;
    }
};
exports.createZoologico = async (name, description, ubicacion, horario_apertura, horario_cierre, mapa) => {
    try {
        const [result] = await pool.query(
            "INSERT INTO Zoologicos (name, description ,ubicacion, horario_apertura, horario_cierre, mapa) VALUES (?, ?,?, ?, ?, ?)",
            [name, description, ubicacion, horario_apertura, horario_cierre, mapa]
        );
        return { id: result.insertId, name, ubicacion, horario_apertura, horario_cierre, mapa };
    } catch (error) {
        console.error("Error creating animal:", error);
        throw error;
    }
};
exports.getZoologicoById = async (id) => {
    try {
        const [rows] = await pool.query("SELECT * FROM Zoologicos WHERE id_zoologico = ?", [id]);
        return rows[0] || null;
    } catch (error) {
        console.error("Error fetching zoologico by ID:", error);
        throw error;
    }
};
exports.updateZoologico = async (id, name, description, ubicacion, horario_apertura, horario_cierre, mapa) => {
    try {
        const [result] = await pool.query(
            "UPDATE Zoologicos SET name = ?, description = ? ,ubicacion = ?, horario_apertura = ?, horario_cierre = ? , mapa = ? WHERE id_zoologico = ?",
            [name, description, ubicacion, horario_apertura, horario_cierre, mapa, id]
        );
        return result.affectedRows > 0;
    } catch (error) {
        console.error("Error updating zoos:", error);
        throw error;
    }
};
exports.deleteZoologico = async (id) => {
    try {
        const [result] = await pool.query("DELETE FROM Zoologicos WHERE id_zoologico = ?", [id]);
        return result.affectedRows > 0;
    } catch (error) {
        console.error("Error deleting zoos:", error);
        throw error;
    }
};
exports.getAnimalByZooID = async (id) => {
    try {
        const [rows] = await pool.query("SELECT * FROM Animales WHERE id_zoologico = ?", [id]);
        return rows;
    } catch (error) {
        console.error("Error getting zoos: ", error);
        throw error;
    }
};

exports.getEventosByZooID = async (id) => {
    try {
        const [rows] = await pool.query("SELECT * FROM Eventos WHERE id_zoologico = ?", [id]);
        return rows;
    } catch (error) {
        console.error("Error getting zoos: ", error);
        throw error;
    }
};
// exports.zoologicos = {
//     async getAll() {
//         const [rows] = await pool.query("SELECT * FROM Zoologicos");
//         return rows;
//     },
//     async create(nombre, ubicacion, horario_apertura, horario_cierre) {
//         const [result] = await pool.query(
//             "INSERT INTO Zoologicos (nombre, ubicacion, horario_apertura, horario_cierre) VALUES (?, ?, ?, ?)",
//             [nombre, ubicacion, horario_apertura, horario_cierre]
//         );
//         return { id: result.insertId, nombre, ubicacion, horario_apertura, horario_cierre };
//     },
//     async getById(id) {
//         const [rows] = await pool.query("SELECT * FROM Zoologicos WHERE id_zoologico = ?", [id]);
//         return rows[0] || null;
//     },
//     async update(id, nombre, ubicacion, horario_apertura, horario_cierre) {
//         const [result] = await pool.query(
//             "UPDATE Zoologicos SET nombre = ?, ubicacion = ?, horario_apertura = ?, horario_cierre = ? WHERE id_zoologico = ?",
//             [nombre, ubicacion, horario_apertura, horario_cierre, id]
//         );
//         return result.affectedRows > 0;
//     },
//     async delete(id) {
//         const [result] = await pool.query("DELETE FROM Zoologicos WHERE id_zoologico = ?", [id]);
//         return result.affectedRows > 0;
//     },
//     async getAnimalByZooID(id) {
//         const [rows] = await pool.query("SELECT * FROM Animales WHERE id_zoologico = ?", [id]);
//         return rows;
//     },
// };