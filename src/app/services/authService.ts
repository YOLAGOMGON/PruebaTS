import type { AuthTokens } from "@/app/types";

export const signup = async (data: {
  name: string;
  email: string;
  password: string;
}) => {
  const response = await fetch("/api/auth/signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });

  const json = await response.json();
  if (!response.ok) {
    throw new Error(json.error || "No se pudo registrar.");
  }
  return json.data;
};

export const login = async (data: {
  email: string;
  password: string;
}): Promise<AuthTokens> => {
  const response = await fetch("/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });

  const json = await response.json();
  if (!response.ok) {
    throw new Error(json.error || "Error al iniciar sesion.");
  }
  return json.data;
};

export const refreshAccessToken = async (refreshToken: string) => {
  const response = await fetch("/api/auth/refresh-token", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ refreshToken })
  });

  const json = await response.json();
  if (!response.ok) {
    throw new Error(json.error || "No se pudo refrescar el token.");
  }
  return json.data as { accessToken: string };
};

export const logout = async (refreshToken: string) => {
  const response = await fetch("/api/auth/logout", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ refreshToken })
  });

  const json = await response.json();
  if (!response.ok) {
    throw new Error(json.error || "No se pudo cerrar sesion.");
  }
  return json.data;
};
