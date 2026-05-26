import { z } from "zod";

import { getAdminSession } from "@/lib/auth";
import { connectToDatabase } from "@/lib/mongoose";
import { Lead } from "@/models/Lead";

const statusSchema = z.object({
  status: z.enum(["New", "Contacted", "Qualified", "Archived"]),
});

export async function PATCH(
  request: Request,
  context: RouteContext<"/api/leads/[id]">,
) {
  const session = await getAdminSession();

  if (!session) {
    return Response.json(
      { success: false, message: "Unauthorized." },
      {
        status: 401,
        headers: { "Cache-Control": "no-store, no-cache, must-revalidate" },
      },
    );
  }

  try {
    const connection = await connectToDatabase();

    if (!connection) {
      return Response.json(
        { success: false, message: "MongoDB is required for lead updates." },
        {
          status: 503,
          headers: { "Cache-Control": "no-store, no-cache, must-revalidate" },
        },
      );
    }

    const { id } = await context.params;
    const payload = statusSchema.parse(await request.json());
    const lead = await Lead.findByIdAndUpdate(
      id,
      { status: payload.status },
      { new: true },
    ).lean();

    return Response.json(
      { success: true, lead },
      {
        headers: { "Cache-Control": "no-store, no-cache, must-revalidate" },
      },
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return Response.json(
        { success: false, message: "Invalid lead status update." },
        {
          status: 400,
          headers: { "Cache-Control": "no-store, no-cache, must-revalidate" },
        },
      );
    }

    return Response.json(
      { success: false, message: "Unable to update lead status." },
      {
        status: 500,
        headers: { "Cache-Control": "no-store, no-cache, must-revalidate" },
      },
    );
  }
}
