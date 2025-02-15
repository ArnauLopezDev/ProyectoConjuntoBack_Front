// models/User.js
const mysql = require('mysql2/promise');
const config = require('../config/config');

// Create a connection pool for better performance.
const pool = mysql.createPool({
    host: process.env.MYSQL_HOST || config.MYSQL_HOST,
    user: process.env.MYSQL_USER || config.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD || config.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE || config.MYSQL_DATABASE,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});

async function getUserByEmail(email) {
    const [rows] = await pool.query('SELECT * FROM Usuarios WHERE email = ?', [email]);
    return rows[0];
}

async function getUserById(id_usuario) {
    const [rows] = await pool.query('SELECT * FROM Usuarios WHERE id_usuario = ?', [id_usuario]);
    return rows[0];
}

async function createUser({ name, email, contrasena, rol }) {
    const [result] = await pool.query(
        'INSERT INTO Usuarios (name, email, contrasena, rol) VALUES (?, ?, ?, ?)',
        [name, email, contrasena, rol]
    );
    return result.insertId;
}

module.exports = {
    getUserByEmail,
    getUserById,
    createUser,
};
