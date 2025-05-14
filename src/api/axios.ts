import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://bml-server-kv1a.onrender.com', // or your backend URL
  withCredentials: true,
});

export default instance;
