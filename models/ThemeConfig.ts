import { model, models, Schema, type InferSchemaType } from "mongoose";

const themeConfigSchema = new Schema(
  {
    primaryColor: { type: String, required: true },
    secondaryColor: { type: String, required: true },
    contactPhone: { type: String, required: true },
    corporateEmail: { type: String, required: true },
    headOfficeAddress: { type: String, required: true },
  },
  { timestamps: true },
);

export type ThemeConfigDocument = InferSchemaType<typeof themeConfigSchema>;

export const ThemeConfig =
  models.ThemeConfig || model("ThemeConfig", themeConfigSchema);
