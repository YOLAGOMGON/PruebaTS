import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Acceso | Proyecto Widgets",
  description: "Pantallas de login y registro."
};

export default function AuthLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="stack">
      <header className="card">
        <h2>Zona de acceso</h2>
        <p>Ingresa o crea tu cuenta para continuar.</p>
      </header>
      {children}
    </section>
  );
}
