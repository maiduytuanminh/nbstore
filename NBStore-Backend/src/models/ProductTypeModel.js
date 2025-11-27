const mongoose = require('mongoose');

const productTypeSchema = new mongoose.Schema(
	{
		name: { type: String, required: true, unique: true },
		description: { type: String },
		isActive: { type: Boolean, default: true },
		productCount: { type: Number, default: 0 },
	},
	{
		timestamps: true,
	}
);

const ProductType = mongoose.model('ProductType', productTypeSchema);
module.exports = ProductType;
