import { hash } from "bcryptjs";
import { NextRequest } from "next/server";
import { createUser, findUserByEmail } from "@/app/lib/db";
import { ok, fail } from "@/app/lib/response";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { name, email, password } = body as {
    name?: string;
    email?: string;
    password?: string;
  };

  if (!name || !email || !password) {
    return fail("Nombre, email y password son obligatorios.", 400);
  }

  if (password.length < 6) {
    return fail("Password minimo 6 caracteres.", 400);
  }

  if (await findUserByEmail(email)) {
    return fail("El email ya esta registrado.", 400);
  }

  const passwordHash = await hash(password, 10);
  const user = await createUser({
    name,
    email,
    passwordHash
  });

  return ok(
    { id: user.id, name: user.name, email: user.email, role: user.role },
    "Usuario creado."
  );
}
