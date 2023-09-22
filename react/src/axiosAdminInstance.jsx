import axios from "axios";
import Cookies from "js-cookie";

const axiosAdminInstance = axios.create({
    baseURL: 'http://localhost:5000/api/admin'
});

axiosAdminInstance.interceptors.request.use((config) => {
    // const jwtToken = localStorage.getItem('ACCESS_TOKEN_ADMIN');
    const jwtToken = Cookies.get('ACCESS_TOKEN_ADMIN');
    config.headers.Authorization = `Bearer ${jwtToken}`;
    return config;
});

// response interceptor
axiosAdminInstance.interceptors.response.use((response) => {
    return response;
}, (error) => {
    const {response} = error;
    if (response.status === 401) {
        // localStorage.removeItem('ACCESS_TOKEN_ADMIN');
        Cookies.remove('ACCESS_TOKEN_ADMIN');
    }
    throw error;
})


export default axiosAdminInstance;