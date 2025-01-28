const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chat.Controller');
const { authenticate } = require('../middleware/authMiddleware');

router.get('/:room', authenticate, chatController.getChatHistory);

module.exports = router;
