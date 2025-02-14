import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: "https://www.darkomasnec.com", lastModified: new Date() },
    { url: "https://www.darkomasnec.com/about", lastModified: new Date() },
    {
      url: "https://www.darkomasnec.com/awards-festivals",
      lastModified: new Date(),
    },
    { url: "https://www.darkomasnec.com/contact", lastModified: new Date() },
    {
      url: "https://www.darkomasnec.com/exhibitions",
      lastModified: new Date(),
    },
    { url: "https://www.darkomasnec.com/inprogress", lastModified: new Date() },
    { url: "https://www.darkomasnec.com/projects", lastModified: new Date() },
  ];
}
