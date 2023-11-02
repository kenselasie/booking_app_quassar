import axios from 'axios';

const http = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// For requests without headers
// http.interceptors.request.use(
//   (config) => {
//     config.headers['X-Requested-With'] = 'XMLHttpRequest';
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

http.interceptors.response.use(undefined, (error) => {
  const errorResponse = error.response;
  return Promise.reject(errorResponse);
});

export default http;
