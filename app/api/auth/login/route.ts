import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import { z } from "zod";

import { createAdminSessionToken, getAdminCookieName } from "@/lib/auth";
import { connectToDatabase } from "@/lib/mongoose";
import { AdminUser } from "@/models/AdminUser";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export async function POST(request: Request) {
  try {
    const payload = loginSchema.parse(await request.json());
    const connection = await connectToDatabase();

    if (!connection) {
      return Response.json(
        { success: false, message: "MongoDB is required for admin login." },
        {
          status: 503,
          headers: { "Cache-Control": "no-store, no-cache, must-revalidate" },
        },
      );
    }

    const user = await AdminUser.findOne({
      email: payload.email.toLowerCase(),
      isActive: true,
    }).lean();

    if (!user) {
      return Response.json(
        { success: false, message: "Invalid credentials." },
        {
          status: 401,
          headers: { "Cache-Control": "no-store, no-cache, must-revalidate" },
        },
      );
    }

    const isValid = await bcrypt.compare(payload.password, user.passwordHash);

    if (!isValid) {
      return Response.json(
        { success: false, message: "Invalid credentials." },
        {
          status: 401,
          headers: { "Cache-Control": "no-store, no-cache, must-revalidate" },
        },
      );
    }

    const token = await createAdminSessionToken({
      email: user.email,
      role: user.role,
    });

    const cookieStore = await cookies();
    cookieStore.set(getAdminCookieName(), token, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 12,
    });

    return Response.json(
      { success: true },
      {
        headers: { "Cache-Control": "no-store, no-cache, must-revalidate" },
      },
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return Response.json(
        { success: false, message: "Invalid login request." },
        {
          status: 400,
          headers: { "Cache-Control": "no-store, no-cache, must-revalidate" },
        },
      );
    }

    return Response.json(
      { success: false, message: "Unable to sign in." },
      {
        status: 500,
        headers: { "Cache-Control": "no-store, no-cache, must-revalidate" },
      },
    );
  }
}
