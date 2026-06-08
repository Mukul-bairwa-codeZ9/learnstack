"use client";

import { useEffect } from "react";

import { useDispatch } from "react-redux";

import { authStorage } from "@/lib/auth-storage";

import { setCredentials, setHydrated, logout } from "../auth.slice";

import { getProfileRequest } from "../api/auth.api";
import axios from "axios";

export function useAuthHydration() {
  const dispatch = useDispatch();

  useEffect(() => {
    const hydrate = async () => {
      const token = authStorage.getToken();

      if (!token) {
        dispatch(setHydrated());
        return;
      }

      try {
        const user = await getProfileRequest();

        dispatch(
          setCredentials({
            // accessToken: token,
            user,
          }),
        );
      } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status === 401) {
          authStorage.clearToken();
          dispatch(logout());
          console.error("Auth hydration failed", error);
        }
      } finally {
        dispatch(setHydrated());
      }
    };

    hydrate();
  }, [dispatch]);
}
