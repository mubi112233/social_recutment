import type { Metadata } from "next";
import { publicLocalePathSegment } from "@/lib/site-url";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const seg = publicLocalePathSegment(lang);
  return {
    other: {
      "content-language": seg === "de" ? "de" : "en",
    },
  };
}

/**
 * Locale segment layout. Per-page SEO (canonical, hreflang) lives in each route's
 * generateMetadata so nested URLs are not forced to the homepage.
 */
export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  await params;
  return <>{children}</>;
}
