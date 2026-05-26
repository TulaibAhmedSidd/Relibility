import { z } from "zod";

import { siteConfig } from "@/content/site.config";
import { connectToDatabase } from "@/lib/mongoose";
import { PageContent } from "@/models/PageContent";

const pageContentSchema = z.object({
  pageKey: z.string().min(1),
  sectionKey: z.string().min(1),
  title: z.string().min(1),
  subtitle: z.string().optional().default(""),
  bodyText: z.string().optional().default(""),
  jsonArrayData: z.array(z.unknown()).optional().default([]),
  seoTitle: z.string().optional().default(""),
  seoDescription: z.string().optional().default(""),
  keywords: z.array(z.string()).optional().default([]),
});

export async function GET() {
  try {
    const connection = await connectToDatabase();

    if (!connection) {
      return Response.json(
        {
          source: "seed",
          entries: siteConfig.entries,
        },
        {
          headers: { "Cache-Control": "no-store, no-cache, must-revalidate" },
        },
      );
    }

    const entries = await PageContent.find().sort({ pageKey: 1, sectionKey: 1 }).lean();
    return Response.json({
      source: "database",
      entries,
    }, {
      headers: { "Cache-Control": "no-store, no-cache, must-revalidate" },
    });
  } catch {
    return Response.json(
      {
        source: "fallback",
        entries: siteConfig.entries,
      },
      {
        headers: { "Cache-Control": "no-store, no-cache, must-revalidate" },
      },
    );
  }
}

export async function PUT(request: Request) {
  try {
    const connection = await connectToDatabase();

    if (!connection) {
      return Response.json(
        { success: false, message: "Add MONGODB_URI to enable content persistence." },
        {
          status: 503,
          headers: { "Cache-Control": "no-store, no-cache, must-revalidate" },
        },
      );
    }

    const payload = pageContentSchema.parse(await request.json());

    const entry = await PageContent.findOneAndUpdate(
      { pageKey: payload.pageKey, sectionKey: payload.sectionKey },
      payload,
      { new: true, upsert: true },
    ).lean();

    return Response.json(
      { success: true, entry },
      {
        headers: { "Cache-Control": "no-store, no-cache, must-revalidate" },
      },
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return Response.json(
        { success: false, message: "Invalid content payload." },
        {
          status: 400,
          headers: { "Cache-Control": "no-store, no-cache, must-revalidate" },
        },
      );
    }

    return Response.json(
      { success: false, message: "Unable to save content." },
      {
        status: 500,
        headers: { "Cache-Control": "no-store, no-cache, must-revalidate" },
      },
    );
  }
}
