import axios from "axios";
import Cookies from "js-cookie";

const axiosWebInstance = axios.create({
    baseURL: 'http://localhost:5000/api'
});

axiosWebInstance.interceptors.request.use((config) => {
    // const jwtToken = localStorage.getItem('ACCESS_TOKEN_WEB');
    const jwtToken = Cookies.get('ACCESS_TOKEN_WEB');
    config.headers.Authorization = `Bearer ${jwtToken}`;
    return config;
});

// response interceptor
axiosWebInstance.interceptors.response.use((response) => {
    return response;
}, (error) => {
    const {response} = error;
    if (response.status === 401) {
        // localStorage.removeItem('ACCESS_TOKEN_WEB');
        Cookies.remove('ACCESS_TOKEN_WEB');
    }
    throw error;
});


export default axiosWebInstance;