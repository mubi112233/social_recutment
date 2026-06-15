import { notFound } from "next/navigation";
import type { Metadata } from "next";
import BookMeetingClient from "./BookMeetingClient";
import { absoluteUrl, hreflangAlternates, publicLocalePathSegment } from "@/lib/site-url";
import { generateBreadcrumbSchema } from "@/lib/structured-data";

export const dynamic = "force-dynamic";
const SUPPORTED_LANGS = ["en", "ge", "de"];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang: raw } = await params;
  const seg = publicLocalePathSegment(raw);
  const isDE = seg === "de";
  const title = isDE ? "Termin buchen — Kostenlose Recruiting-Beratung | SocialRecruit" : "Book a Meeting — Free Social Recruitment Consultation | SocialRecruit";
  const description = isDE
    ? "Vereinbaren Sie eine kostenlose Recruiting-Beratung mit SocialRecruit und erfahren Sie, wie wir Ihnen helfen, Top-Talente über Social Media zu finden."
    : "Schedule a free Social Recruitment consultation with SocialRecruit and learn how we can help you find top talent through social media.";
  const { languages } = hreflangAlternates("book-meeting");
  const canonical = absoluteUrl(`/${seg}/book-meeting`);

  return {
    title,
    description,
    keywords: isDE
      ? ["Recruiting-Beratung", "Strategieanruf", "SocialRecruit Termin", "Social-Media-Recruiting"]
      : ["Social Recruitment consultation", "strategy call", "SocialRecruit meeting", "social media recruiting"],
    alternates: {
      canonical,
      languages,
    },
    openGraph: {
      title,
      description,
      url: canonical,
      type: "website",
      locale: isDE ? "de_DE" : "en_US",
      alternateLocale: isDE ? "en_US" : "de_DE",
      siteName: "SocialRecruit",
      images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "SocialRecruit Social Recruitment" }],
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

export default async function BookMeetingPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang: rawLang } = await params;
  if (!SUPPORTED_LANGS.includes(rawLang?.toLowerCase())) notFound();
  const lang = rawLang === "ge" || rawLang === "de" ? "ge" : "en";
  const isDE = lang === "ge";
  const breadcrumbSchema = generateBreadcrumbSchema([
    { label: isDE ? "Startseite" : "Home", href: `/${lang}` },
    { label: isDE ? "Meeting buchen" : "Book Meeting", href: `/${lang}/book-meeting` },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <BookMeetingClient />
    </>
  );
}
