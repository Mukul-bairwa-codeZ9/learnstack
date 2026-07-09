import axios from "axios";
import { authStorage } from "@/lib/auth-storage";
import { env } from "@/config";
import { ApiError, ApiResponse } from "@/types/api";


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
 (response) => {
    const apiResponse = response.data;

    // 1. Handle cases where server returns 200 OK but success is false
    if (apiResponse && apiResponse.success === false) {
      return Promise.reject(apiResponse.error);
    }

    // 2. Automatically unwrap data payload for every successful request
    return apiResponse.data;
  },
  (error) => {
    // 3. Handle 401 Unauthenticated clear-outs
    if (error.response?.status === 401) {
      authStorage.clearToken();
      // Optional: window.location.href = "/sign-in";
    }

    // 4. Extract standard error payload coming from non-2xx backend HTTP responses
    if (axios.isAxiosError(error) && error.response) {
      const serverResponse = error.response.data as ApiResponse<never>;
      if (serverResponse && serverResponse.success === false) {
        return Promise.reject(serverResponse.error);
      }
    }

    // 5. Fallback for server downtime or general network disconnects
    const fallbackError: ApiError = {
      code: "NETWORK_ERROR",
      message: error.message || "Something went wrong",
    };
    return Promise.reject(fallbackError);
  },
);

export default apiClient;
