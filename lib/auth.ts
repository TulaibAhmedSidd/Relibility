import { cookies } from "next/headers";
import {
  createAdminSessionToken,
  verifyAdminSessionToken,
} from "@/lib/auth-token";

const ADMIN_COOKIE_NAME = "rqs_admin_session";

export async function getAdminSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_COOKIE_NAME)?.value;

  if (!token) {
    return null;
  }

  try {
    return await verifyAdminSessionToken(token);
  } catch {
    return null;
  }
}

export function getAdminCookieName() {
  return ADMIN_COOKIE_NAME;
}

export { createAdminSessionToken, verifyAdminSessionToken };
