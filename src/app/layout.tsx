import type { Metadata, Viewport } from "next";
import { headers } from "next/headers";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Toaster } from "@/components/ui/toaster";
import { DesignTokensProvider } from "@/components/DesignTokensProvider";
import { SITE_URL, absoluteUrl } from "@/lib/site-url";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#3b82f6" },
    { media: "(prefers-color-scheme: dark)", color: "#1e1a33" },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "SocialRecruit – Social Media Recruitment Agency | Hire Top Talent via LinkedIn, Instagram & TikTok",
    template: "%s | SocialRecruit",
  },
  description:
    "SocialRecruit is your specialist social media recruitment agency. We source qualified candidates through LinkedIn, Instagram & TikTok – 80% faster and 60% more cost-effective than traditional methods. Book your free strategy call today.",
  keywords: [
    "social media recruitment",
    "social recruiting",
    "linkedin recruiting",
    "instagram recruiting",
    "tiktok recruiting",
    "talent acquisition",
    "candidate sourcing",
    "employer branding",
    "recruitment marketing",
    "hiring solutions",
    "recruitment agency",
    "digital recruitment",
    "active sourcing",
    "recruitment outsourcing",
    "headhunting social media",
    "personalvermittlung",
    "social media recruiting deutschland",
    "recruiting agentur",
    "mitarbeitergewinnung",
    "employer branding agentur",
    "kandidatensourcing",
    "talentgewinnung",
    "SocialRecruit",
    "don-sr.com",
  ],
  authors: [{ name: "SocialRecruit", url: SITE_URL }],
  creator: "SocialRecruit",
  publisher: "SocialRecruit",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  verification: {
    google: "zgcogxyprhBhJw6ZwAznROIfIfKA4zi8jaNyibuqxPI",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    siteName: "SocialRecruit",
    title: "SocialRecruit – Social Media Recruitment Agency | Hire Top Talent via LinkedIn, Instagram & TikTok",
    description:
      "SocialRecruit sources qualified candidates through LinkedIn, Instagram & TikTok – 80% faster and 60% more cost-effective than traditional methods.",
    url: absoluteUrl("/en"),
    locale: "en_US",
    alternateLocale: ["de_DE"],
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "SocialRecruit — Social Media Recruitment Agency" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "SocialRecruit – Social Media Recruitment Agency | Hire Top Talent via LinkedIn, Instagram & TikTok",
    description:
      "SocialRecruit sources qualified candidates through LinkedIn, Instagram & TikTok – 80% faster and 60% more cost-effective than traditional methods.",
    images: [absoluteUrl("/og-image.jpg")],
  },
  alternates: {
    canonical: absoluteUrl("/en"),
    languages: {
      en: absoluteUrl("/en"),
      de: absoluteUrl("/de"),
      "x-default": absoluteUrl("/en"),
    },
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${SITE_URL}/#organization`,
  name: "SocialRecruit",
  url: SITE_URL,
  logo: {
    "@type": "ImageObject",
    url: absoluteUrl("/og-image.jpg"),
    width: 1200,
    height: 630,
  },
  description:
    "Social media recruitment agency specializing in talent acquisition through LinkedIn, Meta, TikTok, and professional networks for businesses in Germany and worldwide.",
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer service",
    availableLanguage: ["English", "German"],
    email: "hello@don-sr.com",
    areaServed: ["DE", "AT", "CH", "Worldwide"],
  },
  areaServed: [
    { "@type": "Country", name: "Germany" },
    { "@type": "Country", name: "Austria" },
    { "@type": "Country", name: "Switzerland" },
    { "@type": "Place", name: "Worldwide" },
  ],
  sameAs: [
    "https://www.linkedin.com/company/don-sr",
    "https://www.instagram.com/don.sr.official",
    "https://www.tiktok.com/@don.sr.official",
  ],
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  name: "SocialRecruit",
  url: SITE_URL,
  inLanguage: ["en-US", "de-DE"],
  publisher: { "@type": "Organization", "@id": `${SITE_URL}/#organization`, name: "SocialRecruit", url: SITE_URL },
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${SITE_URL}/en/blog?q={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
};

// Service schema for recruitment services
const serviceJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "Social Media Recruitment Services",
  provider: {
    "@type": "Organization",
    name: "SocialRecruit",
    url: SITE_URL,
  },
  areaServed: [
    { "@type": "Country", name: "Germany" },
    { "@type": "Country", name: "Austria" },
    { "@type": "Country", name: "Switzerland" },
    { "@type": "Place", name: "Worldwide" },
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Recruitment Services",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "LinkedIn Recruiting",
          description: "Professional LinkedIn candidate sourcing and ABM campaigns",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Meta Recruiting",
          description: "Facebook and Instagram recruitment campaigns with UGC",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "TikTok Recruitment",
          description: "Gen Z and Millennial talent acquisition through TikTok",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Employer Branding",
          description: "Strategic employer brand content and positioning",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Candidate Screening",
          description: "Pre-screening and skills assessment of applicants",
        },
      },
    ],
  },
};

// LocalBusiness schema for Recruitment Agency
const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": ["EmploymentAgency", "ProfessionalService"],
  "@id": `${SITE_URL}/#business`,
  name: "SocialRecruit",
  url: SITE_URL,
  logo: {
    "@type": "ImageObject",
    url: absoluteUrl("/og-image.jpg"),
    width: 1200,
    height: 630,
  },
  image: absoluteUrl("/og-image.jpg"),
  description: "Social media recruitment agency specializing in talent acquisition through LinkedIn, Meta, TikTok, and professional networks",
  email: "hello@don-sr.com",
  sameAs: [
    "https://www.linkedin.com/company/don-sr",
    "https://www.instagram.com/don.sr.official",
    "https://www.tiktok.com/@don.sr.official",
  ],
  priceRange: "€€",
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "18:00",
    },
  ],
  knowsLanguage: ["en", "de"],
  areaServed: [
    { "@type": "Country", name: "Germany" },
    { "@type": "Country", name: "Austria" },
    { "@type": "Country", name: "Switzerland" },
    { "@type": "Place", name: "Worldwide" },
  ],
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const headersList = await headers();
  const htmlLang = headersList.get("x-html-lang") || "en";
  
  return (
    <html lang={htmlLang} suppressHydrationWarning className="font-sans">
      <head>
        {/* Performance: Preconnect to external domains */}
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet" />
        
        {/* Google tag (gtag.js) */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-GFH2V4P0BX" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-GFH2V4P0BX');
            `,
          }}
        />
        
        {/* Security */}
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
        />
      </head>
      <body className="font-sans antialiased" suppressHydrationWarning>
        <a href="#main-content" className="skip-to-content">
          Skip to main content
        </a>
        <DesignTokensProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
          >
            {children}
            <Toaster />
          </ThemeProvider>
        </DesignTokensProvider>
      </body>
    </html>
  );
}


