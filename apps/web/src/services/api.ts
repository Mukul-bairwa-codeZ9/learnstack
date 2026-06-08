import axios from "axios";
import { authStorage } from "@/lib/auth-storage";

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000/api",

  withCredentials: true,
});

apiClient.interceptors.request.use((config) => {
  const token = authStorage.getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,

  (error) => {
    if (error.response?.status === 401) {
      authStorage.clearToken();
    }

    return Promise.reject(error);
  },
);

export default apiClient;
