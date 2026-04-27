import Link from "next/link";

export default function HomePage() {
  return (
    <main className="stack">
      <div className="card stack">
        <h1>Bienvenido a FlowwLogiz</h1>
        <div className="row">
          <Link className="button" href="/auth/login">
            Ir a login
          </Link>
          <Link className="button secondary" href="/auth/register">
            Registrarme
          </Link>
        </div>
      </div>
    </main>
  );
}
