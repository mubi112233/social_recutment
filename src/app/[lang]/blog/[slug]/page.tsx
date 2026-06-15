import type { Metadata } from "next";
import BlogPostClient from "./BlogPostClient";
import { Navbar } from "@/components/Navbar";
import { absoluteUrl, hreflangAlternates, publicLocalePathSegment } from "@/lib/site-url";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}): Promise<Metadata> {
  const { lang, slug } = await params;
  const seg = publicLocalePathSegment(lang);
  const canonical = absoluteUrl(`/${seg}/blog/${slug}`);
  const { languages } = hreflangAlternates(`blog/${slug}`);

  return {
    alternates: { canonical, languages },
    openGraph: { url: canonical, type: "article", siteName: "SocialRecruit" },
    robots: { index: true, follow: true },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang: rawLang } = await params;
  const lang = rawLang === "de" || rawLang === "ge" ? "ge" : "en";

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <BlogPostClient lang={lang} />
    </div>
  );
}
