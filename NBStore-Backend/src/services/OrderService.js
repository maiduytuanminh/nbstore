const Order = require('../models/OrderProduct');
const Product = require('../models/ProductModel');
const EmailService = require('./EmailService');

const createOrder = (newOrder) => {
	return new Promise(async (resolve, reject) => {
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
			user,
			isPaid,
			paidAt,
			email,
			shippingAddress,
		} = newOrder;

		try {
			//Kiểm tra có đủ hàng ko
			const promise = orderItems.map(async (order) => {
				const productData = await Product.findOneAndUpdate(
					{
						_id: order.product,
						countInStock: { $gte: order.amount },
					},
					{
						$inc: {
							countInStock: -order.amount,
							selled: +order.amount,
						},
					},
					{ new: true }
				);
				if (productData) {
					return {
						status: 'OK',
						message: 'SUCCESS',
					};
				} else {
					return {
						status: 'OK',
						message: 'ERR',
						id: order.product,
					};
				}
			});
			const results = await Promise.all(promise);
			const newData = results && results.filter((x) => x.id);
			if (newData.length) {
				const arrId = [];
				newData.forEach((x) => {
					arrId.push(x.id);
				});
				resolve({
					status: 'ERR',
					message: `Sản phẩm với id: ${arrId.join(
						','
					)} không đủ hàng`,
				});
			} else {
				// Xác định trạng thái ban đầu của đơn hàng
				let initialStatus = 'pending'; // Luôn để "chờ xử lý" ban đầu
				// Ghi chú: Ngay cả khi thanh toán PayPal thành công,
				// đơn hàng vẫn cần được admin xác nhận trước khi xử lý

				const createOrder = await Order.create({
					orderItems,
					shippingAddress: shippingAddress || {
						fullName,
						address,
						city,
						phone,
					},
					paymentMethod,
					itemsPrice,
					shippingPrice,
					totalPrice,
					user: user,
					email,
					isPaid,
					paidAt,
					status: initialStatus,
				});
				if (createOrder) {
					await EmailService.sendEmailCreateOrder(email, orderItems);
					resolve({
						status: 'OK',
						message: 'SUCCESS',
					});
				} else {
					resolve({
						status: 'ERR',
						message: 'Không thể tạo đơn hàng',
					});
				}
			}
		} catch (e) {
			reject(e);
		}
	});
};

const getAllOrderDetails = (id) => {
	return new Promise(async (resolve, reject) => {
		try {
			const order = await Order.find({ user: id });
			if (order === null) {
				resolve({
					status: 'OK',
					message: 'The product is not defined',
				});
			}

			resolve({
				status: 'OK',
				message: 'SUCCESS',
				data: order,
			});
		} catch (e) {
			reject(e);
		}
	});
};

const getDetailsOrder = (id) => {
	return new Promise(async (resolve, reject) => {
		try {
			console.log('Getting order details for ID:', id);
			const order = await Order.findById(id);
			console.log('Found order:', order ? 'YES' : 'NO');

			if (order === null) {
				resolve({
					status: 'ERROR',
					message: 'The order is not found',
				});
			} else {
				resolve({
					status: 'OK',
					message: 'SUCCESS',
					data: order,
				});
			}
		} catch (e) {
			console.error('getDetailsOrder error:', e);
			reject(e);
		}
	});
};

const cancelDetailsOrder = (id, data) => {
	return new Promise(async (resolve, reject) => {
		try {
			console.log('Cancelling order ID:', id);
			console.log('Cancel data:', data);

			// Tìm đơn hàng
			const order = await Order.findById(id);
			console.log('Found order for cancel:', order ? 'YES' : 'NO');

			if (!order) {
				resolve({
					status: 'ERR',
					message: 'Đơn hàng không tồn tại',
				});
				return;
			}

			console.log('Order status:', order.status);

			// Chỉ cho phép hủy đơn hàng ở trạng thái pending hoặc approved
			if (!['pending', 'approved'].includes(order.status)) {
				resolve({
					status: 'ERR',
					message: 'Không thể hủy đơn hàng ở trạng thái hiện tại',
				});
				return;
			}

			// Hoàn lại số lượng sản phẩm
			const promise = order.orderItems.map(async (item) => {
				const productData = await Product.findOneAndUpdate(
					{
						_id: item.product,
						selled: { $gte: item.amount },
					},
					{
						$inc: {
							countInStock: +item.amount,
							selled: -item.amount,
						},
					},
					{ new: true }
				);
				if (productData) {
					return {
						status: 'OK',
						message: 'SUCCESS',
					};
				} else {
					return {
						status: 'ERR',
						message: 'ERR',
						id: item.product,
					};
				}
			});

			const results = await Promise.all(promise);
			const errorData =
				results && results.filter((x) => x.status === 'ERR');

			if (errorData.length) {
				const arrId = errorData.map((x) => x.id);
				resolve({
					status: 'ERR',
					message: `Sản phẩm với id: ${arrId.join(
						','
					)} không tồn tại hoặc không đủ số lượng đã bán`,
				});
				return;
			}

			// Cập nhật trạng thái đơn hàng thành cancelled
			const updatedOrder = await Order.findByIdAndUpdate(
				id,
				{
					status: 'cancelled',
					cancelledAt: new Date(),
				},
				{ new: true }
			).populate('user', 'name email');

			resolve({
				status: 'OK',
				message: 'Đơn hàng đã được hủy thành công',
				data: updatedOrder,
			});
		} catch (e) {
			reject(e);
		}
	});
};

const getAllOrder = () => {
	return new Promise(async (resolve, reject) => {
		try {
			console.log('=== Getting All Orders ===');

			const allOrders = await Order.find()
				.populate('user', 'name email phone')
				.sort({ createdAt: -1 });

			console.log('=== Found Orders ===', {
				count: allOrders.length,
				orderStatuses: allOrders.map((order) => order.status),
				hasUserInfo: allOrders.map((order) => !!order.user),
			});

			resolve({
				status: 'OK',
				message: 'Get all orders successfully',
				data: allOrders,
			});
		} catch (e) {
			console.error('=== Get All Orders Error ===', e);
			reject(e);
		}
	});
};

// Phê duyệt đơn hàng
const approveOrder = (orderId, adminId) => {
	return new Promise(async (resolve, reject) => {
		try {
			const order = await Order.findById(orderId);
			if (!order) {
				resolve({
					status: 'ERR',
					message: 'Đơn hàng không tồn tại',
				});
				return;
			}

			if (order.status !== 'pending') {
				resolve({
					status: 'ERR',
					message: 'Đơn hàng đã được xử lý trước đó',
				});
				return;
			}

			const updatedOrder = await Order.findByIdAndUpdate(
				orderId,
				{
					status: 'approved',
					approvedBy: adminId,
					approvedAt: new Date(),
				},
				{ new: true }
			).populate('user', 'name email');

			// Gửi email thông báo phê duyệt
			if (updatedOrder.user.email) {
				await EmailService.sendEmailOrderApproved(
					updatedOrder.user.email,
					updatedOrder
				);
			}

			resolve({
				status: 'OK',
				message: 'Đơn hàng đã được phê duyệt thành công',
				data: updatedOrder,
			});
		} catch (e) {
			reject(e);
		}
	});
};

// Từ chối đơn hàng
const rejectOrder = (orderId, adminId, reason) => {
	return new Promise(async (resolve, reject) => {
		try {
			const order = await Order.findById(orderId);
			if (!order) {
				resolve({
					status: 'ERR',
					message: 'Đơn hàng không tồn tại',
				});
				return;
			}

			if (order.status !== 'pending') {
				resolve({
					status: 'ERR',
					message: 'Đơn hàng đã được xử lý trước đó',
				});
				return;
			}

			// Hoàn lại số lượng sản phẩm khi từ chối đơn hàng
			const promise = order.orderItems.map(async (item) => {
				await Product.findByIdAndUpdate(item.product, {
					$inc: {
						countInStock: +item.amount,
						selled: -item.amount,
					},
				});
			});
			await Promise.all(promise);

			const updatedOrder = await Order.findByIdAndUpdate(
				orderId,
				{
					status: 'rejected',
					approvedBy: adminId,
					approvedAt: new Date(),
					rejectionReason: reason,
				},
				{ new: true }
			).populate('user', 'name email');

			// Gửi email thông báo từ chối
			if (updatedOrder.user.email) {
				await EmailService.sendEmailOrderRejected(
					updatedOrder.user.email,
					updatedOrder,
					reason
				);
			}

			resolve({
				status: 'OK',
				message: 'Đơn hàng đã được từ chối',
				data: updatedOrder,
			});
		} catch (e) {
			reject(e);
		}
	});
};

// Cập nhật trạng thái giao hàng
const updateOrderShipping = (orderId) => {
	return new Promise(async (resolve, reject) => {
		try {
			const order = await Order.findById(orderId);
			if (!order) {
				resolve({
					status: 'ERR',
					message: 'Đơn hàng không tồn tại',
				});
				return;
			}

			if (order.status !== 'approved' && order.status !== 'paid') {
				resolve({
					status: 'ERR',
					message:
						'Đơn hàng chưa được phê duyệt hoặc chưa thanh toán',
				});
				return;
			}

			const updatedOrder = await Order.findByIdAndUpdate(
				orderId,
				{
					status: 'shipping',
				},
				{ new: true }
			).populate('user', 'name email');

			resolve({
				status: 'OK',
				message: 'Đơn hàng đã chuyển sang trạng thái đang giao',
				data: updatedOrder,
			});
		} catch (e) {
			reject(e);
		}
	});
};

// Cập nhật trạng thái đã giao hàng
const updateOrderDelivered = (orderId) => {
	return new Promise(async (resolve, reject) => {
		try {
			const order = await Order.findById(orderId);
			if (!order) {
				resolve({
					status: 'ERR',
					message: 'Đơn hàng không tồn tại',
				});
				return;
			}

			if (order.status !== 'shipping') {
				resolve({
					status: 'ERR',
					message: 'Đơn hàng chưa ở trạng thái đang giao',
				});
				return;
			}

			const updatedOrder = await Order.findByIdAndUpdate(
				orderId,
				{
					status: 'delivered',
					isDelivered: true,
					deliveredAt: new Date(),
				},
				{ new: true }
			).populate('user', 'name email');

			resolve({
				status: 'OK',
				message: 'Đơn hàng đã được giao thành công',
				data: updatedOrder,
			});
		} catch (e) {
			reject(e);
		}
	});
};

// Cập nhật trạng thái đã thanh toán
const updateOrderPaid = (orderId) => {
	return new Promise(async (resolve, reject) => {
		try {
			const order = await Order.findById(orderId);
			if (!order) {
				resolve({
					status: 'ERR',
					message: 'Đơn hàng không tồn tại',
				});
				return;
			}

			if (order.status !== 'approved') {
				resolve({
					status: 'ERR',
					message: 'Đơn hàng chưa được phê duyệt',
				});
				return;
			}

			const updatedOrder = await Order.findByIdAndUpdate(
				orderId,
				{
					status: 'paid',
					isPaid: true,
					paidAt: new Date(),
				},
				{ new: true }
			).populate('user', 'name email');

			resolve({
				status: 'OK',
				message: 'Đơn hàng đã được thanh toán',
				data: updatedOrder,
			});
		} catch (e) {
			reject(e);
		}
	});
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
