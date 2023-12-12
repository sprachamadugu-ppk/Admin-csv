import mongoose from "mongoose";

const SiteSchema = new mongoose.Schema({
  siteName: String,
  siteNo: Number,
});

const Site = mongoose.model("Site", SiteSchema);

export default Site;
