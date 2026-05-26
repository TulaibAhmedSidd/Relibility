import { z } from "zod";

import { connectToDatabase } from "@/lib/mongoose";
import { Lead } from "@/models/Lead";

const leadSchema = z.object({
  name: z.string().min(2),
  corporateEmail: z.string().email(),
  phone: z.string().min(7),
  companyName: z.string().min(2),
  industrySector: z.string().min(2),
  technicalDetails: z.string().min(10),
  submissionSourceUrl: z.string().min(1),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = leadSchema.parse(body);

    const connection = await connectToDatabase();

    if (!connection) {
      return Response.json(
        {
          success: false,
          message:
            "Lead capture is not configured yet. Add MONGODB_URI to enable submissions.",
        },
        { status: 503 },
      );
    }

    const lead = await Lead.create(parsed);

    return Response.json({
      success: true,
      id: lead._id,
      message: "Your request has been submitted to RQS.",
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return Response.json(
        { success: false, message: "Please complete all required fields correctly." },
        { status: 400 },
      );
    }

    return Response.json(
      { success: false, message: "Unable to save the lead at this time." },
      { status: 500 },
    );
  }
}
