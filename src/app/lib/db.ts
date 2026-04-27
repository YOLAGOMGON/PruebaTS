import { PrismaClient, type WidgetStatus } from "@prisma/client";

export type { WidgetStatus };

const prisma = new PrismaClient();

export type User = {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  createdAt: Date;
};

export type RefreshToken = {
  token: string;
  userId: string;
  expiresAt: Date;
};

export type Widget = {
  id: string;
  type: string;
  title: string;
  status: WidgetStatus;
  createdAt: Date;
  updatedAt: Date;
};

export const listUsers = async () => prisma.user.findMany();
export const listRefreshTokens = async () => prisma.refreshToken.findMany();

export const listWidgets = async () => prisma.widget.findMany();

export const createUser = async (data: Omit<User, "id" | "createdAt">) =>
  prisma.user.create({ data });

export const findUserByEmail = async (email: string) =>
  prisma.user.findUnique({ where: { email } });

export const findUserById = async (id: string) =>
  prisma.user.findUnique({ where: { id } });

export const saveRefreshToken = async (token: RefreshToken) =>
  prisma.refreshToken.create({ data: token });

export const deleteRefreshToken = async (token: string) =>
  prisma.refreshToken.deleteMany({ where: { token } });

export const findRefreshToken = async (token: string) =>
  prisma.refreshToken.findFirst({ where: { token } });

export const createWidget = async (
  data: Omit<Widget, "id" | "createdAt" | "updatedAt">
) => prisma.widget.create({ data });

export const updateWidget = async (id: string, data: Partial<Widget>) =>
  prisma.widget.update({ where: { id }, data });

export const deleteWidget = async (id: string) =>
  prisma.widget.delete({ where: { id } });

export const findWidgetById = async (id: string) =>
  prisma.widget.findUnique({ where: { id } });
