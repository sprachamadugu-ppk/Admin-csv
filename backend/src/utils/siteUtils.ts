import { generateNumber } from "../helper-functions";
import { Site, ISiteDoc } from "../models/siteModel";

export const findOrCreateSite = async (siteName: string, siteNo?: number) => {
  const existingSites = await Site.find({});
  const siteMap: Record<string, ISiteDoc> = {};

  existingSites.forEach((site) => {
    if (site.siteName !== null && site.siteName !== undefined) {
      siteMap[site.siteName] = site;
    }
  });

  if (siteMap.hasOwnProperty(siteName)) {
    return siteMap[siteName];
  }

  const number = siteNo || generateNumber();
  const newSite = await Site.create({ siteName, siteNo: number });

  if (!newSite) {
    throw new Error("Failed to create a new site");
  }

  siteMap[siteName] = newSite;

  return newSite;
};
