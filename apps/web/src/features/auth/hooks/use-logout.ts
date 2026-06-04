"use client";

import { useRouter } from "next/navigation";

import { useDispatch } from "react-redux";

import { logout } from "../auth.slice";

import { authStorage } from "@/lib/auth-storage";

export function useLogout() {
  const router =
    useRouter();

  const dispatch =
    useDispatch();

  return () => {
    authStorage.clearToken();

    dispatch(logout());

    router.push(
      "/sign-in",
    );
  };
}