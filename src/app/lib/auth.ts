import { SignJWT, jwtVerify } from "jose";
const accessSecret = new TextEncoder().encode(
  process.env.JWT_ACCESS_SECRET || "access-secret-demo"
);
const refreshSecret = new TextEncoder().encode(
  process.env.JWT_REFRESH_SECRET || "refresh-secret-demo"
);

export type JwtPayload = {
  sub: string;
  email: string;
};

export const createAccessToken = async (payload: JwtPayload) => {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("15m")
    .sign(accessSecret);
};

export const createRefreshToken = async (payload: JwtPayload) => {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(refreshSecret);
};

export const verifyAccessToken = async (token: string) => {
  const { payload } = await jwtVerify(token, accessSecret);
  return payload as JwtPayload;
};

export const verifyRefreshToken = async (token: string) => {
  const { payload } = await jwtVerify(token, refreshSecret);
  return payload as JwtPayload;
};
