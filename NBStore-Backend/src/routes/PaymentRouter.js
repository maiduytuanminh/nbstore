const express = require('express');
const router = express.Router();
const dotenv = require('dotenv');

dotenv.config();

router.get('/config', (req, res) => {
	try {
		const clientId = process.env.CLIENT_ID;

		if (!clientId || clientId === 'YOUR_SANDBOX_CLIENT_ID_HERE') {
			return res.status(400).json({
				status: 'ERROR',
				message: 'PayPal Client ID chưa được cấu hình',
			});
		}

		return res.status(200).json({
			status: 'OK',
			data: clientId,
		});
	} catch (error) {
		return res.status(500).json({
			status: 'ERROR',
			message: 'Lỗi server khi lấy PayPal config',
		});
	}
});

module.exports = router;
