// controllers/auth.controller.js
const bcrypt = require('bcrypt');
const { getUserByEmail, createUser } = require('../models/users.models.js');
const auth = require('../services/auth.service.js');
const redisClient = require('../services/redis.service.js');

const register = async (req, res) => {
    console.log("Incoming registration request:", req.body); // Debugging line

    const { name, email, contrasena, rol } = req.body;

    if (!name || !email || !contrasena) {
        console.log("Validation error: Missing required fields"); // Debugging line
        return res.status(400).json({ error: "Missing required fields" });
    }

    try {
        console.log("Checking if user exists:", email);
        const existingUser = await getUserByEmail(email);
        if (existingUser) {
            console.log("User already exists:", email);
            return res.status(409).json({ error: "User already exists" });
        }
        if (typeof contrasena !== 'string') {
            console.log("Password is not a string:", contrasena);
            return res.status(400).json({ error: "Invalid password format" });
        }

        console.log("Hashing password...");
        const hashedPassword = await bcrypt.hash(contrasena, 12);
        const userRole = rol || "visitante";

        console.log("Creating user in database...");
        const newUserId = await createUser({
            name,
            email,
            contrasena: hashedPassword,
            rol: userRole,
        });

        console.log("User registered successfully:", newUserId);
        res.status(201).json({ message: "User registered successfully", id_usuario: newUserId });
    } catch (error) {
        console.error("Registration error:", error);
        res.status(500).json({ error: "Registration error", details: error.message });
    }
};


const login = async (req, res) => {
    const { email, contrasena } = req.body;

    if (!email || !contrasena) {
        return res.status(400).json({ error: 'Email and password are required' });
    }

    try {
        const user = await getUserByEmail(email);
        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Compare the provided password with the stored hashed password
        const isMatch = await bcrypt.compare(contrasena, user.contrasena);
        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Create a JWT token with user info (using user.id_usuario, email, and rol)
        const token = auth.signToken({ id: user.id_usuario, email: user.email, rol: user.rol });

        // Store the token in Redis with a key like `session:<user_id>`
        redisClient.set(`session:${user.id_usuario}`, token, (err) => {
            if (err) {
                console.error('Error saving session in Redis:', err.message);
            }
        });

        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ error: 'Login error', details: error.message });
    }
};

module.exports = {
    register,
    login,
};
