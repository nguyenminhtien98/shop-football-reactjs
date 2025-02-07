import axios from 'axios';

export const getProductBy = async (value) => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/product/get-product-by/${value}`);
    return res.data;
};

export const getAllProduct = async () => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/product/getAll`);
    return res.data;
};

export const getProductTrending = async (value) => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/product/get-product-by/${value}`);
    return res.data;
};

export const getProductDetail = async (slug, id) => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/product/get-details/${slug}-${id}`);
    return res.data;
};
