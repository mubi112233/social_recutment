"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { SPACING } from "@/lib/constants";
import { siteConfig, normalizeLocale, localizedPath } from "@/lib/site-config";

export const Footer: React.FC = () => {
  const pathname = usePathname();
  const lang = normalizeLocale(pathname);
  const isGe = lang === "ge";

  const links = {
    en: {
      company: "Company",
      services: "Services",
      resources: "Resources",
      nav: [
        { label: "Home", href: "/en" },
        { label: "Book a Meeting", href: "/en/book-meeting" },
        { label: "Contact Us", href: "/en/contact" },
      ],
      serviceLinks: [
        { label: "LinkedIn Recruiting", href: "/en/#services" },
        { label: "Instagram Recruiting", href: "/en/#services" },
        { label: "TikTok Recruiting", href: "/en/#services" },
        { label: "Employer Branding", href: "/en/#services" },
        { label: "Pricing Plans", href: "/en/#pricing" },
      ],
      resourceLinks: [
        { label: "Blog", href: "/en/blog" },
        { label: "Case Studies", href: "/en/case-studies" },
        { label: "How It Works", href: "/en/#how-it-works" },
        { label: "FAQ", href: "/en/#faq" },
        { label: "Testimonials", href: "/en/#testimonials" },
      ],
      tagline: "Professional Social Media Recruitment services. Find top talent through LinkedIn, Instagram & TikTok. 80% faster hiring with expert sourcing.",
      rights: "All rights reserved.",
    },
    ge: {
      company: "Unternehmen",
      services: "Dienstleistungen",
      resources: "Ressourcen",
      nav: [
        { label: "Startseite", href: "/de" },
        { label: "Meeting buchen", href: "/de/book-meeting" },
        { label: "Kontakt", href: "/de/contact" },
      ],
      serviceLinks: [
        { label: "LinkedIn Recruiting", href: "/de/#services" },
        { label: "Instagram Recruiting", href: "/de/#services" },
        { label: "TikTok Recruiting", href: "/de/#services" },
        { label: "Employer Branding", href: "/de/#services" },
        { label: "Preispläne", href: "/de/#pricing" },
      ],
      resourceLinks: [
        { label: "Blog", href: "/de/blog" },
        { label: "Fallstudien", href: "/de/case-studies" },
        { label: "So funktioniert es", href: "/de/#how-it-works" },
        { label: "Häufige Fragen", href: "/de/#faq" },
        { label: "Kundenstimmen", href: "/de/#testimonials" },
      ],
      tagline: "Professionelle Social-Media-Recruiting-Dienstleistungen. Finden Sie Top-Talente über LinkedIn, Instagram & TikTok. 80% schneller einstellen.",
      rights: "Alle Rechte vorbehalten.",
    },
  };

  const c = links[lang];

  return (
    <footer className="w-full bg-[hsl(250,50%,12%)] border-t border-white/10 mt-8">
      <div className={`container mx-auto ${SPACING.container} py-12 sm:py-16`}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href={`/${lang}`} className="flex items-center gap-2 mb-4 group">
              <div className="w-9 h-9 bg-[hsl(270,80%,65%)] rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-black text-lg">{siteConfig.brandMarkText}</span>
              </div>
              <span className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">{siteConfig.brandName}</span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">{c.tagline}</p>
            <div className="flex items-center gap-3 mb-4">
              <a
                href="https://www.linkedin.com/company/don-sr"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="SocialRecruit on LinkedIn"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              </a>
              <a
                href="https://www.instagram.com/don.sr.official"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="SocialRecruit on Instagram"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
              </a>
              <a
                href="https://www.tiktok.com/@don.sr.official"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="SocialRecruit on TikTok"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.76a4.85 4.85 0 01-1.01-.07z"/></svg>
              </a>
            </div>
            <Link
              href={localizedPath(lang, siteConfig.routes.bookMeeting)}
              className="inline-block px-5 py-2.5 bg-primary text-primary-foreground text-sm font-bold rounded-lg hover:bg-primary/90 transition-colors"
            >
              {isGe ? "Jetzt starten" : "Get Started"}
            </Link>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-bold text-foreground uppercase tracking-wider mb-4">{c.company}</h3>
            <ul className="space-y-2.5">
              {c.nav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-sm font-bold text-foreground uppercase tracking-wider mb-4">{c.services}</h3>
            <ul className="space-y-2.5">
              {c.serviceLinks.map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-sm font-bold text-foreground uppercase tracking-wider mb-4">{c.resources}</h3>
            <ul className="space-y-2.5">
              {c.resourceLinks.map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} SocialRecruit. {c.rights}</p>
          <div className="flex items-center gap-4">
            <Link href={localizedPath(lang, siteConfig.routes.blog)} className="hover:text-primary transition-colors">Blog</Link>
            <Link href={localizedPath(lang, siteConfig.routes.contact)} className="hover:text-primary transition-colors">{isGe ? "Kontakt" : "Contact"}</Link>
            <Link href={localizedPath(lang, siteConfig.routes.bookMeeting)} className="hover:text-primary transition-colors">{isGe ? "Meeting buchen" : "Book Meeting"}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;


