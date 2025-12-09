const nodemailer = require('nodemailer');
const dotenv = require('dotenv');

dotenv.config();

const sendEmailCreateOrder = async (email, orderItems) => {
	// Tạm thời tắt email để test
	console.log('📧 Email would be sent to:', email);
	console.log('📦 Order items:', orderItems);
	return;

	const transporter = nodemailer.createTransport({
		host: 'smtp.gmail.com',
		port: 465,
		secure: true,
		auth: {
			user: process.env.MAIL_ACCOUNT,
			pass: process.env.MAIL_PASSWORD,
		},
	});

	async function main() {
		let listItem = '';
		orderItems.forEach((x) => {
			listItem += `<div>
            <div>Bạn đã đặt sản phẩm <b>${x.name}</b> với số lượng: <b>${x.amount}</b> và giá là: <b>${x.price} VND</b></div>
            <div><img src=${x.image} alt="Sản phẩm"/></div>
            </div>`;
		});

		const info = await transporter.sendMail({
			from: process.env.MAIL_ACCOUNT,
			to: email,
			subject: 'Bạn đã đặt hàng tại shop - Đang chờ phê duyệt',
			html: `<div><b>Bạn đã đặt hàng thành công tại shop</b></div>
                   <div>Đơn hàng của bạn đang chờ admin phê duyệt. Chúng tôi sẽ thông báo khi có kết quả.</div>
                   ${listItem}`,
		});

		console.log('Message sent: %s', info.messageId);
	}

	await main();
};

// Email thông báo đơn hàng được phê duyệt
const sendEmailOrderApproved = async (email, order) => {
	// Tạm thời tắt email để test
	console.log('📧 Approval email would be sent to:', email);
	console.log('📦 Order:', order._id);
	return;

	const transporter = nodemailer.createTransport({
		host: 'smtp.gmail.com',
		port: 465,
		secure: true,
		auth: {
			user: process.env.MAIL_ACCOUNT,
			pass: process.env.MAIL_PASSWORD,
		},
	});

	async function main() {
		let listItem = '';
		order.orderItems.forEach((x) => {
			listItem += `<div>
            <div>Sản phẩm: <b>${x.name}</b> - Số lượng: <b>${x.amount}</b> - Giá: <b>${x.price} VND</b></div>
            </div>`;
		});

		const info = await transporter.sendMail({
			from: process.env.MAIL_ACCOUNT,
			to: email,
			subject: 'Đơn hàng của bạn đã được phê duyệt',
			html: `<div><b>Chúc mừng! Đơn hàng của bạn đã được phê duyệt</b></div>
                   <div>Mã đơn hàng: <b>${order._id}</b></div>
                   <div>Thời gian phê duyệt: <b>${order.approvedAt}</b></div>
                   <div>Đơn hàng sẽ sớm được giao đến bạn.</div>
                   <br/>
                   <div><b>Chi tiết đơn hàng:</b></div>
                   ${listItem}
                   <div><b>Tổng tiền: ${order.totalPrice} VND</b></div>`,
		});

		console.log('Order approved email sent: %s', info.messageId);
	}

	await main();
};

// Email thông báo đơn hàng bị từ chối
const sendEmailOrderRejected = async (email, order, reason) => {
	// Tạm thời tắt email để test
	console.log('📧 Rejection email would be sent to:', email);
	console.log('📦 Order:', order._id, 'Reason:', reason);
	return;

	const transporter = nodemailer.createTransport({
		host: 'smtp.gmail.com',
		port: 465,
		secure: true,
		auth: {
			user: process.env.MAIL_ACCOUNT,
			pass: process.env.MAIL_PASSWORD,
		},
	});

	async function main() {
		const info = await transporter.sendMail({
			from: process.env.MAIL_ACCOUNT,
			to: email,
			subject: 'Đơn hàng của bạn đã bị từ chối',
			html: `<div><b>Rất tiếc! Đơn hàng của bạn đã bị từ chối</b></div>
                   <div>Mã đơn hàng: <b>${order._id}</b></div>
                   <div>Lý do từ chối: <b>${reason}</b></div>
                   <div>Vui lòng liên hệ với chúng tôi để được hỗ trợ thêm.</div>
                   <div><b>Số tiền sản phẩm đã được hoàn lại vào kho: ${order.totalPrice} VND</b></div>`,
		});

		console.log('Order rejected email sent: %s', info.messageId);
	}

	await main();
};

module.exports = {
	sendEmailCreateOrder,
	sendEmailOrderApproved,
	sendEmailOrderRejected,
};
