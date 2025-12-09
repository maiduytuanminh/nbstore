const Product = require('../models/ProductModel');
const ProductType = require('../models/ProductTypeModel');
const bcrypt = require('bcrypt');
const { all } = require('../routes/ProductRouter');

const createProduct = (newProduct) => {
	return new Promise(async (resolve, reject) => {
		const {
			name,
			images,
			type,
			price,
			countInStock,
			description,
			discount,
		} = newProduct;

		try {
			const checkProduct = await Product.findOne({ name: name });
			if (checkProduct !== null) {
				resolve({
					status: 'OK',
					message: 'The name of product is already',
				});
			}

			// Kiểm tra xem ProductType có tồn tại không
			const productType = await ProductType.findOne({ name: type });
			if (!productType) {
				resolve({
					status: 'ERR',
					message: 'Product type does not exist',
				});
				return;
			}

			const newProduct = await Product.create({
				name,
				images,
				type,
				price,
				countInStock: Number(countInStock),
				description,
				discount: Number(discount) || 0, // Default to 0 if not provided
			});

			if (newProduct) {
				// Tăng productCount trong ProductType
				await ProductType.findByIdAndUpdate(productType._id, {
					$inc: { productCount: 1 },
				});

				resolve({
					status: 'OK',
					message: 'SUCCESS',
					data: newProduct,
				});
			}
		} catch (e) {
			reject(e);
		}
	});
};

const updateProduct = (id, data) => {
	return new Promise(async (resolve, reject) => {
		try {
			const checkProduct = await Product.findOne({ _id: id });
			if (checkProduct === null) {
				resolve({
					status: 'OK',
					message: 'The product is not defined',
				});
				return;
			}

			// Validate images array if provided
			if (data.images !== undefined) {
				if (!Array.isArray(data.images) || data.images.length === 0) {
					resolve({
						status: 'ERR',
						message: 'Images must be a non-empty array',
					});
					return;
				}
			}

			// Nếu có thay đổi type, cần cập nhật productCount
			if (data.type && data.type !== checkProduct.type) {
				// Giảm count của type cũ
				const oldType = await ProductType.findOne({
					name: checkProduct.type,
				});
				if (oldType) {
					await ProductType.findByIdAndUpdate(oldType._id, {
						$inc: { productCount: -1 },
					});
				}

				// Tăng count của type mới
				const newType = await ProductType.findOne({ name: data.type });
				if (!newType) {
					resolve({
						status: 'ERR',
						message: 'New product type does not exist',
					});
					return;
				}

				await ProductType.findByIdAndUpdate(newType._id, {
					$inc: { productCount: 1 },
				});
			}

			const updatedProduct = await Product.findByIdAndUpdate(id, data, {
				new: true,
			});
			resolve({
				status: 'OK',
				message: 'SUCCESS',
				data: updatedProduct,
			});
		} catch (e) {
			reject(e);
		}
	});
};

const getDetailsProduct = (id) => {
	return new Promise(async (resolve, reject) => {
		try {
			const product = await Product.findOne({ _id: id });
			if (product === null) {
				resolve({
					status: 'OK',
					message: 'The product is not defined',
				});
			}

			resolve({
				status: 'OK',
				message: 'SUCCESS',
				data: product,
			});
		} catch (e) {
			reject(e);
		}
	});
};

const deleteProduct = (id) => {
	return new Promise(async (resolve, reject) => {
		try {
			const checkProduct = await Product.findOne({ _id: id });
			if (checkProduct === null) {
				resolve({
					status: 'OK',
					message: 'The product is not defined',
				});
				return;
			}

			// Giảm productCount trong ProductType
			const productType = await ProductType.findOne({
				name: checkProduct.type,
			});
			if (productType) {
				await ProductType.findByIdAndUpdate(productType._id, {
					$inc: { productCount: -1 },
				});
			}

			await Product.findByIdAndDelete(id, { new: true });
			resolve({
				status: 'OK',
				message: 'Delete product is SUCCESS',
			});
		} catch (e) {
			reject(e);
		}
	});
};

const deleteManyProduct = (ids) => {
	return new Promise(async (resolve, reject) => {
		try {
			await Product.deleteMany({ _id: ids });
			resolve({
				status: 'OK',
				message: 'Delete product is SUCCESS',
			});
		} catch (e) {
			reject(e);
		}
	});
};

const getAllProduct = (limit, page, sort, filter) => {
	// 1 trang view bao nhiêu sp = limit
	return new Promise(async (resolve, reject) => {
		try {
			const totalProduct = await Product.countDocuments();
			let allProduct = [];
			if (filter) {
				const allProductFilter = await Product.find({
					[filter[0]]: { $regex: filter[1] },
				})
					.limit(limit)
					.skip(page * limit);
				resolve({
					status: 'OK',
					message: 'SUCCESS',
					data: allProductFilter,
					total: totalProduct,
					pageCurrent: Number(page + 1), // trang hiện tại
					totalPage: Math.ceil(totalProduct / limit), //tổng trang
				});
			}

			if (sort) {
				const ObjectSort = {};
				ObjectSort[sort[1]] = sort[0];
				const allProductSort = await Product.find()
					.limit(limit)
					.skip(page * limit)
					.sort(ObjectSort);
				resolve({
					status: 'OK',
					message: 'SUCCESS',
					data: allProductSort,
					total: totalProduct,
					pageCurrent: Number(page + 1), // trang hiện tại
					totalPage: Math.ceil(totalProduct / limit), //tổng trang
				});
			}
			//skip() bỏ qua x phần tử trc limit()
			if (!limit) {
				allProduct = await Product.find();
			} else {
				allProduct = await Product.find()
					.limit(limit)
					.skip(page * limit);
			}
			resolve({
				status: 'OK',
				message: 'SUCCESS',
				data: allProduct,
				total: totalProduct,
				pageCurrent: Number(page + 1), // trang hiện tại
				totalPage: Math.ceil(totalProduct / limit), //tổng trang
			});
		} catch (e) {
			reject(e);
		}
	});
};

const getBestSellerProducts = async (limit) => {
	try {
		const products = await Product.find({ isBestSeller: true })
			.sort({ selled: -1, createdAt: -1 })
			.limit(limit);

		return {
			status: 'OK',
			message: 'Success',
			data: products,
		};
	} catch (error) {
		throw error;
	}
};

const getAllType = () => {
	return new Promise(async (resolve, reject) => {
		try {
			// Lấy từ bảng ProductType thay vì Product.distinct
			const allTypes = await ProductType.find({ isActive: true }).select(
				'name'
			);
			const typeNames = allTypes.map((type) => type.name);
			resolve({
				status: 'OK',
				message: 'SUCCESS',
				data: typeNames,
			});
		} catch (e) {
			reject(e);
		}
	});
};

const createProductType = (newProductType) => {
	return new Promise(async (resolve, reject) => {
		const { name, description } = newProductType;

		try {
			const checkProductType = await ProductType.findOne({ name: name });
			if (checkProductType !== null) {
				resolve({
					status: 'OK',
					message: 'The name of product type is already',
				});
			}
			const newProductType = await ProductType.create({
				name,
				description,
			});
			if (newProductType) {
				resolve({
					status: 'OK',
					message: 'SUCCESS',
					data: newProductType,
				});
			}
		} catch (e) {
			reject(e);
		}
	});
};

const updateProductType = (id, data) => {
	return new Promise(async (resolve, reject) => {
		try {
			const checkProductType = await ProductType.findOne({ _id: id });
			if (checkProductType === null) {
				resolve({
					status: 'OK',
					message: 'The product type is not defined',
				});
				return;
			}

			// Nếu có thay đổi tên, cần cập nhật tất cả sản phẩm có type cũ
			if (data.name && data.name !== checkProductType.name) {
				// Kiểm tra xem tên mới đã tồn tại chưa
				const existingType = await ProductType.findOne({
					name: data.name,
					_id: { $ne: id }, // Loại trừ chính nó
				});

				if (existingType) {
					resolve({
						status: 'ERR',
						message: 'Product type name already exists',
					});
					return;
				}

				// Cập nhật tất cả sản phẩm có type cũ thành type mới
				await Product.updateMany(
					{ type: checkProductType.name },
					{ $set: { type: data.name } }
				);
			}

			const updatedProductType = await ProductType.findByIdAndUpdate(
				id,
				data,
				{ new: true }
			);
			resolve({
				status: 'OK',
				message: 'SUCCESS',
				data: updatedProductType,
			});
		} catch (e) {
			reject(e);
		}
	});
};

const getDetailsProductType = (id) => {
	return new Promise(async (resolve, reject) => {
		try {
			const productType = await ProductType.findOne({ _id: id });
			if (productType === null) {
				resolve({
					status: 'OK',
					message: 'The product type is not defined',
				});
			}

			resolve({
				status: 'OK',
				message: 'SUCCESS',
				data: productType,
			});
		} catch (e) {
			reject(e);
		}
	});
};

const deleteProductType = (id) => {
	return new Promise(async (resolve, reject) => {
		try {
			const checkProductType = await ProductType.findOne({ _id: id });
			if (checkProductType === null) {
				resolve({
					status: 'OK',
					message: 'The product type is not defined',
				});
				return;
			}

			// Kiểm tra xem có sản phẩm nào đang sử dụng type này không
			const productsUsingType = await Product.countDocuments({
				type: checkProductType.name,
			});
			if (productsUsingType > 0) {
				resolve({
					status: 'ERR',
					message: `Cannot delete product type. There are ${productsUsingType} products using this type.`,
				});
				return;
			}

			await ProductType.findByIdAndDelete(id, { new: true });
			resolve({
				status: 'OK',
				message: 'Delete product type is SUCCESS',
			});
		} catch (e) {
			reject(e);
		}
	});
};

const deleteManyProductType = (ids) => {
	return new Promise(async (resolve, reject) => {
		try {
			await ProductType.deleteMany({ _id: ids });
			resolve({
				status: 'OK',
				message: 'Delete product type is SUCCESS',
			});
		} catch (e) {
			reject(e);
		}
	});
};

const getAllProductType = (limit, page, sort, filter) => {
	// 1 trang view bao nhiêu sp = limit
	return new Promise(async (resolve, reject) => {
		try {
			const totalProductType = await ProductType.countDocuments();
			let allProductType = [];
			if (filter) {
				const allProductTypeFilter = await ProductType.find({
					[filter[0]]: { $regex: filter[1] },
				})
					.limit(limit)
					.skip(page * limit);
				resolve({
					status: 'OK',
					message: 'SUCCESS',
					data: allProductTypeFilter,
					total: totalProductType,
					pageCurrent: Number(page + 1), // trang hiện tại
					totalPage: Math.ceil(totalProductType / limit), //tổng trang
				});
			}

			if (sort) {
				const ObjectSort = {};
				ObjectSort[sort[1]] = sort[0];
				const allProductTypeSort = await ProductType.find()
					.limit(limit)
					.skip(page * limit)
					.sort(ObjectSort);
				resolve({
					status: 'OK',
					message: 'SUCCESS',
					data: allProductTypeSort,
					total: totalProductType,
					pageCurrent: Number(page + 1), // trang hiện tại
					totalPage: Math.ceil(totalProductType / limit), //tổng trang
				});
			}
			//skip() bỏ qua x phần tử trc limit()
			if (!limit) {
				allProductType = await ProductType.find();
			} else {
				allProductType = await ProductType.find()
					.limit(limit)
					.skip(page * limit);
			}
			resolve({
				status: 'OK',
				message: 'SUCCESS',
				data: allProductType,
				total: totalProductType,
				pageCurrent: Number(page + 1), // trang hiện tại
				totalPage: Math.ceil(totalProductType / limit), //tổng trang
			});
		} catch (e) {
			reject(e);
		}
	});
};

module.exports = {
	createProduct,
	updateProduct,
	getDetailsProduct,
	deleteProduct,
	getAllProduct,
	deleteManyProduct,
	getAllType,
	createProductType,
	updateProductType,
	getDetailsProductType,
	deleteProductType,
	deleteManyProductType,
	getAllProductType,
	getBestSellerProducts,
};
