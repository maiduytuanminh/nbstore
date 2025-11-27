const mongoose = require('mongoose');
const Order = require('./src/models/OrderProduct');

// Test script để debug order not found issue
async function testOrderFind() {
	try {
		// Connect to MongoDB
		const mongoUri =
			'mongodb+srv://qd26122003:quocduy2612@cluster0.omfeeky.mongodb.net/?retryWrites=true&w=majority&appName=Cluster';
		await mongoose.connect(mongoUri);

		console.log('Connected to MongoDB');

		const testOrderId1 = '67ee8fa93178dfaa51d9d8e8'; // From URL
		const testOrderId2 = '685bb74e219900d5a948d12e'; // From payload

		console.log('\n=== Testing Order ID from URL ===');
		console.log('Looking for order:', testOrderId1);
		const order1 = await Order.findById(testOrderId1);
		console.log('Found order1:', order1 ? 'YES' : 'NO');
		if (order1) {
			console.log('Order1 status:', order1.status);
			console.log('Order1 user:', order1.user);
		}

		console.log('\n=== Testing Order ID from payload ===');
		console.log('Looking for order:', testOrderId2);
		const order2 = await Order.findById(testOrderId2);
		console.log('Found order2:', order2 ? 'YES' : 'NO');
		if (order2) {
			console.log('Order2 status:', order2.status);
			console.log('Order2 user:', order2.user);
		}

		console.log('\n=== Listing all orders ===');
		const allOrders = await Order.find()
			.limit(5)
			.select('_id status user shippingAddress');
		console.log('Total orders found:', allOrders.length);
		allOrders.forEach((order, index) => {
			console.log(`Order ${index + 1}:`, {
				id: order._id.toString(),
				status: order.status,
				user: order.user,
				fullName: order.shippingAddress?.fullName,
			});
		});
	} catch (error) {
		console.error('Error:', error);
	} finally {
		await mongoose.disconnect();
		console.log('\nDisconnected from MongoDB');
	}
}

// Run the test
testOrderFind();
