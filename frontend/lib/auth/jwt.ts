import * as jose from "jose";
import { JWT } from "@auth/core/jwt";

export const signJWT = async (payload: JWT, encryptionSecret: string | undefined = process.env.AUTH_SECRET) => {
  const secret = encryptionSecret ?? process.env.AUTH_SECRET;

  if (!secret) {
    throw new Error("No secret provided");
  }

  const encoder = new TextEncoder();

  return new jose.SignJWT({ ...payload })
    .setProtectedHeader({ alg: "HS512" })
    .setIssuedAt()
    .setIssuer("nextjs-auth-service")
    .setAudience("rails-api-service")
    .setExpirationTime("5m")
    .sign(encoder.encode(secret));
};

export const decrypt = async (token: string, encryptionSecret?: string) => {
  const secret = encryptionSecret ?? process.env.AUTH_SECRET;

  if (!secret) {
    throw new Error("No secret provided");
  }

  const encoder = new TextEncoder();

  return (
    await jose.jwtDecrypt(token, encoder.encode(secret), {
      clockTolerance: 15,
    })
  ).payload;
};
