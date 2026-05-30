import {
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';

type User = {
  _id: string;
  name: string;
  email: string;
};

type AuthState = {
  accessToken: string | null;
  user: User | null;
};

const initialState: AuthState = {
  accessToken: null,
  user: null,
};

const authSlice = createSlice({
  name: 'auth',

  initialState,

  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{
        accessToken: string;
      }>,
    ) => {
      state.accessToken =
        action.payload.accessToken;
    },

    setUser: (
      state,
      action: PayloadAction<User>,
    ) => {
      state.user = action.payload;
    },

    logout: state => {
      state.accessToken = null;
      state.user = null;
    },
  },
});

export const {
  setCredentials,
  setUser,
  logout,
} = authSlice.actions;

export default authSlice.reducer;