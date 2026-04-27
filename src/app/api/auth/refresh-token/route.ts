import { NextRequest } from "next/server";
import { createAccessToken, verifyRefreshToken } from "@/app/lib/auth";
import { findRefreshToken } from "@/app/lib/db";
import { ok, fail } from "@/app/lib/response";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { refreshToken } = body as { refreshToken?: string };

  if (!refreshToken) {
    return fail("Refresh token requerido.", 400);
  }

  const stored = await findRefreshToken(refreshToken);
  if (!stored) {
    return fail("Refresh token invalido.", 401);
  }

  if (stored.expiresAt.getTime() < Date.now()) {
    return fail("Refresh token expirado.", 401);
  }

  try {
    const payload = await verifyRefreshToken(refreshToken);
    const accessToken = await createAccessToken({
      sub: payload.sub,
      email: payload.email
    });

    return ok({ accessToken }, "Token renovado.");
  } catch {
    return fail("Refresh token invalido.", 401);
  }
}
