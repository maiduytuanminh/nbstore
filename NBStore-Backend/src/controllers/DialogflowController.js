const DialogflowService = require('../services/DialogflowService');

const sendMessage = async (req, res) => {
	try {
		const { message, sessionId } = req.body;

		if (!message) {
			return res.status(400).json({
				status: 'ERR',
				message: 'Message is required',
			});
		}

		// Tạo session ID nếu không có
		const currentSessionId =
			sessionId || DialogflowService.generateSessionId();

		// Gửi tin nhắn đến Dialogflow
		const response = await DialogflowService.detectIntent(
			message,
			currentSessionId
		);

		return res.status(200).json({
			status: 'OK',
			data: {
				response: response.fulfillmentText,
				intent: response.intent,
				confidence: response.confidence,
				sessionId: currentSessionId,
				parameters: response.parameters,
			},
		});
	} catch (error) {
		console.error('Dialogflow controller error:', error);
		return res.status(500).json({
			status: 'ERR',
			message: 'Internal server error',
			error: error.message,
		});
	}
};

const createSession = async (req, res) => {
	try {
		const sessionId = DialogflowService.generateSessionId();

		return res.status(200).json({
			status: 'OK',
			data: {
				sessionId,
				welcomeMessage:
					'Xin chào! Tôi có thể giúp bạn về sản phẩm, đơn hàng, hoặc giao hàng. Bạn cần hỗ trợ gì ạ?',
			},
		});
	} catch (error) {
		console.error('Create session error:', error);
		return res.status(500).json({
			status: 'ERR',
			message: 'Internal server error',
			error: error.message,
		});
	}
};

module.exports = {
	sendMessage,
	createSession,
};
