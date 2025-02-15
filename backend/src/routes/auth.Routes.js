// routes/auth.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.Controller');

// Endpoint to register a new user
router.post('/register', authController.register);

// Endpoint for user login
router.post('/login', authController.login);

module.exports = router;
