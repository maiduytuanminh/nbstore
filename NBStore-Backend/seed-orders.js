const mongoose = require("mongoose");
const Order = require("./src/models/OrderProduct");
const Product = require("./src/models/ProductModel");
const User = require("./src/models/UserModel");

// Kết nối MongoDB
mongoose
    .connect("mongodb://localhost:27017/nbstore")
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.error("Could not connect to MongoDB", err));

// Hàm tạo ngày ngẫu nhiên trong khoảng thời gian
function randomDate(start, end) {
    return new Date(
        start.getTime() + Math.random() * (end.getTime() - start.getTime())
    );
}

// Hàm tạo số ngẫu nhiên trong khoảng
function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Hàm tạo đơn hàng mẫu
async function createSampleOrders() {
    try {
        // Lấy danh sách users và products
        const users = await User.find();
        const products = await Product.find();

        if (!users.length || !products.length) {
            console.error("Không có users hoặc products trong database");
            return;
        }

        // Xóa tất cả orders cũ
        await Order.deleteMany({});

        const statuses = [
            "pending",
            "approved",
            "paid",
            "shipping",
            "delivered",
            "cancelled",
            "rejected",
        ];
        const cities = [
            "Hà Nội",
            "Hồ Chí Minh",
            "Đà Nẵng",
            "Hải Phòng",
            "Cần Thơ",
        ];
        const districts = ["Quận 1", "Quận 2", "Quận 3", "Quận 4", "Quận 5"];
        const streets = [
            "Nguyễn Huệ",
            "Lê Lợi",
            "Trần Hưng Đạo",
            "Lê Duẩn",
            "Nguyễn Văn Linh",
        ];

        // Tạo 50 đơn hàng mẫu
        const orders = [];
        const startDate = new Date("2024-01-01");
        const endDate = new Date();

        for (let i = 0; i < 50; i++) {
            const user = users[Math.floor(Math.random() * users.length)];
            const numItems = randomInt(1, 5); // Số sản phẩm trong đơn từ 1-5
            const orderItems = [];
            let itemsPrice = 0;

            // Tạo các sản phẩm trong đơn
            for (let j = 0; j < numItems; j++) {
                const product =
                    products[Math.floor(Math.random() * products.length)];
                const amount = randomInt(1, 3);
                const price = product.price;
                const discount = product.discount || 0;

                orderItems.push({
                    name: product.name,
                    amount,
                    image: product.image,
                    price,
                    discount,
                    product: product._id,
                });

                itemsPrice += price * amount;
            }

            const shippingPrice = 30000; // Phí ship cố định
            const totalPrice = itemsPrice + shippingPrice;
            const status =
                statuses[Math.floor(Math.random() * statuses.length)];
            const createdAt = randomDate(startDate, endDate);

            const city = cities[Math.floor(Math.random() * cities.length)];
            const district =
                districts[Math.floor(Math.random() * districts.length)];
            const street = streets[Math.floor(Math.random() * streets.length)];

            const order = new Order({
                orderItems,
                shippingAddress: {
                    fullName: "Khách hàng " + (i + 1),
                    address: `${randomInt(1, 100)} ${street}`,
                    city,
                    district,
                    province: city,
                    phone: `0${randomInt(900000000, 999999999)}`,
                    fullAddress: `${randomInt(
                        1,
                        100
                    )} ${street}, ${district}, ${city}`,
                    coordinates: {
                        lat: 21.0285 + Math.random() * 0.1,
                        lng: 105.8542 + Math.random() * 0.1,
                    },
                },
                paymentMethod: Math.random() > 0.5 ? "cash" : "paypal",
                itemsPrice,
                shippingPrice,
                totalPrice,
                user: user._id,
                status,
                isPaid: ["paid", "delivered"].includes(status),
                paidAt: ["paid", "delivered"].includes(status)
                    ? createdAt
                    : null,
                isDelivered: status === "delivered",
                deliveredAt:
                    status === "delivered"
                        ? new Date(createdAt.getTime() + 24 * 60 * 60 * 1000)
                        : null,
                createdAt,
            });

            orders.push(order);
        }

        // Lưu tất cả đơn hàng vào database
        await Order.insertMany(orders);
        console.log("Đã tạo thành công 50 đơn hàng mẫu");
        mongoose.disconnect();
    } catch (error) {
        console.error("Lỗi khi tạo đơn hàng mẫu:", error);
        mongoose.disconnect();
    }
}

// Chạy script
createSampleOrders();
