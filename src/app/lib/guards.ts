import { NextRequest, NextResponse } from "next/server";
import { verifyAccessToken, type JwtPayload } from "./auth";
import { fail } from "./response";

type AuthResult = { payload: JwtPayload } | { error: NextResponse };

export const requireAuth = async (
  request: NextRequest
): Promise<AuthResult> => {
  const header = request.headers.get("authorization");
  if (!header?.startsWith("Bearer ")) {
    return { error: fail("Token requerido.", 401) };
  }

  const token = header.replace("Bearer ", "").trim();
  try {
    const payload = await verifyAccessToken(token);
    return { payload };
  } catch {
    return { error: fail("Token invalido o expirado.", 401) };
  }
};

// Sin roles: solo validamos autenticacion.
