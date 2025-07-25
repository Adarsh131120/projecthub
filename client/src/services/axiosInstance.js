// import axios from 'axios';

// const baseURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

// const axiosInstance = axios.create({
//   baseURL,
//   withCredentials: true,
// });

// axiosInstance.interceptors.request.use((config) => {
//   const token = localStorage.getItem('token');
//   if (token) config.headers.Authorization = `Bearer ${token}`;
//   return config;
// });

// export default axiosInstance;


import axios from 'axios';

const baseURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

const axiosInstance = axios.create({
  baseURL,
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default axiosInstance;