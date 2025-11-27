const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
	{
		name: { type: String, required: true, unique: true }, //tên sp
		images: { type: [String], required: true }, // link ảnh
		type: { type: String, required: true }, // loại sp
		price: { type: Number, required: true },
		countInStock: { type: Number, required: true }, // số lượng sản phẩm
		description: { type: String }, // mô tả sản phẩm
		discount: { type: Number },
		selled: { type: Number },
		isBestSeller: { type: Boolean, default: false }, // đánh dấu sản phẩm bán chạy
	},
	{
		timestamps: true, // sẽ có thời gian tạo và update
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
const Product = mongoose.model('Product', productSchema);
module.exports = Product;
