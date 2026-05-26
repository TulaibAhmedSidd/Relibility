import { z } from "zod";

import { siteConfig } from "@/content/site.config";
import { connectToDatabase } from "@/lib/mongoose";
import { ThemeConfig } from "@/models/ThemeConfig";

const themeSchema = z.object({
  primaryColor: z.string().min(4),
  secondaryColor: z.string().min(4),
  contactPhone: z.string().min(7),
  corporateEmail: z.string().email(),
  headOfficeAddress: z.string().min(5),
});

export async function GET() {
  const connection = await connectToDatabase();

  if (!connection) {
    return Response.json({
      source: "seed",
      theme: {
        primaryColor: siteConfig.theme.colors.primary,
        secondaryColor: siteConfig.theme.colors.secondary,
        contactPhone: siteConfig.company.phones[0],
        corporateEmail: siteConfig.company.email,
        headOfficeAddress: siteConfig.company.address,
      },
    });
  }

  const theme = await ThemeConfig.findOne().sort({ updatedAt: -1 }).lean();
  return Response.json({ source: "database", theme });
}

export async function PUT(request: Request) {
  try {
    const connection = await connectToDatabase();

    if (!connection) {
      return Response.json(
        { success: false, message: "Add MONGODB_URI to enable theme persistence." },
        { status: 503 },
      );
    }

    const payload = themeSchema.parse(await request.json());
    const theme = await ThemeConfig.findOneAndUpdate({}, payload, {
      new: true,
      upsert: true,
    }).lean();

    return Response.json({ success: true, theme });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return Response.json(
        { success: false, message: "Invalid theme payload." },
        { status: 400 },
      );
    }

    return Response.json(
      { success: false, message: "Unable to save theme." },
      { status: 500 },
    );
  }
}
