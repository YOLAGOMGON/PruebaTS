"use client";

import { useState } from "react";
import Link from "next/link";
import { login, signup } from "@/app/services/authService";
import { useAuth } from "@/app/hooks/useAuth";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mensaje, setMensaje] = useState("");
  const { setTokens } = useAuth();

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMensaje("");

    try {
      setTokens(null);
      await signup({
        name,
        email,
        password
      });
      const tokens = await login({ email, password });
      setTokens(tokens);
      setMensaje("Registro correcto. Sesion iniciada.");
    } catch (error) {
      setMensaje(
        error instanceof Error ? error.message : "No se pudo registrar."
      );
    }
  };

  return (
    <main className="card stack">
      <h3>Registro</h3>
      <form className="stack" onSubmit={onSubmit}>
        <label className="stack">
          <span className="label">Nombre</span>
          <input
            className="input"
            value={name}
            onChange={(event) => setName(event.target.value)}
            required
          />
        </label>
        <label className="stack">
          <span className="label">Email</span>
          <input
            className="input"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
        </label>
        <label className="stack">
          <span className="label">Password</span>
          <input
            className="input"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
        </label>
        <button className="button" type="submit">
          Crear cuenta
        </button>
      </form>
      {mensaje ? <p>{mensaje}</p> : null}
      <Link className="button secondary" href="/auth/login">
        Ir a login
      </Link>
    </main>
  );
}
