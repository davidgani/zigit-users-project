import axios, { AxiosInstance } from 'axios';

const axiosInstance: AxiosInstance = axios.create({
  baseURL: 'https://localhost:7295/',
  timeout: 20000, 
});

export default axiosInstance;