CREATE TABLE Usuarios (
    id_usuario INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    contrasena VARCHAR(255) NOT NULL,
    rol ENUM('administrador', 'visitante', 'empleado') NOT NULL
);

CREATE TABLE Zoologicos (
    id_zoologico INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(150) NOT NULL,
    ubicacion VARCHAR(255) NOT NULL,
    horario_apertura TIME NOT NULL,
    horario_cierre TIME NOT NULL,
);

CREATE TABLE Animales (
    id_animal INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    especie VARCHAR(100) NOT NULL,
    habitat VARCHAR(100) NOT NULL,
    dieta VARCHAR(255) NOT NULL,
    estado_salud VARCHAR(255),
    id_zoologico INT NOT NULL,
    FOREIGN KEY (id_zoologico) REFERENCES Zoologicos(id_zoologico)
        ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE Eventos (
    id_evento INT AUTO_INCREMENT PRIMARY KEY,
    nombre_evento VARCHAR(150) NOT NULL,
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
