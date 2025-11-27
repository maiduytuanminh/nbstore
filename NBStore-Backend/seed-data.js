const mongoose = require("mongoose");
const User = require("./src/models/UserModel");
const Product = require("./src/models/ProductModel");
const bcrypt = require("bcrypt");

// Kết nối MongoDB
mongoose
    .connect("mongodb://localhost:27017/nbstore")
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.error("Could not connect to MongoDB", err));

// Tạo users mẫu
async function createSampleUsers() {
    try {
        // Xóa users cũ
        await User.deleteMany({});

        // Tạo admin user
        const adminPassword = await bcrypt.hash("123456", 10);
        const admin = new User({
            name: "Admin",
            email: "admin@gmail.com",
            password: adminPassword,
            isAdmin: true,
            phone: "0123456789",
            address: "Hà Nội",
        });
        await admin.save();

        // Tạo 10 users thường
        const users = [];
        for (let i = 1; i <= 10; i++) {
            const userPassword = await bcrypt.hash("123456", 10);
            users.push({
                name: `User ${i}`,
                email: `user${i}@gmail.com`,
                password: userPassword,
                phone: `09${String(i).padStart(8, "0")}`,
                address: `Địa chỉ ${i}, Hà Nội`,
            });
        }
        await User.insertMany(users);
        console.log("Đã tạo thành công users mẫu");
    } catch (error) {
        console.error("Lỗi khi tạo users mẫu:", error);
    }
}

// Tạo products mẫu
async function createSampleProducts() {
    try {
        // Xóa products cũ
        await Product.deleteMany({});

        const productTypes = [
            "Laptop",
            "Điện thoại",
            "Máy tính bảng",
            "Phụ kiện",
        ];
        const products = [];

        for (let i = 1; i <= 20; i++) {
            const type =
                productTypes[Math.floor(Math.random() * productTypes.length)];
            const price = Math.floor(
                Math.random() * (50000000 - 1000000) + 1000000
            );
            const discount =
                Math.random() > 0.5 ? Math.floor(Math.random() * 30) : 0;

            products.push({
                name: `${type} ${i}`,
                image: "https://picsum.photos/200",
                type,
                price,
                countInStock: Math.floor(Math.random() * 100) + 10,
                rating: Math.floor(Math.random() * 5) + 1,
                description: `Mô tả chi tiết về ${type} ${i}`,
                discount,
                selled: Math.floor(Math.random() * 50),
                isBestSeller: Math.random() > 0.8,
            });
        }

        await Product.insertMany(products);
        console.log("Đã tạo thành công products mẫu");
    } catch (error) {
        console.error("Lỗi khi tạo products mẫu:", error);
    }
}

// Chạy các hàm tạo dữ liệu mẫu
async function seedData() {
    try {
        await createSampleUsers();
        await createSampleProducts();
        console.log("Hoàn thành tạo dữ liệu mẫu");
        mongoose.disconnect();
    } catch (error) {
        console.error("Lỗi khi tạo dữ liệu mẫu:", error);
        mongoose.disconnect();
    }
}

seedData();
