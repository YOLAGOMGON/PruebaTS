"use client";

import { createContext, useContext, useMemo, useState } from "react";
import type { AuthTokens } from "@/app/types";

type AuthContextValue = {
  tokens: AuthTokens | null;
  setTokens: (tokens: AuthTokens | null) => void;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [tokens, setTokensState] = useState<AuthTokens | null>(null);

  const setTokens = (value: AuthTokens | null) => {
    setTokensState(value);
    if (value) {
      localStorage.setItem("accessToken", value.accessToken);
      localStorage.setItem("refreshToken", value.refreshToken);
      document.cookie = `accessToken=${value.accessToken}; path=/`;
    } else {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      document.cookie = "accessToken=; path=/; max-age=0";
    }
  };

  const value = useMemo(() => ({ tokens, setTokens }), [tokens]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext debe usarse dentro de AuthProvider.");
  }
  return context;
};
