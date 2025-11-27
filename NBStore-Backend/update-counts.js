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
		updateProductCounts();
	})
	.catch((err) => {
		console.log('Error connecting to MongoDB:', err);
		process.exit(1);
	});

async function updateProductCounts() {
	try {
		console.log('Updating product counts for existing types...');

		// Lấy tất cả ProductTypes
		const allTypes = await ProductType.find({});
		console.log(`Found ${allTypes.length} product types`);

		for (const type of allTypes) {
			const productCount = await Product.countDocuments({
				type: type.name,
			});
			await ProductType.findByIdAndUpdate(type._id, { productCount });
			console.log(`✅ ${type.name}: ${productCount} products`);
		}

		console.log('\n🎉 Product counts updated successfully!');

		// Hiển thị kết quả cuối
		console.log('\n📊 Final Summary:');
		const updatedTypes = await ProductType.find({});
		updatedTypes.forEach((type) => {
			console.log(`  - ${type.name}: ${type.productCount} products`);
		});

		process.exit(0);
	} catch (error) {
		console.error('❌ Error updating product counts:', error);
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
