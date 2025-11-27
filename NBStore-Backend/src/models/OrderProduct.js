const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
	{
		orderItems: [
			{
				name: { type: String, required: true },
				amount: { type: Number, required: true },
				image: { type: String, required: true },
				price: { type: Number, required: true },
				discount: { type: Number }, // giảm giá
				product: {
					type: mongoose.Schema.Types.ObjectId,
					ref: 'Product',
					required: true,
				},
			},
		],
		// địa chỉ giao hàng
		shippingAddress: {
			fullName: { type: String, required: true },
			address: { type: String, required: true },
			city: { type: String, required: true },
			phone: { type: String, required: true }, // Đổi từ Number sang String để hỗ trợ format tốt hơn
			// Thêm các trường mới cho địa chỉ chi tiết
			fullAddress: { type: String }, // Địa chỉ đầy đủ từ Google Maps
			street: { type: String }, // Tên đường
			district: { type: String }, // Quận/huyện
			province: { type: String }, // Tỉnh/thành phố
			coordinates: {
				lat: { type: Number }, // Vĩ độ
				lng: { type: Number }, // Kinh độ
			},
		},
		paymentMethod: { type: String, required: true },
		itemsPrice: { type: Number, required: true },
		shippingPrice: { type: Number, required: true }, // phí giao hàng
		totalPrice: { type: Number, required: true }, // tổng giá tiền sản phẩm
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		}, //Bảng user
		email: { type: String }, // Email của người đặt hàng để gửi thông báo
		isPaid: { type: Boolean, default: false }, //đã thanh toán hay chưa
		paidAt: { type: Date }, // thannh toán vào lúc nào
		isDelivered: { type: Boolean, default: false }, // đã giao hàng hay chưa
		deliveredAt: { type: Date }, //giao hàng lúc nào
		status: {
			type: String,
			enum: [
				'pending', // Đang chờ duyệt (mới tạo)
				'approved', // Đã duyệt (admin phê duyệt)
				'paid', // Đã thanh toán
				'shipping', // Đang giao hàng
				'delivered', // Đã giao thành công
				'cancelled', // Đã hủy (user hủy)
				'rejected', // Bị từ chối (admin từ chối)
			],
			default: 'pending',
		}, // trạng thái đơn hàng
		approvedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // admin phê duyệt
		approvedAt: { type: Date }, // thời gian phê duyệt
		rejectionReason: { type: String }, // lý do từ chối nếu có
	},
	{
		timestamps: true,
		toJSON: {
			transform: function (doc, ret) {
				delete ret.__v;
				return ret;
			},
		},
		toObject: {
			transform: function (doc, ret) {
				delete ret.__v;
				return ret;
			},
		},
	}
);
const Order = mongoose.model('Order', orderSchema);
module.exports = Order;
