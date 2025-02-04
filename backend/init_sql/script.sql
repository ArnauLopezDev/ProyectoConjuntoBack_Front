
CREATE DATABASE zoologicos;
USE zoologicos;

CREATE TABLE Usuarios (
    id_usuario INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    contrasena VARCHAR(255) NOT NULL,
    rol ENUM('administrador', 'visitante', 'empleado') NOT NULL
);

CREATE TABLE Zoologicos (
    id_zoologico INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    ubicacion VARCHAR(255) NOT NULL,
    horario_apertura TIME NOT NULL,
    horario_cierre TIME NOT NULL
);

-- Insert sample zoo first
INSERT INTO Zoologicos (name, ubicacion, horario_apertura, horario_cierre) VALUES
('Zoológico Central', 'Ciudad Ejemplo', '09:00:00', '18:00:00');

CREATE TABLE Animales (
    id_animal INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    specie VARCHAR(100) NOT NULL,
    habitat VARCHAR(100) NOT NULL,
    dieta VARCHAR(255) NOT NULL,
    estado_salud VARCHAR(255),
    id_zoologico INT NOT NULL,
    FOREIGN KEY (id_zoologico) REFERENCES Zoologicos(id_zoologico)
        ON DELETE CASCADE ON UPDATE CASCADE
);

-- Now insert animals referencing the existing zoo (id_zoologico = 1)
INSERT INTO Animales (name, specie, habitat, dieta, estado_salud, id_zoologico) VALUES
('León', 'Panthera leo', 'Sabana', 'Carnívoro', 'Saludable', 1),
('Elefante', 'Loxodonta', 'Selva', 'Herbívoro', 'Saludable', 1);

CREATE TABLE Eventos (
    id_evento INT AUTO_INCREMENT PRIMARY KEY,
    name_evento VARCHAR(150) NOT NULL,
    fecha DATE NOT NULL,
    descripcion TEXT NOT NULL,
    id_zoologico INT NOT NULL,
    FOREIGN KEY (id_zoologico) REFERENCES Zoologicos(id_zoologico) ON DELETE CASCADE
);
CREATE TABLE Tickets (
    id_ticket INT AUTO_INCREMENT PRIMARY KEY,
    fecha_compra DATE NOT NULL,
    id_usuario INT NOT NULL,
    id_evento INT NOT NULL,
    FOREIGN KEY (id_usuario) REFERENCES Usuarios(id_usuario) 
        ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (id_evento) REFERENCES Eventos(id_evento) 
        ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE TABLE Visitas (
    id_visita INT AUTO_INCREMENT PRIMARY KEY,
    fecha_visita DATE NOT NULL,
    id_usuario INT NOT NULL,
    id_zoologico INT NOT NULL,
    FOREIGN KEY (id_usuario) REFERENCES Usuarios(id_usuario) 
        ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (id_zoologico) REFERENCES Zoologicos(id_zoologico) 
        ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE USER 'user'@'%' IDENTIFIED BY 'user';
GRANT ALL PRIVILEGES ON *.* TO 'user'@'%' WITH GRANT OPTION;
FLUSH PRIVILEGES;