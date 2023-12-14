import { findOrCreateSite } from "../utils/siteUtils";
import { siteData } from "../interfaces/site-interface";

export const handleSiteCreation = async (fileContents: siteData[]) => {
  for (const siteData of fileContents) {
    await findOrCreateSite(siteData.siteName, siteData.siteNo);
  }
};
