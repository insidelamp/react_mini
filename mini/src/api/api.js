import axios from "axios";

const api = axios.create({
  baseURL: "http://3.39.24.150/",
});

export default api;
