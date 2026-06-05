"use client";

import { useEffect } from "react";

import { useDispatch } from "react-redux";

import { authStorage } from "@/lib/auth-storage";

import { setCredentials, setHydrated, logout } from "../auth.slice";

import { getProfileRequest } from "../api/auth.api";

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
        const user = await getProfileRequest(token);

        dispatch(
          setCredentials({
            accessToken: token,
            user,
          }),
        );
      } catch {
        authStorage.clearToken();

        dispatch(logout());
      } finally {
        dispatch(setHydrated());
      }
    };

    hydrate();
  }, [dispatch]);
}
