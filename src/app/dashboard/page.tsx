"use client";

import { useEffect, useState } from "react";
import type { Widget } from "@/app/types";
import { useAuth } from "@/app/hooks/useAuth";
import {
  createWidget as createWidgetService,
  deleteWidget as deleteWidgetService,
  listWidgets,
  updateWidget as updateWidgetService
} from "@/app/services/widgetService";

export default function DashboardPage() {
  const [widgets, setWidgets] = useState<Widget[]>([]);
  const [type, setType] = useState("metric");
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState<Widget["status"]>("active");
  const [mensaje, setMensaje] = useState("");
  const { tokens } = useAuth();

  const getAccessToken = () =>
    tokens?.accessToken || localStorage.getItem("accessToken");

  const cargarWidgets = async () => {
    try {
      const data = await listWidgets("");
      setWidgets(data.items);
    } catch {
      setWidgets([]);
    }
  };

  useEffect(() => {
    cargarWidgets();
  }, []);

  const crearWidget = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMensaje("");

    const accessToken = getAccessToken();
    if (!accessToken) {
      setMensaje("Necesitas iniciar sesion.");
      return;
    }

    try {
      await createWidgetService({
        type,
        title,
        status,
        accessToken
      });
    } catch (error) {
      setMensaje(
        error instanceof Error ? error.message : "No se pudo crear el widget."
      );
      return;
    }

    setTitle("");
    setStatus("active");
    await cargarWidgets();
  };

  const eliminarWidget = async (id: string) => {
    const accessToken = getAccessToken();
    if (!accessToken) {
      setMensaje("Necesitas iniciar sesion.");
      return;
    }
    try {
      await deleteWidgetService({ id, accessToken });
      await cargarWidgets();
    } catch {
      await cargarWidgets();
      setMensaje("No se pudo eliminar. Lista recargada.");
    }
  };

  const toggleStatus = async (widget: Widget) => {
    const accessToken = getAccessToken();
    if (!accessToken) {
      setMensaje("Necesitas iniciar sesion.");
      return;
    }
    try {
      await updateWidgetService({
        id: widget.id,
        status: widget.status === "active" ? "inactive" : "active",
        accessToken
      });
      await cargarWidgets();
    } catch {
      await cargarWidgets();
      setMensaje("No se pudo actualizar. Lista recargada.");
    }
  };

  return (
    <main className="stack">
      <section className="card stack">
        <h3>Crear widget</h3>
        <form className="stack" onSubmit={crearWidget}>
          <label className="stack">
            <span className="label">Tipo</span>
            <input
              className="input"
              value={type}
              onChange={(event) => setType(event.target.value)}
              required
            />
          </label>
          <label className="stack">
            <span className="label">Titulo</span>
            <input
              className="input"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              required
            />
          </label>
          <label className="stack">
            <span className="label">Estado</span>
            <select
              className="input"
              value={status}
              onChange={(event) =>
                setStatus(event.target.value as Widget["status"])
              }
            >
              <option value="active">active</option>
              <option value="inactive">inactive</option>
            </select>
          </label>
          <button className="button" type="submit">
            Guardar
          </button>
        </form>
        {mensaje ? <p>{mensaje}</p> : null}
      </section>

      <section className="card stack">
        <h3>Widgets guardados</h3>
        <div className="stack">
          {widgets.length === 0 ? (
            <p>No hay widgets creados.</p>
          ) : (
            widgets.map((widget) => (
              <div key={widget.id} className="row">
                <div className="stack" style={{ flex: 1 }}>
                  <strong>{widget.title}</strong>
                  <span className="badge">{widget.type}</span>
                </div>
                <span className="badge">{widget.status}</span>
                <button
                  className="button secondary"
                  onClick={() => toggleStatus(widget)}
                >
                  Cambiar estado
                </button>
                <button
                  className="button secondary"
                  onClick={() => eliminarWidget(widget.id)}
                >
                  Eliminar
                </button>
              </div>
            ))
          )}
        </div>
      </section>
    </main>
  );
}
