import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import type { AuthState, AuthUser } from "./types/auth.types";

const initialState: AuthState = {
  // accessToken: null,
  user: null,
  isHydrated: false,
};

const authSlice = createSlice({
  name: "auth",

  initialState,

  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{
        // accessToken: string;
        user: AuthUser;
      }>,
    ) => {
      // state.accessToken = action.payload.accessToken;

      state.user = action.payload.user;
    },

    setHydrated: (state) => {
      state.isHydrated = true;
    },
    // setUser: (state, action: PayloadAction<AuthUser>) => {
    //   state.user = action.payload;
    // },

    logout: (state) => {
      // state.accessToken = null;
      state.user = null;
    },
  },
});

export const { setCredentials,setHydrated, logout } = authSlice.actions;

export default authSlice.reducer;
