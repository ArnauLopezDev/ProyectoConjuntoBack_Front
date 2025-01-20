<?php
header('Content-Type: application/json');
require_once(__DIR__ . '/../configs/config.php');

class Conectar {
    // Method to establish and return the PDO connection
    static function conexion($bd_config) {
        try {
            // Create a new PDO instance
            $conexion = new PDO("mysql:host=" . $bd_config['host'] .";port=3306". ";dbname=" . $bd_config['db'], $bd_config['user'], $bd_config['pass']);
            // Set the character encoding to UTF-8
            $conexion->query("SET NAMES 'utf8'");
            // Set the error mode to exception
            $conexion->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            return $conexion;  // Return the connection object
        } catch (PDOException $e) {
            // Handle connection error
            echo json_encode(['error' => 'No se pudo conectar a la base de datos: ' . $e->getMessage()]);
            exit();  // Stop the script if connection fails
        }
    }
}

// Example usage:
// $conexion = Conectar::conexion($bd_config); 
?>
