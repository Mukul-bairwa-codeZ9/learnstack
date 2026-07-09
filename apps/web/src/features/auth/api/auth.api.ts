import api from "@/services/api";
import type { AuthResponse, AuthUser } from "../types/auth.types";


export const signupRequest = async (data: {
  name: string;
  email: string;
  password: string;
}): Promise<AuthResponse> => {
  return api.post<never, AuthResponse>("/auth/signup", data);
};

export const loginRequest = async (data: {
  email: string;
  password: string;
}): Promise<AuthResponse> => {
  return api.post<never, AuthResponse>("/auth/login", data);
};

export const getProfileRequest = async (): Promise<AuthUser> => {
  return api.get<never, AuthUser>("/auth/me");
};
