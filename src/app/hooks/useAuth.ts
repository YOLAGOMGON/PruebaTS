"use client";

import { useEffect } from "react";
import { useAuthContext } from "@/app/context/AuthContext";
import type { AuthTokens } from "@/app/types";

export const useAuth = () => {
  const { tokens, setTokens } = useAuthContext();

  useEffect(() => {
    if (!tokens) {
      const accessToken = localStorage.getItem("accessToken");
      const refreshToken = localStorage.getItem("refreshToken");
      if (accessToken && refreshToken) {
        const stored: AuthTokens = { accessToken, refreshToken };
        setTokens(stored);
      }
    }
  }, [setTokens, tokens]);

  return { tokens, setTokens };
};
