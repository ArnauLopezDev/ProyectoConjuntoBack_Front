const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../config/database'); // Configuración de la base de datos
const redisClient = require('../services/redis.service');

const router = express.Router();

const SECRET_KEY = 'secreto';

const authenticate = (req, res, next) => {
    const authHeader = req.header('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Access denied. Invalid or missing token.' });
    }

    const token = authHeader.split(' ')[1];
    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) return res.status(401).json({ error: 'Invalid token' });

        redisClient.get(`session:${decoded.id}`, (err, sessionToken) => {
            if (err || sessionToken !== token) {
                return res.status(403).json({ error: 'Access denied. Invalid session.' });
            }

            req.user = decoded;
            next();
        });
    });
};

// Registrar usuario
router.post('/register', async (req, res) => {
    const { name, email, contrasena, rol } = req.body;
    if (!name || !email || !contrasena || !rol) {
        return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }
    try {
        const hashedPassword = await bcrypt.hash(contrasena, 10);
        const [result] = await db.execute(
            'INSERT INTO Usuarios (name, email, contrasena, rol) VALUES (?, ?, ?, ?)',
            [name, email, hashedPassword, rol]
        );
        res.status(201).json({ message: 'Usuario registrado', id_usuario: result.insertId });
    } catch (error) {
        res.status(500).json({ error: 'Error al registrar usuario', details: error.message });
    }
});

// Iniciar sesión
router.post('/login', async (req, res) => {
    const { email, contrasena } = req.body;
    try {
        const [rows] = await db.execute('SELECT * FROM Usuarios WHERE email = ?', [email]);
        if (rows.length === 0) return res.status(401).json({ error: 'Credenciales inválidas' });
        
        const user = rows[0];
        const isMatch = await bcrypt.compare(contrasena, user.contrasena);
        if (!isMatch) return res.status(401).json({ error: 'Credenciales inválidas' });
        
        const token = jwt.sign({ id: user.id_usuario, rol: user.rol }, SECRET_KEY, { expiresIn: '1h' });
        await redisClient.set(`session:${user.id_usuario}`, token);
        res.json({ message: 'Login exitoso', token });
    } catch (error) {
        res.status(500).json({ error: 'Error en el login', details: error.message });
    }
});

// Cerrar sesión
router.post('/logout', authenticate, async (req, res) => {
    try {
        await redisClient.del(`session:${req.user.id}`);
        res.json({ message: 'Logout exitoso' });
    } catch (error) {
        res.status(500).json({ error: 'Error en el logout', details: error.message });
    }
});

// Obtener perfil de usuario autenticado
router.get('/profile', authenticate, async (req, res) => {
    try {
        const [rows] = await db.execute('SELECT id_usuario, name, email, rol FROM Usuarios WHERE id_usuario = ?', [req.user.id]);
        if (rows.length === 0) return res.status(404).json({ error: 'Usuario no encontrado' });
        res.json(rows[0]);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener perfil', details: error.message });
    }
});

// Actualizar usuario
router.put('/update', authenticate, async (req, res) => {
    const { name, email, contrasena } = req.body;
    try {
        let query = 'UPDATE Usuarios SET ';
        const params = [];

        if (name) { query += 'name = ?, '; params.push(name); }
        if (email) { query += 'email = ?, '; params.push(email); }
        if (contrasena) {
            const hashedPassword = await bcrypt.hash(contrasena, 10);
            query += 'contrasena = ?, ';
            params.push(hashedPassword);
        }

        query = query.slice(0, -2) + ' WHERE id_usuario = ?';
        params.push(req.user.id);

        await db.execute(query, params);
        res.json({ message: 'Usuario actualizado' });
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar usuario', details: error.message });
    }
});

// Eliminar usuario
router.delete('/delete', authenticate, async (req, res) => {
    try {
        await db.execute('DELETE FROM Usuarios WHERE id_usuario = ?', [req.user.id]);
        await redisClient.del(`session:${req.user.id}`);
        res.json({ message: 'Cuenta eliminada' });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar usuario', details: error.message });
    }
});

module.exports = router;

