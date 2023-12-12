import { siteData } from "../interfaces/site-interface";
import Site from "../models/siteModel";

export const handleSiteCreation = async (fileContents: siteData[]) => {
  for (const siteData of fileContents) {
    await Site.create({ siteName: siteData.siteName, siteNo: siteData.siteNo });
  }
};
