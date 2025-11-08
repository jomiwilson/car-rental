import axios from 'axios';

// Connect directly to your Render backend
const API = axios.create({
  baseURL: 'https://car-rental-backend.onrender.com/api',
});

// Add token automatically for logged-in users
API.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;
