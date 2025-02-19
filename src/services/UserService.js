import axios from 'axios';

export const axiosJWT = axios.create()

export const loginUser = async(data) => {
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/user/sign-in`, data);
    return res.data;
};

export const signupUser = async(data) => {
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/user/sign-up`, data);
    return res.data;
};

export const getDetailsUser = async(id, access_token) => {
    const res = await axiosJWT.get(`${process.env.REACT_APP_API_URL}/user/get-details/${id}`, {
        headers: {
            token: `Bearer ${access_token}`
        }
    },)
    return res.data;
};

export const refreshToken = async() => {
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/user/refresh-token`, {
        withCredentials: true
    })
    return res.data;
};

export const logOutUser = async() => {
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/user/log-out`, {
        withCredentials: true
    })
    return res.data;
};