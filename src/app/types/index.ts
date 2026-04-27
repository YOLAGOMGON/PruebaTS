export type AuthTokens = {
  accessToken: string;
  refreshToken: string;
};

export type WidgetStatus = "active" | "inactive";

export type Widget = {
  id: string;
  type: string;
  title: string;
  status: WidgetStatus;
};
