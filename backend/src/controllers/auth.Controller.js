const auth = require('../services/auth.service.js');
const bcrypt = require('bcrypt');
const db = require('../config/config.js');

// Registro de usuario
exports.signup = async (req, res) => {
    const { nombre, email, contrasena, rol } = req.body;

    try {
        // Verificar si el usuario ya existe
        const [existingUser] = await db.query('SELECT * FROM Usuarios WHERE email = ?', [email]);
        if (existingUser.length > 0) {
            return res.status(400).json({ error: 'The email is already registered.' });
        }

        // Hashear la contraseña y guardar el usuario
        const hashedPassword = await bcrypt.hash(contrasena, 10);
        await db.query(
            'INSERT INTO Usuarios (nombre, email, contrasena, rol) VALUES (?, ?, ?, ?)',
            [nombre, email, hashedPassword, rol || 'visitante']
        );

        res.status(201).json({ message: 'User registered successfully.' });
    } catch (error) {
        console.error('Error during user registration:', error.message);
        res.status(500).json({ error: 'Internal server error.' });
    }
};

// Inicio de sesión
exports.login = async (req, res) => {
    const { email, contrasena } = req.body;

    try {
        // Verificar si el usuario existe
        const [userResult] = await db.query('SELECT * FROM Usuarios WHERE email = ?', [email]);
        const user = userResult[0];
        if (!user) {
            return res.status(404).json({ error: 'User not found.' });
        }

        // Verificar la contraseña
        const isPasswordValid = await bcrypt.compare(contrasena, user.contrasena);
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Incorrect password.' });
        }

        // Generar el token
        const token = auth.signToken({
            id: user.id_usuario,
            email: user.email,
            isAdmin: user.rol === 'administrador',
        });

        // Guardar el token en Redis
        redisClient.set(`session:${user.id_usuario}`, token);

        res.status(200).json({ message: 'Login successful.', token });
    } catch (error) {
        console.error('Error during login:', error.message);
        res.status(500).json({ error: 'Internal server error.' });
    }
};
