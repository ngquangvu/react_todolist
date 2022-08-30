import axios from 'axios';

const axiosClient = axios.create({
    baseURL: 'http://localhost/',
    headers: {
        'content-type': 'application/json',
    }
})

export default axiosClient;