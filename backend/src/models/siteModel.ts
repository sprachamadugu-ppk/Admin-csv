import mongoose, { Document, Model } from "mongoose";

interface ISiteDoc extends Document {
  siteName: string;
  siteNo: number;
}

interface ISiteModel extends Model<ISiteDoc> {}

const siteSchema = new mongoose.Schema({
  siteName: String,
  siteNo: Number,
});

const Site: ISiteModel = mongoose.model<ISiteDoc, ISiteModel>(
  "Site",
  siteSchema,
);

export { Site, ISiteDoc, ISiteModel };
