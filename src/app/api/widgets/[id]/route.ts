import { NextRequest } from "next/server";
import { updateWidget, deleteWidget, findWidgetById } from "@/app/lib/db";
import { ok, fail } from "@/app/lib/response";
import { requireAuth } from "@/app/lib/guards";

type Params = { params: { id: string } };

export async function GET(_request: NextRequest, { params }: Params) {
  const widget = await findWidgetById(params.id);
  if (!widget) {
    return fail("Widget no encontrado.", 404);
  }

  return ok(widget);
}

export async function PUT(request: NextRequest, { params }: Params) {
  const auth = await requireAuth(request);
  if ("error" in auth) return auth.error;

  const body = await request.json();
  const { type, title, status } = body as {
    type?: string;
    title?: string;
    status?: "active" | "inactive";
  };

  try {
    const widget = await updateWidget(params.id, {
      type,
      title,
      status
    });
    return ok(widget, "Widget actualizado.");
  } catch {
    return fail("Widget no encontrado.", 404);
  }
}

export async function DELETE(request: NextRequest, { params }: Params) {
  const auth = await requireAuth(request);
  if ("error" in auth) return auth.error;

  try {
    await deleteWidget(params.id);
    return ok({ deleted: true }, "Widget eliminado.");
  } catch {
    return fail("Widget no encontrado.", 404);
  }
}

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
