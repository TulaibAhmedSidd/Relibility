import { model, models, Schema } from "mongoose";

const siteConfigSnapshotSchema = new Schema(
  {
    key: { type: String, required: true, unique: true, default: "primary" },
    data: { type: Schema.Types.Mixed, required: true },
  },
  { timestamps: true },
);

export const SiteConfigSnapshot =
  models.SiteConfigSnapshot ||
  model("SiteConfigSnapshot", siteConfigSnapshotSchema);
