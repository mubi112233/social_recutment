/**
 * Canonical site origin for metadata, sitemap, and JSON-LD.
 * Set NEXT_PUBLIC_SITE_URL in production to match your live domain exactly
 * (with or without www — must match what the host actually serves on).
 */
export const isProduction = process.env.NODE_ENV === "production";

// Fallback — must match what Hostinger actually serves (no trailing slash)
const PRODUCTION_SITE_URL = "https://don-sr.com";
const DEFAULT_SITE_URL = isProduction ? PRODUCTION_SITE_URL : "http://localhost:3000";

// Reject obviously wrong or stale domain values
const envUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
const isValidEnvUrl =
  envUrl &&
  !envUrl.includes("socialrecruit.de") &&
  !envUrl.includes("don-va.com") &&
  !envUrl.includes("SocialRecruit.com");

export const SITE_URL = (isValidEnvUrl ? envUrl : DEFAULT_SITE_URL) as string;

// Warn in production if the env var is missing — a missing value means canonicals
// may not match the live URL, which hurts indexing.
if (isProduction && !isValidEnvUrl) {
  console.warn(
    "[site-url] NEXT_PUBLIC_SITE_URL is not set or invalid. " +
      `Falling back to hardcoded "${PRODUCTION_SITE_URL}". ` +
      "Set this env var in Hostinger to the exact URL the site is served on."
  );
}

export function absoluteUrl(path: string): string {
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${p}`;
}

/** Path segment for canonical / OG URLs: `de` for German (valid hreflang), `en` for English. */
export function publicLocalePathSegment(lang: string): "en" | "de" {
  return lang === "ge" || lang === "de" ? "de" : "en";
}

/**
 * Path after locale, e.g. "" for home, "contact", "blog/post-slug"
 * (no leading slash on segments).
 */
export function hreflangAlternates(pathAfterLocale: string): {
  canonicalEn: string;
  canonicalDe: string;
  languages: Record<string, string>;
} {
  const tail = pathAfterLocale ? `/${pathAfterLocale.replace(/^\//, "")}` : "";
  return {
    canonicalEn: absoluteUrl(`/en${tail}`),
    canonicalDe: absoluteUrl(`/de${tail}`),
    languages: {
      en: absoluteUrl(`/en${tail}`),
      de: absoluteUrl(`/de${tail}`),
      "x-default": absoluteUrl(`/en${tail}`),
    },
  };
}


