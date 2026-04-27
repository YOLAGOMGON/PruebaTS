import type { Widget, WidgetStatus } from "@/app/types";

export const listWidgets = async (query = "") => {
  const response = await fetch(`/api/widgets${query}`);
  const json = await response.json();
  if (!response.ok) {
    throw new Error(json.error || "No se pudo obtener widgets.");
  }
  return json.data as { items: Widget[] };
};

export const createWidget = async (data: {
  type: string;
  title: string;
  status: WidgetStatus;
  accessToken: string;
}) => {
  const response = await fetch("/api/widgets", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${data.accessToken}`
    },
    body: JSON.stringify({
      type: data.type,
      title: data.title,
      status: data.status
    })
  });

  const json = await response.json();
  if (!response.ok) {
    throw new Error(json.error || "No se pudo crear widget.");
  }
  return json.data as Widget;
};

export const updateWidget = async (data: {
  id: string;
  status: WidgetStatus;
  accessToken: string;
}) => {
  const response = await fetch(`/api/widgets/${data.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${data.accessToken}`
    },
    body: JSON.stringify({ status: data.status })
  });

  const json = await response.json();
  if (!response.ok) {
    throw new Error(json.error || "No se pudo actualizar widget.");
  }
  return json.data as Widget;
};

export const deleteWidget = async (data: {
  id: string;
  accessToken: string;
}) => {
  const response = await fetch(`/api/widgets/${data.id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${data.accessToken}`
    }
  });

  const json = await response.json();
  if (!response.ok) {
    throw new Error(json.error || "No se pudo eliminar widget.");
  }
  return json.data;
};
