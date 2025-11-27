import axios from "axios";

export const axiosJWT = axios.create();

export const loginUser = async (data) => {
    const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/user/sign-in`,
        data
    );
    return res.data;
};

export const signupUser = async (data) => {
    try {
        console.log("Sending signup request with data:", data);
        const res = await axios.post(
            `${process.env.REACT_APP_API_URL}/user/sign-up`,
            data
        );
        console.log("Signup response:", res.data);
        return res.data;
    } catch (error) {
        console.error("Error in signupUser:", error.response?.data || error);
        throw error;
    }
};

export const getDetailsUser = async (id, access_token) => {
    const res = await axiosJWT.get(
        `${process.env.REACT_APP_API_URL}/user/get-details/${id}`,
        {
            headers: {
                token: `Bearer ${access_token}`,
            },
        }
    );
    return res.data;
};

export const deleteUser = async (id, access_token) => {
    try {
        console.log("Deleting user with ID:", id);
        const res = await axiosJWT.delete(
            `${process.env.REACT_APP_API_URL}/user/delete-user/${id}`,
            {
                headers: {
                    token: `Bearer ${access_token}`,
                },
            }
        );
        return res.data;
    } catch (error) {
        console.error("Error deleting user:", error);
        throw error;
    }
};

export const getAllUser = async (access_token) => {
    try {
        const res = await axiosJWT.get(
            `${process.env.REACT_APP_API_URL}/user/get-all-user`,
            {
                headers: {
                    token: `Bearer ${access_token}`,
                },
            }
        );
        return res.data;
    } catch (error) {
        console.error("Error fetching all users:", error);
        throw error;
    }
};

// export const refreshToken = async () => {
//     const res = await axios.post(`${process.env.REACT_APP_API_URL}/user/refresh-token`, {
//         withCredentials: true
//     })
//     return res.data
// }

export const refreshToken = async (refreshToken) => {
    const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/user/refresh-token`,
        {},
        {
            headers: {
                token: `Bearer ${refreshToken}`,
            },
        }
    );
    return res.data;
};

export const logoutUser = async (access_token, refreshToken) => {
    const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/user/log-out`,
        { refreshToken },
        {
            headers: {
                token: `Bearer ${access_token}`,
            },
        }
    );
    return res.data;
};

export const updateUser = async (id, data, access_token) => {
    const res = await axiosJWT.put(
        `${process.env.REACT_APP_API_URL}/user/update-user/${id}`,
        data,
        {
            headers: {
                token: `Bearer ${access_token}`,
            },
        }
    );
    return res.data;
};

export const deleteManyUser = async (data, access_token) => {
    const res = await axiosJWT.post(
        `${process.env.REACT_APP_API_URL}/user/delete-many`,
        data,
        {
            headers: {
                token: `Bearer ${access_token}`,
            },
        }
    );
    return res.data;
};
