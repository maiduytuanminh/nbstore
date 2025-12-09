const axios = require('axios');

const API_URL = 'http://localhost:3001/api';

// Test cases dựa trên các intent đã cấu hình
const testCases = [
	'Xin chào',
	'Tôi muốn tìm sản phẩm',
	'Kiểm tra đơn hàng của tôi',
	'Thời gian giao hàng là bao lâu?',
	'Chính sách đổi trả như thế nào?',
	'Thanh toán như thế nào',
	'Liên hệ shop',
	'Có laptop không',
	'Đơn hàng đã giao chưa',
	'Phí ship bao nhiêu',
];

async function testDialogflowAPI() {
	try {
		console.log('🤖 Testing Dialogflow API with nbstore intents...\n');

		// Test tạo session
		console.log('1️⃣ Testing session creation...');
		const sessionResponse = await axios.post(
			`${API_URL}/dialogflow/session`
		);
		console.log('✅ Session Response:', sessionResponse.data);

		const sessionId = sessionResponse.data.data.sessionId;
		console.log(`📝 Using session ID: ${sessionId}\n`);

		// Test từng case
		for (let i = 0; i < testCases.length; i++) {
			const testMessage = testCases[i];
			console.log(`${i + 2}️⃣ Testing: "${testMessage}"`);

			try {
				const messageResponse = await axios.post(
					`${API_URL}/dialogflow/message`,
					{
						message: testMessage,
						sessionId: sessionId,
					}
				);

				const data = messageResponse.data.data;
				console.log(
					`✅ Response: ${data.response.substring(0, 100)}...`
				);
				console.log(
					`🎯 Intent: ${data.intent} (${Math.round(
						data.confidence * 100
					)}%)`
				);
				console.log('---');

				// Delay để tránh spam
				await new Promise((resolve) => setTimeout(resolve, 500));
			} catch (error) {
				console.log(
					`❌ Error with "${testMessage}":`,
					error.response?.data?.message || error.message
				);
				console.log('---');
			}
		}

		console.log('\n🎉 Testing completed!');
		console.log('\n💡 Tips:');
		console.log(
			'- Fallback responses được sử dụng khi Dialogflow chưa cấu hình'
		);
		console.log('- Cấu hình Dialogflow để có responses tốt hơn');
		console.log(
			'- Kiểm tra DIALOGFLOW_INTENTS_SETUP.md để biết cách setup'
		);
	} catch (error) {
		console.error(
			'💥 Error testing API:',
			error.response?.data || error.message
		);
	}
}

testDialogflowAPI();
