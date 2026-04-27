import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Dashboard | Proyecto Widgets",
  description: "Panel basico para administrar widgets."
};

export default function DashboardLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="stack">
      <header className="card row" style={{ justifyContent: "space-between" }}>
        <div>
          <h2>Dashboard</h2>
          <p>Panel simple para el CRUD de widgets.</p>
        </div>
        <Link className="button secondary" href="/">
          Volver al inicio
        </Link>
      </header>
      {children}
    </section>
  );
}
