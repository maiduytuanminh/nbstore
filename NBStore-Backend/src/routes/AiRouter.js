const express = require('express');
const router = express.Router();
const aiController = require('../controllers/AiController');

router.post('/response', aiController.aiResponse);

module.exports = router;