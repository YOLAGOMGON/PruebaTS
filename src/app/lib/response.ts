import { NextResponse } from "next/server";

export const ok = (data: unknown, message = "") =>
  NextResponse.json({ success: true, data, message });

export const fail = (error: string, statusCode = 400) =>
  NextResponse.json(
    { success: false, error, statusCode },
    { status: statusCode }
  );
