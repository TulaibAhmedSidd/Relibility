import { SignJWT, jwtVerify } from "jose";

function getJwtSecret() {
  const secret = process.env.ADMIN_JWT_SECRET ?? "rqs-local-dev-secret-change-me";
  return new TextEncoder().encode(secret);
}

export async function createAdminSessionToken(payload: {
  email: string;
  role: string;
}) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("12h")
    .sign(getJwtSecret());
}

export async function verifyAdminSessionToken(token: string) {
  const { payload } = await jwtVerify(token, getJwtSecret());
  return payload as { email: string; role: string };
}
