import axios from 'axios';

const http = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

http.interceptors.response.use(undefined, (error) => {
  const errorResponse = error.response;
  return Promise.reject(errorResponse);
});

export default http;
