const OrderService = require('../services/OrderService');

const createOrder = async (req, res) => {
	try {
		const {
			orderItems,
			paymentMethod,
			itemsPrice,
			shippingPrice,
			totalPrice,
			fullName,
			address,
			city,
			phone,
		} = req.body;

		if (
			!orderItems ||
			!Array.isArray(orderItems) ||
			orderItems.length === 0 ||
			!paymentMethod ||
			!itemsPrice ||
			shippingPrice === undefined ||
			!totalPrice ||
			!fullName ||
			!address ||
			!city ||
			!phone
		) {
			return res.status(400).json({
				status: 'ERR',
				message: 'The input is required',
			});
		}
		const response = await OrderService.createOrder(req.body);
		return res.status(200).json(response);
	} catch (e) {
		return res.status(500).json({
			message: e.message,
		});
	}
};

const getAllOrderDetails = async (req, res) => {
	try {
		const userId = req.params.id;
		const user = req.user; // Từ authOrderMiddleware

		if (!userId) {
			return res.status(200).json({
				status: 'ERR',
				message: 'The userId is required',
			});
		}

		// Check quyền: admin có thể xem tất cả, user chỉ xem của mình
		if (!user.isAdmin && user.id !== userId) {
			return res.status(403).json({
				status: 'ERROR',
				message: 'Insufficient permissions',
			});
		}

		const response = await OrderService.getAllOrderDetails(userId);
		return res.status(200).json(response);
	} catch (e) {
		return res.status(404).json({
			message: e.message,
		});
	}
};

const getDetailsOrder = async (req, res) => {
	try {
		const orderId = req.params.id;
		const user = req.user; // Từ authOrderMiddleware

		console.log('orderId', orderId);
		console.log('user', user);

		if (!orderId) {
			return res.status(400).json({
				status: 'ERR',
				message: 'The orderId is required',
			});
		}

		const response = await OrderService.getDetailsOrder(orderId);

		// Check xem order có tồn tại không
		if (response.status === 'ERROR') {
			return res.status(404).json(response);
		}

		if (response.status === 'OK' && response.data) {
			// Nếu không phải admin, check xem order có thuộc về user không
			if (!user.isAdmin && response.data.user.toString() !== user.id) {
				return res.status(403).json({
					status: 'ERROR',
					message: 'Insufficient permissions',
				});
			}
		}

		return res.status(200).json(response);
	} catch (e) {
		return res.status(500).json({
			message: e.message || 'Internal Server Error',
		});
	}
};

const cancelDetailsOrder = async (req, res) => {
	try {
		const orderId = req.params.id;
		const data = req.body; // chỉ chứa orderItems
		const user = req.user; // Từ authOrderMiddleware

		console.log('Cancel order request:', {
			orderId,
			data,
			userId: user.id,
		});

		if (!orderId) {
			return res.status(200).json({
				status: 'ERR',
				message: 'The orderId is required',
			});
		}

		// Trước khi cancel, cần check xem order có thuộc về user không
		const orderDetails = await OrderService.getDetailsOrder(orderId);

		console.log('Order details response:', orderDetails);

		// Check xem order có tồn tại không
		if (orderDetails.status === 'ERROR') {
			return res.status(404).json(orderDetails);
		}

		// Check quyền: admin có thể cancel tất cả, user chỉ cancel của mình
		if (!user.isAdmin && orderDetails.data.user.toString() !== user.id) {
			console.log('Permission denied:', {
				orderUserId: orderDetails.data.user.toString(),
				requestUserId: user.id,
				isAdmin: user.isAdmin,
			});
			return res.status(403).json({
				status: 'ERROR',
				message: 'Insufficient permissions',
			});
		}

		const response = await OrderService.cancelDetailsOrder(orderId, data);
		return res.status(200).json(response);
	} catch (e) {
		console.error('Cancel order error:', e);
		return res.status(404).json({
			message: e.message,
		});
	}
};

const getAllOrder = async (req, res) => {
	try {
		console.log('=== Get All Orders Request ===', {
			user: req.user,
			headers: req.headers,
		});

		const data = await OrderService.getAllOrder();
		console.log('=== Get All Orders Response ===', {
			status: data.status,
			message: data.message,
			orderCount: data.data?.length || 0,
		});

		return res.status(200).json(data);
	} catch (e) {
		console.error('=== Get All Orders Error ===', e);
		return res.status(404).json({
			message: e.message,
		});
	}
};

// Phê duyệt đơn hàng (Admin only)
const approveOrder = async (req, res) => {
	try {
		const orderId = req.params.id;
		const adminId = req.user.id; // Lấy từ middleware auth

		if (!orderId) {
			return res.status(400).json({
				status: 'ERR',
				message: 'Order ID is required',
			});
		}

		const response = await OrderService.approveOrder(orderId, adminId);
		return res.status(200).json(response);
	} catch (e) {
		return res.status(500).json({
			message: e.message,
		});
	}
};

// Từ chối đơn hàng (Admin only)
const rejectOrder = async (req, res) => {
	try {
		const orderId = req.params.id;
		const adminId = req.user.id;
		const { reason } = req.body;

		if (!orderId) {
			return res.status(400).json({
				status: 'ERR',
				message: 'Order ID is required',
			});
		}

		if (!reason) {
			return res.status(400).json({
				status: 'ERR',
				message: 'Rejection reason is required',
			});
		}

		const response = await OrderService.rejectOrder(
			orderId,
			adminId,
			reason
		);
		return res.status(200).json(response);
	} catch (e) {
		return res.status(500).json({
			message: e.message,
		});
	}
};

// Cập nhật trạng thái đang giao hàng (Admin only)
const updateOrderShipping = async (req, res) => {
	try {
		const orderId = req.params.id;

		if (!orderId) {
			return res.status(400).json({
				status: 'ERR',
				message: 'Order ID is required',
			});
		}

		const response = await OrderService.updateOrderShipping(orderId);
		return res.status(200).json(response);
	} catch (e) {
		return res.status(500).json({
			message: e.message,
		});
	}
};

// Cập nhật trạng thái đã giao hàng (Admin only)
const updateOrderDelivered = async (req, res) => {
	try {
		const orderId = req.params.id;

		if (!orderId) {
			return res.status(400).json({
				status: 'ERR',
				message: 'Order ID is required',
			});
		}

		const response = await OrderService.updateOrderDelivered(orderId);
		return res.status(200).json(response);
	} catch (e) {
		return res.status(500).json({
			message: e.message,
		});
	}
};

// Cập nhật trạng thái đã thanh toán (Admin only)
const updateOrderPaid = async (req, res) => {
	try {
		const orderId = req.params.id;

		if (!orderId) {
			return res.status(400).json({
				status: 'ERR',
				message: 'Order ID is required',
			});
		}

		const response = await OrderService.updateOrderPaid(orderId);
		return res.status(200).json(response);
	} catch (e) {
		return res.status(500).json({
			message: e.message,
		});
	}
};

module.exports = {
	createOrder,
	getAllOrderDetails,
	getDetailsOrder,
	cancelDetailsOrder,
	getAllOrder,
	approveOrder,
	rejectOrder,
	updateOrderShipping,
	updateOrderDelivered,
	updateOrderPaid,
};
