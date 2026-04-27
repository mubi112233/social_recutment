import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "SocialRecruit - Professional Social Recruitment",
    short_name: "SocialRecruit",
    description: "SocialRecruit – Your social media recruitment agency. Source qualified candidates through LinkedIn, Instagram & TikTok. 80% faster hiring.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#3b82f6",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
      {
        src: "/icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
    orientation: "portrait",
    scope: "/",
    lang: "en",
    categories: ["recruitment", "business", "hr", "staffing", "social-media"],
  };
}


