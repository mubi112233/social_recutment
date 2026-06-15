import type { Metadata } from "next";
import CaseStudyClient from "./CaseStudyClient";
import { Navbar } from "@/components/Navbar";
import { absoluteUrl, hreflangAlternates, publicLocalePathSegment } from "@/lib/site-url";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}): Promise<Metadata> {
  const { lang, slug } = await params;
  const urlSeg = publicLocalePathSegment(lang);
  const canonical = absoluteUrl(`/${urlSeg}/case-study/${slug}`);
  const { languages } = hreflangAlternates(`case-study/${slug}`);

  return {
    alternates: { canonical, languages },
    openGraph: { url: canonical, type: "article", siteName: "SocialRecruit" },
    robots: { index: true, follow: true },
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang: rawLang } = await params;
  const lang = rawLang === "de" || rawLang === "ge" ? "ge" : "en";

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <CaseStudyClient lang={lang} />
    </div>
  );
}
