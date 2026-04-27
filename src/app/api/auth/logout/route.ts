import { NextRequest } from "next/server";
import { deleteRefreshToken } from "@/app/lib/db";
import { ok, fail } from "@/app/lib/response";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { refreshToken } = body as { refreshToken?: string };

  if (!refreshToken) {
    return fail("Refresh token requerido.", 400);
  }

  await deleteRefreshToken(refreshToken);
  return ok({ logout: true }, "Sesion cerrada.");
}
