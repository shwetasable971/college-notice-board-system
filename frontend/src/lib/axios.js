import axios from "axios";

const api = axios.create({
  baseURL: "https://college-notice-board-system-5ivo.onrender.com"
});

export default api;
