// config/database.js
const { Sequelize } = require('sequelize');

// Crear la instancia de Sequelize
const sequelize = new Sequelize('zooDB', 'root', 'password', {
    host: 'localhost',
    dialect: 'mysql', // o 'postgres', 'sqlite', etc.
});

module.exports = sequelize;
