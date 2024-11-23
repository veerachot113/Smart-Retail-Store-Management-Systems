import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost/Smart-Retail-Store-Management-Systems/php-api",
});

// Interceptor เพื่อเพิ่ม Authorization header
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default API;
