import { model, models, Schema, type InferSchemaType } from "mongoose";

const leadSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    corporateEmail: { type: String, required: true, trim: true, lowercase: true },
    phone: { type: String, required: true, trim: true },
    companyName: { type: String, required: true, trim: true },
    industrySector: { type: String, required: true, trim: true },
    technicalDetails: { type: String, required: true, trim: true },
    submissionSourceUrl: { type: String, required: true, trim: true },
    status: {
      type: String,
      enum: ["New", "Contacted", "Qualified", "Archived"],
      default: "New",
    },
  },
  {
    timestamps: { createdAt: true, updatedAt: true },
  },
);

export type LeadDocument = InferSchemaType<typeof leadSchema>;

export const Lead = models.Lead || model("Lead", leadSchema);
