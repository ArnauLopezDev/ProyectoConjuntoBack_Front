const mysql = require('mysql2');
const config = require('../config/config.js');
const mysqlClient = mysql.createConnection({
    host: config.MYSQL_HOST || "db",
    user: config.MYSQL_USER || "user",
    password: config.MYSQL_PASSWORD || "user",
    database: config.MYSQL_DATABASE || "zoologicos"
});

mysqlClient.connect((err) => {
    console.log('Connecting to MySQL...');
    if (err) {
        console.error('Error connecting to MySQL: ', err);
    } else {
        console.log('Successfully connected to MySQL');
    }
});

module.exports = mysqlClient;
