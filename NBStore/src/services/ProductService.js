import axios from 'axios';
import { axiosJWT } from './UserService';

export const getAllProduct = async (search, limit) => {
	let res = {};
	if (search?.length > 0) {
		res = await axios.get(
			`${process.env.REACT_APP_API_URL}/product/get-all?filter=name&filter=${search}&limit=${limit}`
		);
	} else {
		res = await axios.get(
			`${process.env.REACT_APP_API_URL}/product/get-all?limit=${limit}`
		);
	}
	return res.data;
};

export const getProductType = async (type, page, limit) => {
	if (type) {
		const res = await axios.get(
			`${process.env.REACT_APP_API_URL}/product/get-all?filter=type&filter=${type}&limit=${limit}&page=${page}`
		);
		return res.data;
	}
};

export const createProduct = async (data, access_token) => {
	console.log('Creating product with data:', data);
	console.log('Access token:', access_token);

	const res = await axiosJWT.post(
		`${process.env.REACT_APP_API_URL}/product/create`,
		{
			name: data.name,
			price: data.price,
			description: data.description,
			type: data.type,
			countInStock: data.countInStock,
			discount: data.discount,
			images: data.images,
		},
		{
			headers: {
				token: `Bearer ${access_token}`,
				'Content-Type': 'application/json',
			},
		}
	);
	return res.data;
};

export const getDetailsProduct = async (id) => {
	const res = await axios.get(
		`${process.env.REACT_APP_API_URL}/product/get-details/${id}`
	);
	return res.data;
};

export const updateProduct = async (id, access_token, data) => {
	const res = await axiosJWT.put(
		`${process.env.REACT_APP_API_URL}/product/update/${id}`,
		data,
		{
			headers: {
				token: `Bearer ${access_token}`,
				'Content-Type': 'application/json',
			},
		}
	);
	return res.data;
};

export const deleteProduct = async (id, access_token) => {
	const res = await axiosJWT.delete(
		`${process.env.REACT_APP_API_URL}/product/delete/${id}`,
		{
			headers: {
				token: `Bearer ${access_token}`,
			},
		}
	);
	return res.data;
};

export const deleteManyProduct = async (data, access_token) => {
	const res = await axiosJWT.post(
		`${process.env.REACT_APP_API_URL}/product/delete-many`,
		data,
		{
			headers: {
				token: `Bearer ${access_token}`,
			},
		}
	);
	return res.data;
};

export const getAllTypeProduct = async () => {
	const res = await axios.get(
		`${process.env.REACT_APP_API_URL}/product/get-all-type`
	);
	return res.data;
};

// Product Type Management APIs
export const createProductType = async (data) => {
	const res = await axiosJWT.post(
		`${process.env.REACT_APP_API_URL}/product/create-type`,
		data,
		{
			headers: {
				token: `Bearer ${data.token}`,
			},
		}
	);
	return res.data;
};

export const updateProductType = async (id, access_token, data) => {
	const res = await axiosJWT.put(
		`${process.env.REACT_APP_API_URL}/product/update-type/${id}`,
		data,
		{
			headers: {
				token: `Bearer ${access_token}`,
			},
		}
	);
	return res.data;
};

export const deleteProductType = async (id, access_token) => {
	const res = await axiosJWT.delete(
		`${process.env.REACT_APP_API_URL}/product/delete-type/${id}`,
		{
			headers: {
				token: `Bearer ${access_token}`,
			},
		}
	);
	return res.data;
};

// Get all product types with full data for management
export const getAllProductTypes = async (limit, page, sort, filter) => {
	let url = `${process.env.REACT_APP_API_URL}/product/get-all-types`;

	const params = new URLSearchParams();
	if (limit) params.append('limit', limit);
	if (page) params.append('page', page);
	if (sort) {
		params.append('sort', sort[0]);
		params.append('sortBy', sort[1]);
	}
	if (filter) {
		params.append('filter', filter[0]);
		params.append('filterBy', filter[1]);
	}

	if (params.toString()) {
		url += `?${params.toString()}`;
	}

	const res = await axios.get(url);
	return res.data;
};

export const getBestSellerProducts = async (limit = 8) => {
	const res = await axios.get(
		`${process.env.REACT_APP_API_URL}/product/get-best-sellers?limit=${limit}`
	);
	return res.data;
};
