const ProductService = require('../services/ProductService');

const createProduct = async (req, res) => {
	try {
		console.log('Received product data:', req.body);
		const {
			name,
			images,
			type,
			price,
			countInStock,
			description,
			discount,
		} = req.body;

		console.log('Images:', images);
		console.log('Images type:', typeof images);
		console.log('Images is array:', Array.isArray(images));
		console.log('Images length:', images?.length);

		if (
			!name ||
			!images ||
			!Array.isArray(images) ||
			images.length === 0 ||
			!type ||
			!price ||
			!countInStock
		) {
			return res.status(200).json({
				status: 'ERR',
				message:
					'The input is required and images must be a non-empty array',
			});
		}
		const response = await ProductService.createProduct(req.body);
		return res.status(200).json(response);
	} catch (e) {
		return res.status(404).json({
			message: e.message,
		});
	}
};

const updateProduct = async (req, res) => {
	try {
		const productId = req.params.id;
		const data = req.body;
		if (!productId) {
			return res.status(200).json({
				status: 'ERR',
				message: 'The productId is required',
			});
		}
		const response = await ProductService.updateProduct(productId, data);
		return res.status(200).json(response);
	} catch (e) {
		return res.status(404).json({
			message: e.message,
		});
	}
};

const getDetailsProduct = async (req, res) => {
	try {
		const productId = req.params.id;
		if (!productId) {
			return res.status(200).json({
				status: 'ERR',
				message: 'The productId is required',
			});
		}
		const response = await ProductService.getDetailsProduct(productId);
		return res.status(200).json(response);
	} catch (e) {
		return res.status(404).json({
			message: e.message,
		});
	}
};

const deleteProduct = async (req, res) => {
	try {
		const productId = req.params.id;
		if (!productId) {
			return res.status(200).json({
				status: 'ERR',
				message: 'The productId is required',
			});
		}
		const response = await ProductService.deleteProduct(productId);
		return res.status(200).json(response);
	} catch (e) {
		return res.status(404).json({
			message: e.message,
		});
	}
};

const deleteMany = async (req, res) => {
	try {
		const ids = req.body.ids;
		if (!ids) {
			return res.status(200).json({
				status: 'ERR',
				message: 'The ids is required',
			});
		}
		const response = await ProductService.deleteManyProduct(ids);
		return res.status(200).json(response);
	} catch (e) {
		return res.status(404).json({
			message: e.message,
		});
	}
};

const getAllProduct = async (req, res) => {
	try {
		const { limit, page, sort, filter } = req.query;
		const response = await ProductService.getAllProduct(
			Number(limit) || null,
			Number(page) || 0,
			sort,
			filter
		);
		return res.status(200).json(response);
	} catch (e) {
		return res.status(404).json({
			message: e.message,
		});
	}
};

const getAllType = async (req, res) => {
	try {
		const response = await ProductService.getAllType();
		return res.status(200).json(response);
	} catch (e) {
		return res.status(404).json({
			message: e.message,
		});
	}
};

// Product Type Management Controllers
const createProductType = async (req, res) => {
	try {
		const { name } = req.body;
		if (!name) {
			return res.status(200).json({
				status: 'ERR',
				message: 'Type name is required',
			});
		}
		const response = await ProductService.createProductType(req.body);
		return res.status(200).json(response);
	} catch (e) {
		return res.status(404).json({
			message: e.message,
		});
	}
};

const updateProductType = async (req, res) => {
	try {
		const typeId = req.params.id;
		const data = req.body;
		if (!typeId) {
			return res.status(200).json({
				status: 'ERR',
				message: 'The typeId is required',
			});
		}
		const response = await ProductService.updateProductType(typeId, data);
		return res.status(200).json(response);
	} catch (e) {
		return res.status(404).json({
			message: e.message,
		});
	}
};

const deleteProductType = async (req, res) => {
	try {
		const typeId = req.params.id;
		if (!typeId) {
			return res.status(200).json({
				status: 'ERR',
				message: 'The typeId is required',
			});
		}
		const response = await ProductService.deleteProductType(typeId);
		return res.status(200).json(response);
	} catch (e) {
		return res.status(404).json({
			message: e.message,
		});
	}
};

const getAllProductType = async (req, res) => {
	try {
		const { limit, page, sort, filter } = req.query;
		const response = await ProductService.getAllProductType(
			Number(limit) || 8,
			Number(page) || 0,
			sort ? [sort, req.query.sortBy] : null,
			filter ? [filter, req.query.filterBy] : null
		);
		return res.status(200).json(response);
	} catch (e) {
		return res.status(404).json({
			message: e.message,
		});
	}
};

const getBestSellerProducts = async (req, res) => {
	try {
		const { limit } = req.query;
		const response = await ProductService.getBestSellerProducts(
			Number(limit) || 8
		);
		return res.status(200).json(response);
	} catch (e) {
		return res.status(404).json({
			message: e.message,
		});
	}
};

module.exports = {
	createProduct,
	updateProduct,
	getDetailsProduct,
	deleteProduct,
	getAllProduct,
	deleteMany,
	getAllType,
	getAllProductType,
	createProductType,
	updateProductType,
	deleteProductType,
	getBestSellerProducts,
};
