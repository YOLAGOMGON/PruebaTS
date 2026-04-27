import { NextRequest } from "next/server";
import { createWidget, listWidgets, type WidgetStatus } from "@/app/lib/db";
import { ok, fail } from "@/app/lib/response";
import { requireAuth } from "@/app/lib/guards";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q")?.toLowerCase() || "";
  const limit = Number(searchParams.get("limit") || 10);
  const page = Number(searchParams.get("page") || 1);

  const allWidgets = await listWidgets();
  const filtered = allWidgets.filter((widget) =>
    widget.title.toLowerCase().includes(q)
  );

  const start = (page - 1) * limit;
  const items = filtered.slice(start, start + limit);

  return ok({ items, total: filtered.length, page, limit });
}

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  const auth = await requireAuth(request);
  if ("error" in auth) return auth.error;

  const body = await request.json();
  const { type, title, status } = body as {
    type?: string;
    title?: string;
    status?: WidgetStatus;
  };

  if (!type || !title) {
    return fail("Tipo y titulo son obligatorios.", 400);
  }

  if (title.length < 3) {
    return fail("Titulo minimo 3 caracteres.", 400);
  }

  const widget = await createWidget({
    type,
    title,
    status: status === "inactive" ? "inactive" : "active"
  });

  return ok(widget, "Widget creado.");
}
