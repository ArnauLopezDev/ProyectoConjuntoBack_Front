
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
    description VARCHAR(255) NOT NULL,
    ubicacion VARCHAR(255) NOT NULL,
    horario_apertura TIME NOT NULL,
    horario_cierre TIME NOT NULL,
    mapa VARCHAR(900) NOT NULL
);


CREATE TABLE Animales (
    id_animal INT AUTO_INCREMENT PRIMARY KEY,
    image VARCHAR(255),
    name VARCHAR(100) NOT NULL,
    species VARCHAR(100) NOT NULL,
    habitat VARCHAR(100) NOT NULL,
    dieta VARCHAR(255) NOT NULL,
    estado_salud VARCHAR(255),
    id_zoologico INT NOT NULL,
    FOREIGN KEY (id_zoologico) REFERENCES Zoologicos(id_zoologico)
        ON DELETE CASCADE ON UPDATE CASCADE
);


CREATE TABLE Eventos (
    id_evento INT AUTO_INCREMENT PRIMARY KEY,
    image VARCHAR(255),
    name_evento VARCHAR(150) NOT NULL,
    fecha DATE NOT NULL,
    tiempo TIME NOT NULL,
    location VARCHAR(255) NOT NULL,
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

-- Insert sample users
INSERT INTO Usuarios (name, email, contrasena, rol) VALUES
('Admin User', 'admin@example.com', 'hashed_password_1', 'administrador'),
('Visitor One', 'visitor1@example.com', 'hashed_password_2', 'visitante'),
('Visitor Two', 'visitor2@example.com', 'hashed_password_3', 'visitante'),
('Zoo Employee', 'employee@example.com', 'hashed_password_4', 'empleado');

-- Insert sample zoos
INSERT INTO Zoologicos (name, description, ubicacion, horario_apertura, horario_cierre, mapa) VALUES
('Safari Zoo', 'Description of zoo 1', '123 Jungle Road, Wildlife City', '08:00:00', '18:00:00', 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d47828.5940240045!2d2.21082917454835!3d41.47637449525422!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12a4b933e36df3b3%3A0x36f3f3eb05d8534c!2sMasia%20Mas%20Corts!5e0!3m2!1ses!2ses!4v1739792698500!5m2!1ses!2ses'),
('Ocean Park', 'Description of zoo 2', '456 Seaside Avenue, Marine Town', '09:00:00', '19:00:00', 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d47828.5940240045!2d2.21082917454835!3d41.47637449525422!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12a4b933e36df3b3%3A0x36f3f3eb05d8534c!2sMasia%20Mas%20Corts!5e0!3m2!1ses!2ses!4v1739792698500!5m2!1ses!2ses');

-- Insert sample animals
INSERT INTO Animales (image, name, species, habitat, dieta, estado_salud, id_zoologico) VALUES
('lion_image.jpg', 'Leo', 'Lion', 'Savanna', 'Carnivore', 'Healthy', 1),
('panda_image.jpg', 'Panda', 'Giant Panda', 'Bamboo Forest', 'Herbivore', 'Healthy', 1),
('dolphin_image.jpg', 'Dolphin', 'Dolphin', 'Ocean', 'Fish', 'Under treatment', 2),
('penguin_image.jpg', 'Penguin', 'Penguin', 'Frozen Zone', 'Fish', 'Healthy', 2);

-- Insert sample events
INSERT INTO Eventos (image, name_evento, fecha, tiempo, location, descripcion, id_zoologico) VALUES
('event_image1', 'Animals Day', '2025-03-01', '10:00', 'Zoo Center', 'An event to meet the animals of our zoo.', 1),
('event_image2', 'Dolphin Show', '2025-04-15', '14:00', 'Zoo Center', 'An exhibition of trained dolphins.', 2);

-- Insert sample tickets
INSERT INTO Tickets (fecha_compra, id_usuario, id_evento) VALUES
('2025-02-10', 2, 1),
('2025-02-11', 3, 2);

-- Insert sample visits
INSERT INTO Visitas (fecha_visita, id_usuario, id_zoologico) VALUES
('2025-02-09', 2, 1),
('2025-02-10', 3, 2);
