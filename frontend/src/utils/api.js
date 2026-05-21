import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5001/api/v1",
  withCredentials: true,
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;
