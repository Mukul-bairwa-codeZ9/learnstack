import api from '@/services/api';
import type {
  AuthResponse,
  AuthUser,
} from '../types/auth.types';

export const signupRequest = async (
  data: {
    name: string;
    email: string;
    password: string;
  },
) :Promise<AuthResponse> => {
  const response = await api.post(
    '/auth/signup',
    data,
  );

  return response.data;
};

export const loginRequest = async (
  data: {
    email: string;
    password: string;
  },
) :Promise<AuthResponse>=> {
  const response = await api.post(
    '/auth/login',
    data,
  );

  return response.data;
};

export const getProfileRequest =
  async () :Promise<AuthUser> => {
    const response = await api.get(
      '/auth/me',
    );

    return response.data;
  };