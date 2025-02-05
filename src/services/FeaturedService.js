import axios from 'axios';


export const getFeaturedHome = async() => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/featured/get-featured-home`)
    return res.data;
};
