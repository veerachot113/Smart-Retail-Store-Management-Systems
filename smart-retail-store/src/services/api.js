import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost/Smart-Retail-Store-Management-Systems/php-api", // URL ของ API
});

export default API;
