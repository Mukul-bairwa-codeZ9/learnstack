import axios from "axios";
import { authStorage } from "@/lib/auth-storage";
import { env } from "@/config";

const apiClient = axios.create({
  baseURL: env.apiUrl ?? "http://localhost:4000/api/v1",

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
