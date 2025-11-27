import { axiosJWT } from "./UserService";
import axios from "axios";

export const createProduct = async (data) => {
    const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/product/create`,
        data
    );
    return res.data;
};
// http://localhost:3001/api/order/get-order-details/639724669c6dda4fa11edcde
export const createOrder = async (data, access_token) => {
    debugger;
    const res = await axiosJWT.post(
        `${process.env.REACT_APP_API_URL}/order/create/${data.user}`,
        data,
        {
            headers: {
                token: `Bearer ${access_token}`,
            },
        }
    );
    return res.data;
};

export const getOrderByUserId = async (id, access_token) => {
    const res = await axiosJWT.get(
        `${process.env.REACT_APP_API_URL}/order/get-all-order/${id}`,
        {
            headers: {
                token: `Bearer ${access_token}`,
            },
        }
    );
    return res.data;
};

export const getDetailsOrder = async (id, access_token) => {
    const res = await axiosJWT.get(
        `${process.env.REACT_APP_API_URL}/order/get-details-order/${id}`,
        {
            headers: {
                token: `Bearer ${access_token}`,
            },
        }
    );
    return res.data;
};

export const cancelOrder = async (id, access_token, orderItems) => {
    const res = await axiosJWT.delete(
        `${process.env.REACT_APP_API_URL}/order/cancel-order/${id}`,
        {
            headers: {
                token: `Bearer ${access_token}`,
            },
            data: { orderItems },
        }
    );
    return res.data;
};

export const getAllOrder = async (access_token) => {
    const res = await axiosJWT.get(
        `${process.env.REACT_APP_API_URL}/order/get-all-order`,
        {
            headers: {
                token: `Bearer ${access_token}`,
            },
        }
    );
    return res.data;
};

export const updateOrderStatus = async (orderId, status, access_token) => {
    const res = await axiosJWT.patch(
        `${process.env.REACT_APP_API_URL}/order/status/${orderId}`,
        { status },
        {
            headers: {
                token: `Bearer ${access_token}`,
            },
        }
    );
    return res.data;
};

// Admin: Phê duyệt đơn hàng
export const approveOrder = async (orderId, access_token) => {
    const res = await axiosJWT.put(
        `${process.env.REACT_APP_API_URL}/order/approve/${orderId}`,
        {},
        {
            headers: {
                token: `Bearer ${access_token}`,
            },
        }
    );
    return res.data;
};

// Admin: Từ chối đơn hàng
export const rejectOrder = async (orderId, reason, access_token) => {
    const res = await axiosJWT.put(
        `${process.env.REACT_APP_API_URL}/order/reject/${orderId}`,
        { reason },
        {
            headers: {
                token: `Bearer ${access_token}`,
            },
        }
    );
    return res.data;
};

// Admin: Cập nhật trạng thái đang giao hàng
export const updateOrderShipping = async (orderId, access_token) => {
    const res = await axiosJWT.put(
        `${process.env.REACT_APP_API_URL}/order/shipping/${orderId}`,
        {},
        {
            headers: {
                token: `Bearer ${access_token}`,
            },
        }
    );
    return res.data;
};

// Admin: Cập nhật trạng thái đã giao hàng
export const updateOrderDelivered = async (orderId, access_token) => {
    const res = await axiosJWT.put(
        `${process.env.REACT_APP_API_URL}/order/delivered/${orderId}`,
        {},
        {
            headers: {
                token: `Bearer ${access_token}`,
            },
        }
    );
    return res.data;
};

// Admin: Cập nhật trạng thái đã thanh toán
export const updateOrderPaid = async (orderId, access_token) => {
    const res = await axiosJWT.put(
        `${process.env.REACT_APP_API_URL}/order/paid/${orderId}`,
        {},
        {
            headers: {
                token: `Bearer ${access_token}`,
            },
        }
    );
    return res.data;
};

export const deleteOrder = async (id, access_token) => {
    const res = await axiosJWT.delete(
        `${process.env.REACT_APP_API_URL}/order/delete-order/${id}`,
        {
            headers: {
                token: `Bearer ${access_token}`,
            },
        }
    );
    return res.data;
};
