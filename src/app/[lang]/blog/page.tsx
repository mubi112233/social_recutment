import type { Metadata } from "next";
import { BlogListingClient } from "./BlogListingClient";
import { absoluteUrl, hreflangAlternates, publicLocalePathSegment } from "@/lib/site-url";
import { generateBreadcrumbSchema } from "@/lib/structured-data";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang: raw } = await params;
  const seg = publicLocalePathSegment(raw);
  const { languages } = hreflangAlternates("blog");
  const canonical = absoluteUrl(`/${seg}/blog`);

  const isDe = seg === "de";
  const title = isDe
    ? "Social-Media-Recruiting Blog — Tipps & Best Practices | SocialRecruit"
    : "Social Media Recruitment Blog — Tips & Best Practices | SocialRecruit";
  const description = isDe
    ? "Einblicke, Tipps und Best Practices zu Social-Media-Recruiting, Kandidaten-Sourcing und Employer Branding — auf Deutsch."
    : "Insights, tips, and best practices for Social Media Recruitment, candidate sourcing via LinkedIn, Instagram & TikTok.";

  return {
    title,
    description,
    keywords: isDe
      ? [
          "Social-Media-Recruiting Blog",
          "LinkedIn Recruiting Tipps",
          "Kandidaten-Sourcing",
          "Employer Branding",
          "SocialRecruit",
          "Recruiting-Agentur Blog",
        ]
      : [
          "Social Media Recruitment blog",
          "LinkedIn recruiting tips",
          "candidate sourcing insights",
          "recruitment efficiency",
          "SocialRecruit",
          "recruitment agency blog",
        ],
    alternates: {
      canonical,
      languages,
    },
    openGraph: {
      title,
      description,
      url: canonical,
      type: "website",
      locale: isDe ? "de_DE" : "en_US",
      alternateLocale: isDe ? "en_US" : "de_DE",
      siteName: "SocialRecruit",
      images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "SocialRecruit Social Recruitment Blog" }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [absoluteUrl("/og-image.jpg")],
    },
    robots: { index: true, follow: true },
  };
}

export default async function BlogPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: raw } = await params;
  const lang = raw === 'de' || raw === 'ge' ? 'ge' : 'en';
  const breadcrumbSchema = generateBreadcrumbSchema([
    { label: lang === 'ge' ? 'Startseite' : 'Home', href: `/${lang}` },
    { label: "Blog", href: `/${lang}/blog` },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <BlogListingClient />
    </>
  );
}
