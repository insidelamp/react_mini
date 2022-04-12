import axios from "axios";

const api = axios.create({
  baseURL: "http://3.35.27.159:8080",
});

export default api;
