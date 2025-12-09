const express = require('express');
const router = express.Router();
const DialogflowController = require('../controllers/DialogflowController');

// Tạo session mới cho chatbot
router.post('/session', DialogflowController.createSession);

// Gửi tin nhắn đến chatbot
router.post('/message', DialogflowController.sendMessage);

module.exports = router;
