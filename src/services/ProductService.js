import axios from 'axios';

export const getProductBy = async (value) => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/product/get-product-by/${value}`);
    return res.data;
};

export const getAllProduct = async (search) => {
    let res = {}
    if (search?.length > 0) {
        res = await axios.get(`${process.env.REACT_APP_API_URL}/product/getAll?filter=name&filter=${search}`);
    } else {
        res = await axios.get(`${process.env.REACT_APP_API_URL}/product/getAll`);
    }
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
