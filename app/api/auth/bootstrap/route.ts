import bcrypt from "bcryptjs";
import { z } from "zod";

import { connectToDatabase } from "@/lib/mongoose";
import { AdminUser } from "@/models/AdminUser";

const bootstrapSchema = z.object({
  email: z.string().email(),
  password: z.string().min(10),
  setupKey: z.string().min(4),
});

export async function POST(request: Request) {
  try {
    const payload = bootstrapSchema.parse(await request.json());
    const requiredKey = process.env.ADMIN_SETUP_KEY ?? "rqs-bootstrap";

    if (payload.setupKey !== requiredKey) {
      return Response.json(
        { success: false, message: "Invalid setup key." },
        {
          status: 401,
          headers: { "Cache-Control": "no-store, no-cache, must-revalidate" },
        },
      );
    }

    const connection = await connectToDatabase();

    if (!connection) {
      return Response.json(
        { success: false, message: "MongoDB is required to create an admin." },
        {
          status: 503,
          headers: { "Cache-Control": "no-store, no-cache, must-revalidate" },
        },
      );
    }

    const adminCount = await AdminUser.countDocuments();

    if (adminCount > 0) {
      return Response.json(
        { success: false, message: "An admin user already exists." },
        {
          status: 409,
          headers: { "Cache-Control": "no-store, no-cache, must-revalidate" },
        },
      );
    }

    const passwordHash = await bcrypt.hash(payload.password, 12);
    await AdminUser.create({
      email: payload.email.toLowerCase(),
      passwordHash,
      role: "admin",
      isActive: true,
    });

    return Response.json(
      { success: true, message: "Admin user created successfully." },
      {
        headers: { "Cache-Control": "no-store, no-cache, must-revalidate" },
      },
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      const firstIssue = error.issues[0]?.message ?? "Invalid bootstrap request.";
      return Response.json(
        { success: false, message: firstIssue },
        {
          status: 400,
          headers: { "Cache-Control": "no-store, no-cache, must-revalidate" },
        },
      );
    }

    return Response.json(
      { success: false, message: "Unable to create admin user." },
      {
        status: 500,
        headers: { "Cache-Control": "no-store, no-cache, must-revalidate" },
      },
    );
  }
}
