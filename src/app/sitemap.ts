import { MetadataRoute } from "next";
import { ROUTES } from "@/lib/routes";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://phause.com";
  return [
    { url: `${baseUrl}${ROUTES.home}`, lastModified: new Date() },
    { url: `${baseUrl}${ROUTES.about}`, lastModified: new Date() },
  ];
}

