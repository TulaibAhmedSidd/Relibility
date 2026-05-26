import { model, models, Schema, type InferSchemaType } from "mongoose";

const pageContentSchema = new Schema(
  {
    pageKey: { type: String, required: true, trim: true },
    sectionKey: { type: String, required: true, trim: true },
    title: { type: String, required: true, trim: true },
    subtitle: { type: String, trim: true, default: "" },
    bodyText: { type: String, trim: true, default: "" },
    jsonArrayData: { type: [Schema.Types.Mixed], default: [] },
    seoTitle: { type: String, trim: true, default: "" },
    seoDescription: { type: String, trim: true, default: "" },
    keywords: { type: [String], default: [] },
  },
  { timestamps: true },
);

export type PageContentDocument = InferSchemaType<typeof pageContentSchema>;

export const PageContent =
  models.PageContent || model("PageContent", pageContentSchema);
