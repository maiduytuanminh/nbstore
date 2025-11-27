const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

// const authMiddleware = (req, res, next) => {
//     const token = req.headers.token?.split(' ')[1];
//     if (!token) {
//         return res.status(401).json({
//             message: 'No token provided',
//             status: 'ERROR'
//         })
//     }
//     jwt.verify(token, process.env.ACCESS_TOKEN, function (err, user) {
//         if (err) {
//             return res.status(403).json({
//                 message: 'Invalid token',
//                 status: 'ERROR'
//             })
//         }
//         console.log('User:', user);
//         if (user?.isAdmin) {
//             next()
//         } else {
//             return res.status(404).json({
//                 message: 'Insufficient permissions',
//                 status: 'ERROR'
//             })
//         }
//     });
// }

const authMiddleware = (req, res, next) => {
	const token = req.headers.token?.split(' ')[1];
	if (!token) {
		return res.status(401).json({
			message: 'No token provided',
			status: 'ERROR',
		});
	}
	jwt.verify(token, process.env.ACCESS_TOKEN, function (err, user) {
		if (err) {
			return res.status(403).json({
				message: 'Invalid token',
				status: 'ERROR',
			});
		}
		console.log('User:', user);
		// Gán user vào req để controller có thể sử dụng
		req.user = user;

		if (user?.isAdmin) {
			next();
		} else {
			return res.status(404).json({
				message: 'Insufficient permissions',
				status: 'ERROR',
			});
		}
	});
};

const authUserMiddleware = (req, res, next) => {
	const token = req.headers.token?.split(' ')[1];
	const userId = req.params.id;
	if (!token) {
		return res.status(401).json({
			message: 'No token provided',
			status: 'ERROR',
		});
	}
	jwt.verify(token, process.env.ACCESS_TOKEN, function (err, user) {
		if (err) {
			return res.status(403).json({
				message: 'Invalid token',
				status: 'ERROR',
			});
		}
		// Gán user vào req để controller có thể sử dụng
		req.user = user;

		if (user?.isAdmin || user?.id === userId) {
			next();
		} else {
			return res.status(403).json({
				message: 'Insufficient permissions',
				status: 'ERROR',
			});
		}
	});
};

// Middleware riêng cho order - check xem order có thuộc về user không
const authOrderMiddleware = (req, res, next) => {
	const token = req.headers.token?.split(' ')[1];
	if (!token) {
		return res.status(401).json({
			message: 'No token provided',
			status: 'ERROR',
		});
	}
	jwt.verify(token, process.env.ACCESS_TOKEN, function (err, user) {
		if (err) {
			return res.status(403).json({
				message: 'Invalid token',
				status: 'ERROR',
			});
		}
		// Gán user vào req để controller có thể sử dụng
		req.user = user;

		// Admin có thể xem tất cả orders
		if (user?.isAdmin) {
			next();
		} else {
			// User chỉ có thể xem order của chính mình - check sẽ được thực hiện trong controller
			next();
		}
	});
};

module.exports = {
	authMiddleware,
	authUserMiddleware,
	authOrderMiddleware,
};
