import type { Metadata } from "next";
import { CaseStudies } from "./CaseStudiesListingClient";
import { Navbar } from "@/components/Navbar";
import { absoluteUrl, hreflangAlternates, publicLocalePathSegment } from "@/lib/site-url";
import { generateBreadcrumbSchema } from "@/lib/structured-data";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang: raw } = await params;
  const seg = publicLocalePathSegment(raw);
  const { languages } = hreflangAlternates("case-studies");
  const canonical = absoluteUrl(`/${seg}/case-studies`);

  const isDe = seg === "de";
  const title = isDe
    ? "Fallstudien — Social-Media-Recruiting Erfolge | SocialRecruit"
    : "Case Studies — Social Recruitment Success Stories | SocialRecruit";
  const description = isDe
    ? "Entdecken Sie, wie wir Unternehmen halfen, Top-Talente über Social Media schneller und effizienter zu finden."
    : "Discover how we helped businesses find top talent through social media faster and more efficiently.";

  return {
    title,
    description,
    keywords: isDe
      ? [
          "Fallstudien",
          "Social-Media-Recruiting Erfolge",
          "LinkedIn Recruiting Ergebnisse",
          "Kandidaten-Sourcing",
          "SocialRecruit",
        ]
      : [
          "case studies",
          "Social Recruitment success",
          "LinkedIn recruiting results",
          "candidate sourcing ROI",
          "SocialRecruit",
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
      images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "SocialRecruit Case Studies" }],
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

export default async function CaseStudiesPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: raw } = await params;
  const lang = raw === 'de' || raw === 'ge' ? 'ge' : 'en';
  const breadcrumbSchema = generateBreadcrumbSchema([
    { label: lang === 'ge' ? 'Startseite' : 'Home', href: `/${lang}` },
    { label: lang === 'ge' ? 'Fallstudien' : 'Case Studies', href: `/${lang}/case-studies` },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <div className="min-h-screen bg-background">
        <Navbar />
        <CaseStudies lang={lang} />
      </div>
    </>
  );
}
