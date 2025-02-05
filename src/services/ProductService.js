import axios from 'axios';

export const getProductBy = async(category) => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/product/get-product-by/${category}`)
    return res.data;
};

export const getAllProduct = async() => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/product/getAll`)
    return res.data;
};

export const getProductTrending = async(value) => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/product/get-product-by/${value}`)
    return res.data;
};
