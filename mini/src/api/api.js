import axios from "axios";

const api = axios.create({
  baseURL: "http://3.35.27.159:8080",


// api.interceptors.request.use(function (config) {
//   const accessToken = document.cookie.split("=")[1];
//   // const refreshToken = document.cookie.split("=")[2];
//   config.headers.common["Authorization"] = `${accessToken}`;
//   // config.headers.common["refreshToken"] = `Bearer ${refreshToken}`;
//   console.log(config);
//   return config;
// });
export default api;
