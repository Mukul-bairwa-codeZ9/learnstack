import Cookies from "js-cookie";

const ACCESS_TOKEN_KEY =
  "accessToken";

export const authStorage = {
  getToken: () =>
    Cookies.get(
      ACCESS_TOKEN_KEY,
    ),

  setToken: (
    token: string,
  ) => {
    Cookies.set(
      ACCESS_TOKEN_KEY,
      token,
      {
        expires: 7,
        secure:
          process.env.NODE_ENV ===
          "production",
        sameSite: "strict",
      },
    );
  },

  clearToken: () => {
    Cookies.remove(
      ACCESS_TOKEN_KEY,
    );
  },
};