import axios from 'axios';

const instance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_BASE_URL , // or your backend URL
  withCredentials: true,
});
console.log(1,import.meta.env.BACKEND_BASE_URL)
export default instance;
