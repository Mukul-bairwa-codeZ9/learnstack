"use client";

import { useEffect } from "react";

import { useDispatch } from "react-redux";

import { authStorage } from "@/lib/auth-storage";

import {
  setCredentials,
  setUser,
  logout,
} from "../auth.slice";

import {
  getProfileRequest,
} from "../api/auth.api";

export function useAuthHydration() {
  const dispatch =
    useDispatch();

  useEffect(() => {
    const hydrate =
      async () => {
        const token =
          authStorage.getToken();

        if (!token) {
          return;
        }

        try {
          dispatch(
            setCredentials({
              accessToken:
                token,
            }),
          );

          const user =
            await getProfileRequest(
              token,
            );

          dispatch(
            setUser(user),
          );
        } catch {
          authStorage.clearToken();

          dispatch(logout());
        }
      };

    hydrate();
  }, [dispatch]);
}