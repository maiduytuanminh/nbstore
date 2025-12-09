const dialogflow = require('@google-cloud/dialogflow');
const { v4: uuidv4 } = require('uuid');

class DialogflowService {
	constructor() {
		// Thông tin project Dialogflow (cần thay đổi theo project thực tế)
		this.projectId = process.env.DIALOGFLOW_PROJECT_ID || 'your-project-id';
		this.languageCode = 'vi'; // Tiếng Việt
		this.isDialogflowEnabled =
			!process.env.DISABLE_DIALOGFLOW &&
			this.projectId !== 'your-project-id';

		// Chỉ tạo session client nếu Dialogflow được bật và có credentials
		if (this.isDialogflowEnabled) {
			try {
				this.sessionClient = new dialogflow.SessionsClient({
					keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS,
				});
				console.log('✅ Dialogflow client initialized successfully');
			} catch (error) {
				console.log(
					'⚠️ Dialogflow initialization failed, using fallback mode'
				);
				this.isDialogflowEnabled = false;
			}
		} else {
			console.log('🔄 Dialogflow disabled, using fallback responses');
		}
	}

	// Tạo session path
	createSessionPath(sessionId) {
		if (!this.sessionClient) {
			return null;
		}
		return this.sessionClient.projectAgentSessionPath(
			this.projectId,
			sessionId
		);
	}

	// Gửi tin nhắn đến Dialogflow và nhận phản hồi
	async detectIntent(message, sessionId) {
		// Nếu Dialogflow không được bật, dùng fallback
		if (!this.isDialogflowEnabled) {
			return this.getFallbackResponse(message);
		}

		try {
			const sessionPath = this.createSessionPath(sessionId);

			// Request object
			const request = {
				session: sessionPath,
				queryInput: {
					text: {
						text: message,
						languageCode: this.languageCode,
					},
				},
			};

			// Gửi request đến Dialogflow
			const [response] = await this.sessionClient.detectIntent(request);
			console.log('Dialogflow response:', response);

			const result = response.queryResult;

			return {
				fulfillmentText: result.fulfillmentText,
				intent: result.intent ? result.intent.displayName : 'Unknown',
				confidence: result.intentDetectionConfidence,
				parameters: result.parameters,
			};
		} catch (error) {
			console.error('Dialogflow error:', error);

			// Fallback response nếu Dialogflow không hoạt động
			return this.getFallbackResponse(message);
		}
	}

	// Phản hồi dự phòng khi Dialogflow không hoạt động
	getFallbackResponse(message) {
		const lowerMessage = message.toLowerCase();

		if (
			lowerMessage.includes('sản phẩm') ||
			lowerMessage.includes('product')
		) {
			return {
				fulfillmentText:
					'Chúng tôi có rất nhiều sản phẩm chất lượng. Bạn có thể xem trong danh sách sản phẩm hoặc tìm kiếm sản phẩm cụ thể.',
				intent: 'product.inquiry',
				confidence: 0.8,
				parameters: {},
			};
		}

		if (
			lowerMessage.includes('đơn hàng') ||
			lowerMessage.includes('order')
		) {
			return {
				fulfillmentText:
					'Để kiểm tra đơn hàng, bạn vui lòng vào mục "Đơn hàng của tôi" trong tài khoản của bạn.',
				intent: 'order.inquiry',
				confidence: 0.8,
				parameters: {},
			};
		}

		if (
			lowerMessage.includes('giao hàng') ||
			lowerMessage.includes('shipping')
		) {
			return {
				fulfillmentText:
					'Thời gian giao hàng dự kiến là 2-5 ngày làm việc tùy theo khu vực của bạn.',
				intent: 'shipping.inquiry',
				confidence: 0.8,
				parameters: {},
			};
		}

		return {
			fulfillmentText:
				'Xin chào! Tôi có thể giúp bạn về sản phẩm, đơn hàng, hoặc giao hàng. Bạn cần hỗ trợ gì ạ?',
			intent: 'default.welcome',
			confidence: 0.5,
			parameters: {},
		};
	}

	// Tạo session ID mới
	generateSessionId() {
		return uuidv4();
	}
}

module.exports = new DialogflowService();
