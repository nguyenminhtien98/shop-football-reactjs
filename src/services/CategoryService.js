import axios from 'axios';

export const getCategory = async() => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/category/get-all`)
    return res.data;
};