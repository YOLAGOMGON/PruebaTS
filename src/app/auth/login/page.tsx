"use client";

import { useState } from "react";
import { login } from "@/app/services/authService";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mensaje, setMensaje] = useState("");
  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMensaje("");

    try {
      await login({ email, password });
      setMensaje("Login correcto.");
    } catch (error) {
      setMensaje(error instanceof Error ? error.message : "Error en login.");
    }
  };

  return (
    <main className="card stack">
      <h3>Login</h3>
      <form className="stack" onSubmit={onSubmit}>
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
          Entrar
        </button>
      </form>
      {mensaje ? <p>{mensaje}</p> : null}
    </main>
  );
}
