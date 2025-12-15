const mongoose = require('mongoose');
const dotenv = require('dotenv');
const ProductType = require('./src/models/ProductTypeModel');
const Product = require('./src/models/ProductModel');

dotenv.config();

// Kết nối database
mongoose
	.connect(process.env.MONGO_DB_APP)
	.then(() => {
		console.log('Connected to MongoDB successfully!');
		seedData();
	})
	.catch((err) => {
		console.log('Error connecting to MongoDB:', err);
		process.exit(1);
	});

// Dữ liệu mẫu cho ProductType
const productTypes = [
	{
		name: 'Điện thoại',
		description: 'Điện thoại di động và smartphone',
		isActive: true,
	},
	{
		name: 'Laptop',
		description: 'Máy tính xách tay',
		isActive: true,
	},
	{
		name: 'Tablet',
		description: 'Máy tính bảng',
		isActive: true,
	},
	{
		name: 'Phụ kiện',
		description: 'Phụ kiện điện tử',
		isActive: true,
	},
	{
		name: 'Đồng hồ thông minh',
		description: 'Smart watch và wearable devices',
		isActive: true,
	},
	{
		name: 'Tai nghe',
		description: 'Tai nghe và headphone',
		isActive: true,
	},
	{
		name: 'Camera',
		description: 'Máy ảnh và camera',
		isActive: true,
	},
];

// Dữ liệu mẫu cho Product
const sampleProducts = [
	{
		name: 'iPhone 15 Pro Max',
		type: 'Điện thoại',
		price: 25000000,
		countInStock: 50,
		rating: 5,
		description: 'iPhone 15 Pro Max với chip A17 Pro, camera siêu nét',
		discount: 5,
		image: 'https://example.com/iphone15.jpg',
	},
	{
		name: 'MacBook Air M2',
		type: 'Laptop',
		price: 32000000,
		countInStock: 30,
		rating: 5,
		description: 'MacBook Air với chip M2, hiệu năng vượt trội',
		discount: 10,
		image: 'https://example.com/macbook.jpg',
	},
	{
		name: 'iPad Pro 12.9',
		type: 'Tablet',
		price: 28000000,
		countInStock: 25,
		rating: 4.8,
		description: 'iPad Pro 12.9 inch với màn hình Liquid Retina XDR',
		discount: 7,
		image: 'https://example.com/ipad.jpg',
	},
	{
		name: 'AirPods Pro',
		type: 'Tai nghe',
		price: 6000000,
		countInStock: 100,
		rating: 4.7,
		description: 'AirPods Pro với tính năng chống ồn chủ động',
		discount: 15,
		image: 'https://example.com/airpods.jpg',
	},
	{
		name: 'Apple Watch Series 9',
		type: 'Đồng hồ thông minh',
		price: 9000000,
		countInStock: 40,
		rating: 4.6,
		description: 'Apple Watch Series 9 với GPS và Cellular',
		discount: 12,
		image: 'https://example.com/applewatch.jpg',
	},
];

async function seedData() {
	try {
		console.log('Starting to seed data...');

		// Xóa dữ liệu cũ
		console.log('Clearing existing data...');
		await Product.deleteMany({});
		await ProductType.deleteMany({});

		// Tạo ProductTypes
		console.log('Creating product types...');
		const createdTypes = await ProductType.insertMany(productTypes);
		console.log(`Created ${createdTypes.length} product types`);

		// Tạo Products
		console.log('Creating products...');
		const createdProducts = await Product.insertMany(sampleProducts);
		console.log(`Created ${createdProducts.length} products`);

		// Cập nhật productCount cho các types
		console.log('Updating product counts...');
		for (const type of createdTypes) {
			const productCount = await Product.countDocuments({
				type: type.name,
			});
			await ProductType.findByIdAndUpdate(type._id, { productCount });
			console.log(`  - ${type.name}: ${productCount} products`);
		}

		console.log('✅ Seed data completed successfully!');

		// Hiển thị kết quả
		console.log('\n📋 Summary:');
		const totalTypes = await ProductType.countDocuments();
		const totalProducts = await Product.countDocuments();
		console.log(`- Product Types: ${totalTypes}`);
		console.log(`- Products: ${totalProducts}`);

		// Hiển thị chi tiết types
		console.log('\n📱 Product Types:');
		const types = await ProductType.find({});
		types.forEach((type) => {
			console.log(`  - ${type.name}: ${type.productCount} products`);
		});

		process.exit(0);
	} catch (error) {
		console.error('❌ Error seeding data:', error);
		process.exit(1);
	}
}

// Xử lý tắt ứng dụng
process.on('SIGINT', () => {
	mongoose.connection.close(() => {
		console.log('MongoDB connection closed.');
		process.exit(0);
	});
});
