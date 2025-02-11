
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

-- Insert sample users
INSERT INTO Usuarios (name, email, contrasena, rol) VALUES
('Admin User', 'admin@example.com', 'hashed_password_1', 'administrador'),
('Visitor One', 'visitor1@example.com', 'hashed_password_2', 'visitante'),
('Visitor Two', 'visitor2@example.com', 'hashed_password_3', 'visitante'),
('Zoo Employee', 'employee@example.com', 'hashed_password_4', 'empleado');

-- Insert sample zoos
INSERT INTO Zoologicos (name, ubicacion, horario_apertura, horario_cierre) VALUES
('Safari Zoo', '123 Jungle Road, Wildlife City', '08:00:00', '18:00:00'),
('Ocean Park', '456 Seaside Avenue, Marine Town', '09:00:00', '19:00:00');

-- Insert sample animals
INSERT INTO Animales (name, specie, habitat, dieta, estado_salud, id_zoologico) VALUES
('Leo', 'León', 'Sabana', 'Carnívoro', 'Saludable', 1),
('Panda', 'Oso Panda', 'Bosque de Bambú', 'Herbívoro', 'Saludable', 1),
('Dolphin', 'Delfín', 'Océano', 'Pescado', 'En tratamiento', 2),
('Penguin', 'Pingüino', 'Zona helada', 'Pescado', 'Saludable', 2);

-- Insert sample events
INSERT INTO Eventos (name_evento, fecha, descripcion, id_zoologico) VALUES
('Día de los Animales', '2025-03-01', 'Un evento para concienciar sobre la protección animal.', 1),
('Show de Delfines', '2025-04-15', 'Una exhibición especial de delfines entrenados.', 2);

-- Insert sample tickets
INSERT INTO Tickets (fecha_compra, id_usuario, id_evento) VALUES
('2025-02-10', 2, 1),
('2025-02-11', 3, 2);

-- Insert sample visits
INSERT INTO Visitas (fecha_visita, id_usuario, id_zoologico) VALUES
('2025-02-09', 2, 1),
('2025-02-10', 3, 2);