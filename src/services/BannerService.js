import axios from 'axios';

export const getBannerByLocation = async(location) => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/banner/get-banner-by-location/${location}`)
    return res.data;
};
