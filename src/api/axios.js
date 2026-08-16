import axios from 'axios';

const api = axios.create({
    baseURL: 'https://ecommerce-b-theta.vercel.app/api',
});

export default api;