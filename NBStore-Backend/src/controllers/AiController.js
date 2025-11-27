const aiService = require('../services/AiService');

exports.aiResponse = async (req, res) => {
  try {
    const { message } = req.body;
    const reply = await aiService.getAIResponse(message);
    res.json({ reply });
  } catch (error) {
    res.status(500).json({ error: 'AI response error' });
  }
};