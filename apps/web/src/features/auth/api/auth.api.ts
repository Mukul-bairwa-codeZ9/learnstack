import api from '@/services/api';

export const signupRequest = async (
  data: {
    name: string;
    email: string;
    password: string;
  },
) => {
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
) => {
  const response = await api.post(
    '/auth/login',
    data,
  );

  return response.data;
};

export const getProfileRequest =
  async (token: string) => {
    const response = await api.get(
      '/auth/me',
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    return response.data;
  };