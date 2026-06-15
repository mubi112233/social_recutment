import { Hero } from "@/components/Hero";
import { Navbar } from "@/components/Navbar";
import { HomeBelowFold } from "@/components/HomeBelowFold.hybrid";
import { FinalCTA } from "@/components/FinalCTA.server";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import type { Metadata } from "next";
import { fetchApiData, API_ENDPOINTS, normalizeLanguage } from "@/lib/api";
import { generateFAQSchema, generateBreadcrumbSchema } from "@/lib/structured-data";
import { SITE_URL, absoluteUrl, hreflangAlternates, publicLocalePathSegment } from "@/lib/site-url";

// Never statically regenerate — always render on demand so a down API
// never causes a build/ISR crash.
export const dynamic = "force-dynamic";

const SUPPORTED_LANGS = ['en', 'ge', 'de'];

async function getHeroMeta(lang: string) {
  try {
    const data = await fetchApiData<{ hero: any | any[] }>(API_ENDPOINTS.HERO, normalizeLanguage(lang));
    if (!data?.hero) return null;
    if (Array.isArray(data.hero)) {
      const withMeta = data.hero.find((h: any) => h.metaTitle || h.metaDescription);
      if (withMeta) return withMeta;
      return data.hero.sort((a: any, b: any) => (b._id || '').localeCompare(a._id || ''))[0] || null;
    }
    return data.hero;
  } catch {
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang: rawLang } = await params;
  const lang = rawLang === 'de' || rawLang === 'ge' ? 'ge' : 'en';
  const hero = await getHeroMeta(lang);

  const title =
    hero?.metaTitle ||
    (lang === "ge"
      ? "SocialRecruit – Social-Media-Recruiting Agentur | Top-Talente über LinkedIn, Instagram & TikTok finden"
      : "SocialRecruit – Social Media Recruitment Agency | Hire Top Talent via LinkedIn, Instagram & TikTok");
  const description =
    hero?.metaDescription ||
    (lang === "ge"
      ? "SocialRecruit ist Ihre Spezialagentur für Social-Media-Recruiting. Wir finden qualifizierte Kandidaten über LinkedIn, Instagram & TikTok – 80% schneller und 60% kosteneffizienter. Jetzt kostenlose Strategieberatung buchen."
      : "SocialRecruit is your specialist social media recruitment agency. We source qualified candidates through LinkedIn, Instagram & TikTok – 80% faster and 60% more cost-effective. Book your free strategy call today.");
  const keywordsFromHero = hero?.metaKeywords
    ? hero.metaKeywords.split(",").map((k: string) => k.trim())
    : null;
  const defaultDeKeywords = [
    "Social-Media-Recruiting",
    "Social Media Rekrutierung",
    "Talentgewinnung",
    "Personalvermittlung",
    "Kandidatensourcing",
    "LinkedIn Recruiting",
    "Instagram Recruiting",
    "TikTok Recruiting",
    "Recruiting-Agentur",
    "Digital Recruiting",
    "Employer Branding",
    "Active Sourcing",
    "Talent Acquisition",
  ];
  const defaultEnKeywords = [
    "Social Media Recruitment",
    "Social Recruiting",
    "Talent Sourcing",
    "Recruitment Agency",
    "Candidate Sourcing",
    "LinkedIn Recruiting",
    "Instagram Recruiting",
    "TikTok Recruiting",
    "Digital Recruitment",
    "Employer Branding",
    "Active Sourcing",
    "Talent Acquisition",
    "Recruitment Outsourcing",
    "Hiring Solutions",
  ];
  const keywords = keywordsFromHero ?? (lang === "ge" ? defaultDeKeywords : defaultEnKeywords);
  const pathSeg = publicLocalePathSegment(lang);
  const canonical = absoluteUrl(`/${pathSeg}`);
  const { languages } = hreflangAlternates("");

  return {
    title: { absolute: title },
    description,
    keywords,
    alternates: {
      canonical,
      languages,
    },
    openGraph: {
      title,
      description,
      url: canonical,
      type: "website",
      siteName: "SocialRecruit",
      locale: lang === "ge" ? "de_DE" : "en_US",
      alternateLocale: lang === "ge" ? "en_US" : "de_DE",
      images: [
        {
          url: "/og-image.jpg",
          width: 1200,
          height: 630,
          alt: lang === "ge" ? "SocialRecruit — Social-Media-Recruiting-Agentur" : "SocialRecruit — Professional Social Recruitment",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [absoluteUrl("/og-image.jpg")],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
      },
    },
  };
}

const pageJsonLd = (baseUrl: string) => ({
  en: {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "SocialRecruit — Professional Social Recruitment",
    provider: { "@type": "Organization", name: "SocialRecruit" },
    description:
      "Professional Social Media Recruitment services. Find top talent through LinkedIn, Instagram & TikTok. 80% faster hiring with expert candidate sourcing.",
    areaServed: [
      { "@type": "Country", name: "Germany" },
      { "@type": "Country", name: "Austria" },
      { "@type": "Country", name: "Switzerland" },
      { "@type": "Place", name: "Worldwide" },
    ],
    availableLanguage: ["English", "German"],
    url: `${baseUrl}/en`,
    inLanguage: "en-US",
  },
  ge: {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "SocialRecruit — Professionelles Social-Media-Recruiting",
    provider: { "@type": "Organization", name: "SocialRecruit" },
    description:
      "Professionelle Social-Media-Recruiting-Dienstleistungen. Finden Sie Top-Talente über LinkedIn, Instagram & TikTok. 80% schneller einstellen mit Experten-Sourcing.",
    areaServed: [
      { "@type": "Country", name: "Germany" },
      { "@type": "Country", name: "Austria" },
      { "@type": "Country", name: "Switzerland" },
      { "@type": "Place", name: "Worldwide" },
    ],
    availableLanguage: ["Deutsch", "Englisch"],
    url: `${baseUrl}/de`,
    inLanguage: "de-DE",
  },
});

export default async function HomeLangPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang: rawLangValue } = await params;
  const rawLang = rawLangValue?.toLowerCase();

  if (!SUPPORTED_LANGS.includes(rawLang)) {
    notFound();
  }

  const lang = rawLang === 'de' || rawLang === 'ge' ? 'ge' : 'en';
  const jsonLd = pageJsonLd(SITE_URL)[lang];

  // Fetch FAQ data for structured data only
  let faqData = null;
  try {
    faqData = await fetchApiData<{ faqs: { question: string; answer: string }[] }>(API_ENDPOINTS.FAQ, normalizeLanguage(lang));
  } catch {
    // API unavailable — structured data will be omitted
  }
  const faqs = faqData?.faqs?.slice(0, 10) || [];

  // Generate FAQ schema
  const faqSchema = faqs.length > 0
    ? generateFAQSchema(faqs.map((f: any) => ({ question: f.question, answer: f.answer })))
    : null;

  // Generate breadcrumb schema
  const breadcrumbSchema = generateBreadcrumbSchema([
    { label: lang === 'ge' ? 'Startseite' : 'Home', href: `/${lang}` },
  ]);

  return (
    <div className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
      <Navbar />
      <main id="main-content" className="overflow-x-hidden">
        <Hero />
        <HomeBelowFold lang={lang} />
        <Suspense fallback={null}>
          <FinalCTA lang={lang} />
        </Suspense>
      </main>
    </div>
  );
}
