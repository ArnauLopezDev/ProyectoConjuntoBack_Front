// // Simulando una base de datos simple en memoria
// let animals = [];

// exports.getAllAnimals = () => {
//     return animals;
// };

// exports.createAnimal = (name, species) => {
//     const newAnimal = { id: animals.length + 1, name, species };
//     animals.push(newAnimal);
//     return newAnimal;
// };

// exports.getAnimalById = (id) => {
//     console.log("baguette");
//     return animals.find(animal => animal.id === id);
// };

// exports.updateAnimal = (id, name, species) => {
//     const animal = animals.find(a => a.id === id);
//     if (animal) {
//         animal.name = name || animal.name;
//         animal.species = species || animal.species;
//         return animal;
//     }
//     return null;
// };

// exports.deleteAnimal = (id) => {
//     const index = animals.findIndex(a => a.id === id);
//     if (index !== -1) {
//         animals.splice(index, 1);
//         return true;
//     }
//     return false;
// };

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
// Fetch all animals
exports.getAllAnimals = async () => {
    try {
        const [rows] = await pool.query("SELECT * FROM Animales");
        return rows;
    } catch (error) {
        console.error("Error fetching animals:", error);
        throw error;
    }
};

// Create a new animal
exports.createAnimal = async (image, name, species, habitat, dieta, estado_salud, id_zoologico) => {
    try {
        const [result] = await pool.query(
            "INSERT INTO Animales (image, name, species, habitat, dieta, estado_salud, id_zoologico) VALUES (?, ?, ?, ?, ?, ?, ?)",
            [image, name, species, habitat, dieta, estado_salud, id_zoologico]
        );
        return { id: result.insertId, image, name, species, habitat, dieta, estado_salud, id_zoologico };
    } catch (error) {
        console.error("Error creating animal:", error);
        throw error;
    }
};

// Fetch an animal by ID
exports.getAnimalById = async (id) => {
    try {
        const [rows] = await pool.query("SELECT * FROM Animales WHERE id_animal = ?", [id]);
        return rows[0] || null;
    } catch (error) {
        console.error("Error fetching animal by ID:", error);
        throw error;
    }
};

// Update an animal
exports.updateAnimal = async (id, image, name, species, habitat, dieta, estado_salud) => {
    try {
        const [result] = await pool.query(
            "UPDATE Animales SET image = ?, name = ?, species = ?, habitat = ?, dieta = ?, estado_salud = ? WHERE id_animal = ?",
            [image, name, species, habitat, dieta, estado_salud, id]
        );
        return result.affectedRows > 0;
    } catch (error) {
        console.error("Error updating animal:", error);
        throw error;
    }
};

// Delete an animal
exports.deleteAnimal = async (id) => {
    try {
        const [result] = await pool.query("DELETE FROM Animales WHERE id_animal = ?", [id]);
        return result.affectedRows > 0;
    } catch (error) {
        console.error("Error deleting animal:", error);
        throw error;
    }
};
