import { compare } from "bcryptjs";
import { NextRequest } from "next/server";
import { createAccessToken, createRefreshToken } from "@/app/lib/auth";
import {
  findUserByEmail,
  saveRefreshToken,
  type RefreshToken
} from "@/app/lib/db";
import { ok, fail } from "@/app/lib/response";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { email, password } = body as {
    email?: string;
    password?: string;
  };

  if (!email || !password) {
    return fail("Email y password son obligatorios.", 400);
  }

  const user = await findUserByEmail(email);
  if (!user) {
    return fail("Credenciales invalidas.", 401);
  }

  const isValid = await compare(password, user.passwordHash);
  if (!isValid) {
    return fail("Credenciales invalidas.", 401);
  }

  const payload = { sub: user.id, email: user.email };
  const accessToken = await createAccessToken(payload);
  const refreshToken = await createRefreshToken(payload);

  const refresh: RefreshToken = {
    token: refreshToken,
    userId: user.id,
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
  };
  await saveRefreshToken(refresh);

  return ok({ accessToken, refreshToken }, "Login correcto.");
}
