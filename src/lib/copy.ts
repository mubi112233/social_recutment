/**
 * Next-safe copy/translation constants (no react-i18next runtime)
 * Mirrors frontend/src/lib/client-i18n.ts for badge/heading/subheading text.
 * Use URL-based language detection (en/ge) to select strings.
 */

export const copy = {
  en: {
    // Navigation
    nav: {
      services: "Services",
      howItWorks: "How It Works",
      pricing: "Pricing",
      testimonials: "Testimonials",
      faq: "FAQ",
      bookConsultation: "Book a Call",
      contact: "Contact",
    },

    // Hero Section
    hero: {
      badge: "Social Media Marketing Agency",
      title: "We Find Top Talent",
      titleHighlight: "Through Social",
      subtitle: "Transform your recruitment with data-driven social media strategies. We connect you with qualified candidates faster and more cost-effectively than traditional methods.",
      ctaPrimary: "Book Free Consultation",
      urgency: "Limited spots available this month",
      stats: {
        clients: "Placements Made",
        costSaved: "Avg. Time to Hire",
        rating: "Client Satisfaction",
      },
    },

    // How It Works
    howItWorks: {
      badge: "Our Process",
      heading: "From Strategy to <span class=\"text-gold\">Hire</span>",
      description: "Our proven 4-step process delivers qualified candidates through targeted social media recruitment campaigns.",
      steps: {
        step1: {
          step: "Step 1",
          title: "Strategy & Targeting",
          description: "We analyze your hiring needs and build ideal candidate personas for precise social media targeting."
        },
        step2: {
          step: "Step 2",
          title: "Campaign Creation",
          description: "We craft compelling job ads and employer branding content optimized for each platform."
        },
        step3: {
          step: "Step 3",
          title: "Active Sourcing",
          description: "Our team runs targeted campaigns across LinkedIn, Meta, TikTok, and professional networks."
        },
        step4: {
          step: "Step 4",
          title: "Screening & Delivery",
          description: "We pre-screen applicants and deliver a shortlist of qualified, interested candidates."
        }
      }
    },

    // Services
    services: {
      badge: "Our Services",
      titlePrefix: "Recruitment",
      titleHighlight: "Solutions",
      subtitle: "End-to-end social media recruitment services designed to fill your open positions faster.",
    },

    // Why Choose Us (fallback, API may provide its own)
    whyChooseUs: {
      badge: "Why Choose Us",
      heading: "What makes us <span class=\"text-gold\">different</span>",
      description: "Data-driven recruitment with 60% faster time-to-hire and 40% lower cost-per-hire than traditional agencies.",
    },

    // Testimonials
    testimonials: {
      heading: "Trusted by <span class=\"text-gold\">200+ Companies</span>",
      subheading: "See how we've helped businesses build their dream teams through social recruitment.",
      caseStudy: {
        badge: "Success Story",
        title: "Case Study: <span class=\"text-gold\">3.4x ROAS</span>",
        description: "See how we helped a DTC beauty brand scale their team by 150% while reducing cost-per-hire by 32%.",
        cta: "View Full Case Study",
      },
    },

    // Blog
    blog: {
      badge: "Recruitment Insights",
      heading: "Latest <span class=\"text-gold\">HR Guides</span>",
      description: "Expert recruitment strategies, social media hiring tips, employer branding best practices, and talent acquisition guides.",
      by: "By",
      readMore: "Read more",
      read: "Read",
    },

    // Case Studies
    caseStudies: {
      badge: "Success Stories",
      heading: "Recruitment <span class=\"text-gold\">Success Stories</span>",
      description: "See how we transformed hiring challenges into successful placements through strategic social media recruitment.",
      labels: {
        saved: "Time Saved",
        teamSize: "Hires Made",
        timeline: "Timeframe",
        viewFull: "View Full Case Study",
        viewStudy: "View Case Study",
      },
    },

    // FAQ
    faq: {
      badge: "Recruitment FAQs",
      title: "Frequently Asked Questions",
      description: "Answers to common questions about our social media recruitment services, platforms, pricing, and timelines.",
      qualityCardTitle: "Quality Guarantee",
      qualityCardText: "Pre-screened candidates, skills assessments, culture fit evaluation, and replacement guarantee.",
      toolsCardTitle: "Complete Recruitment Stack",
      toolsCardText: "LinkedIn • Meta • TikTok • Instagram • Google Ads • Programmatic • ATS Integration",
      stillHaveQuestionsTitle: "Still have questions?",
      stillHaveQuestionsText: "Our team is here to help. Get in touch and we'll respond within 24 hours.",
      contactSupport: "Contact Support",
      viewPricing: "View Pricing",
    },

    // Pricing
    pricing: {
      sectionBadge: "Transparent Pricing",
      sectionTitle: "Recruitment Packages",
      sectionDescription: "Choose a plan that fits your hiring volume. Professional recruitment with transparent pricing. No hidden fees.",
      vaCountLabel: "How many hires per month?",
      vaCountHelper: "Select your average monthly hiring volume",
      startingFrom: "Starting from €{price}/month",
      bulkDiscount: "{percent}% volume discount applied!",
      bulkSavings: "You save €{amount} total",
      bulkHint: "Add {count} more hire{suffix} to unlock {percent}% discount",
      bannerBadge: "Free 30‑Minute Strategy Call",
      bannerTitle: "Get Expert Recruitment Advice",
      bannerSubtitle: "Discuss your hiring challenges and get a custom social media recruitment strategy",
      bannerPoints: {
        noCommitment: "No obligation",
        cancelAnytime: "Cancel anytime",
        fullAccess: "Free strategy audit"
      },
      plans: {
        starter: {
          name: "Starter",
          hours: "Up to 3 hires/month",
          features: [
            "LinkedIn & Meta campaigns",
            "Basic candidate screening",
            "Job ad creation & optimization",
            "Weekly performance reports",
            "Email support"
          ]
        },
        professional: {
          name: "Professional",
          hours: "Up to 10 hires/month",
          badge: "Most Popular",
          features: [
            "Everything in Starter",
            "Multi-platform campaigns (TikTok, Instagram)",
            "Advanced candidate assessments",
            "Employer branding content",
            "ATS integration",
            "Priority support"
          ]
        },
        enterprise: {
          name: "Enterprise",
          hours: "Unlimited hires",
          badge: "Best Value",
          features: [
            "Everything in Professional",
            "Dedicated recruitment manager",
            "Custom sourcing strategies",
            "Video interviews & assessments",
            "Employer branding workshop",
            "24/7 support & SLAs"
          ]
        }
      },
      button: "Get Started",
      perMonth: "/month",
      hoursUnit: "hire volume",
      planSetupFee: "+€{fee} setup fee",
      planNoSetupFee: "Free setup included",
      disclaimer: "All plans billed monthly with no long-term contracts. Upgrade or downgrade anytime. First candidates within 7 days."
    },

    // Final CTA
    finalCTA: {
      badge: "Start Hiring Smarter Today",
      title: "Ready to Transform <span class=\"text-gold\">Your Recruitment?</span>",
      description: "Join 200+ companies using social media to find top talent faster and more cost-effectively.",
    },

    // Value Proposition (if used)
    valueProposition: {
      heading: "Why <span class=\"text-gold\">200+</span> Companies Trust Us",
      description: "Data-driven recruitment with 60% faster time-to-hire and 40% lower cost-per-hire than traditional agencies.",
    },

    // Tools Integration
    tools: {
      badge: "Platforms We Use",
      heading: "Integrated With <span class=\"text-gold\">Top Platforms</span>",
      description: "We leverage the best social media and professional networks to reach your ideal candidates.",
    },
  },

  ge: {
    // Navigation
    nav: {
      services: "Leistungen",
      howItWorks: "So funktioniert's",
      pricing: "Preise",
      testimonials: "Kundenstimmen",
      faq: "FAQ",
      bookConsultation: "Termin vereinbaren",
      contact: "Kontakt",
    },

    // Hero Section
    hero: {
      badge: "Social Media Marketing Agentur",
      title: "Wir finden Top-Talente",
      titleHighlight: "über Social Media",
      subtitle: "Transformieren Sie Ihr Recruiting mit datengesteuerten Social-Media-Strategien. Wir verbinden Sie schneller und kostengünstiger mit qualifizierten Kandidaten als traditionelle Methoden.",
      ctaPrimary: "Kostenlose Beratung",
      urgency: "Begrenzte Plätze diesen Monat verfügbar",
      stats: {
        clients: "Vermittlungen",
        costSaved: "Ø Time-to-Hire",
        rating: "Kundenzufriedenheit",
      },
    },

    // How It Works
    howItWorks: {
      badge: "Unser Prozess",
      heading: "Von Strategie zum <span class=\"text-gold\">Hire</span>",
      description: "Unser bewährter 4-Schritte-Prozess liefert qualifizierte Kandidaten durch gezielte Social-Media-Recruiting-Kampagnen.",
      steps: {
        step1: {
          step: "Schritt 1",
          title: "Strategie & Targeting",
          description: "Wir analysieren Ihre Hiring-Bedürfnisse und erstellen ideale Kandidaten-Personas für präzises Social-Media-Targeting."
        },
        step2: {
          step: "Schritt 2",
          title: "Kampagnen-Erstellung",
          description: "Wir erstellen überzeugende Stellenanzeigen und Employer-Branding-Inhalte, optimiert für jede Plattform."
        },
        step3: {
          step: "Schritt 3",
          title: "Aktives Sourcing",
          description: "Unser Team führt gezielte Kampagnen über LinkedIn, Meta, TikTok und professionelle Netzwerke durch."
        },
        step4: {
          step: "Schritt 4",
          title: "Screening & Lieferung",
          description: "Wir screenen Bewerber vor und liefern eine Shortlist qualifizierter, interessierter Kandidaten."
        }
      }
    },

    // Services
    services: {
      badge: "Unsere Leistungen",
      titlePrefix: "Recruiting",
      titleHighlight: "Lösungen",
      subtitle: "End-to-End Social-Media-Recruiting-Services, entwickelt um Ihre offenen Positionen schneller zu besetzen.",
    },

    // Why Choose Us (fallback, API may provide its own)
    whyChooseUs: {
      badge: "Warum wir",
      heading: "Was uns <span class=\"text-gold\">auszeichnet</span>",
      description: "Datengesteuertes Recruiting mit 60% schnellerer Time-to-Hire und 40% niedrigeren Kosten pro Einstellung als traditionelle Agenturen.",
    },

    // Testimonials
    testimonials: {
      heading: "Vertrauen von <span class=\"text-gold\">200+ Unternehmen</span>",
      subheading: "Sehen Sie, wie wir Unternehmen geholfen haben, ihr Dreamteam durch Social Recruiting aufzubauen.",
      caseStudy: {
        badge: "Erfolgsgeschichte",
        title: "Fallstudie: <span class=\"text-gold\">3,4x ROAS</span>",
        description: "Sehen Sie, wie wir einer DTC-Beauty-Marke halfen, ihr Team um 150% zu skalieren und gleichzeitig die Kosten pro Einstellung um 32% zu senken.",
        cta: "Vollständige Fallstudie ansehen",
      },
    },

    // Blog
    blog: {
      badge: "Recruiting Insights",
      heading: "Aktuelle <span class=\"text-gold\">HR Guides</span>",
      description: "Experten-Recruiting-Strategien, Social-Media-Hiring-Tipps, Employer-Branding-Best-Practices und Talent-Acquisition-Guides.",
      by: "Von",
      readMore: "Weiterlesen",
      read: "Lesen",
    },

    // Case Studies
    caseStudies: {
      badge: "Erfolgsgeschichten",
      heading: "Recruiting <span class=\"text-gold\">Erfolgsgeschichten</span>",
      description: "Sehen Sie, wie wir Hiring-Herausforderungen in erfolgreiche Placements durch strategisches Social-Media-Recruiting verwandelt haben.",
      labels: {
        saved: "Zeit gespart",
        teamSize: "Einstellungen",
        timeline: "Zeitrahmen",
        viewFull: "Vollständige Fallstudie ansehen",
        viewStudy: "Fallstudie ansehen",
      },
    },

    // FAQ
    faq: {
      badge: "Recruiting FAQs",
      title: "Häufig gestellte Fragen",
      description: "Antworten zu unseren Social-Media-Recruiting-Services, Plattformen, Preisen und Zeitplänen.",
      qualityCardTitle: "Qualitätsgarantie",
      qualityCardText: "Vor-screened Kandidaten, Skills-Assessments, Kultur-Fit-Evaluierung und Ersatzgarantie.",
      toolsCardTitle: "Kompletter Recruiting-Stack",
      toolsCardText: "LinkedIn • Meta • TikTok • Instagram • Google Ads • Programmatic • ATS-Integration",
      stillHaveQuestionsTitle: "Noch Fragen?",
      stillHaveQuestionsText: "Unser Team hilft Ihnen gerne. Wir antworten innerhalb von 24 Stunden.",
      contactSupport: "Support kontaktieren",
      viewPricing: "Preise ansehen",
    },

    // Pricing
    pricing: {
      sectionBadge: "Transparente Preise",
      sectionTitle: "Recruiting-Pakete",
      sectionDescription: "Wählen Sie einen Plan, der zu Ihrem Hiring-Volumen passt. Professionelles Recruiting mit transparenten Preisen.",
      vaCountLabel: "Wie viele Einstellungen pro Monat?",
      vaCountHelper: "Wählen Sie Ihr durchschnittliches monatliches Hiring-Volumen",
      startingFrom: "Ab €{price}/Monat",
      bulkDiscount: "{percent}% Volumenrabatt!",
      bulkSavings: "Gesamtersparnis: €{amount}",
      bulkHint: "Fügen Sie {count} weitere Einstellung{suffix} hinzu, um {percent}% Rabatt zu erhalten",
      bannerBadge: "Kostenlose 30-Min Strategie-Session",
      bannerTitle: "Erhalten Sie Experten-Recruiting-Beratung",
      bannerSubtitle: "Besprechen Sie Ihre Hiring-Herausforderungen und erhalten Sie eine Social-Media-Recruiting-Strategie",
      bannerPoints: {
        noCommitment: "Keine Verpflichtung",
        cancelAnytime: "Jederzeit kündbar",
        fullAccess: "Kostenloser Strategie-Audit"
      },
      plans: {
        starter: {
          name: "Starter",
          hours: "Bis zu 3 Einstellungen/Monat",
          features: [
            "LinkedIn & Meta Kampagnen",
            "Basis-Kandidaten-Screening",
            "Stellenanzeigen-Erstellung & Optimierung",
            "Wöchentliche Performance-Berichte",
            "E-Mail & Chat Support"
          ]
        },
        professional: {
          name: "Professional",
          hours: "Bis zu 10 Einstellungen/Monat",
          badge: "Beliebteste Wahl",
          features: [
            "Alles aus Starter",
            "Multi-Plattform-Kampagnen (TikTok, Instagram)",
            "Erweiterte Kandidaten-Assessments",
            "Employer-Branding-Inhalte",
            "ATS-Integration",
            "Prioritätsupport"
          ]
        },
        enterprise: {
          name: "Enterprise",
          hours: "Unbegrenzte Einstellungen",
          badge: "Bester Wert",
          features: [
            "Alles aus Professional",
            "Dedizierter Recruiting-Manager",
            "Individuelle Sourcing-Strategien",
            "Video-Interviews & Assessments",
            "Employer-Branding-Workshop",
            "24/7 Support & SLAs"
          ]
        }
      },
      button: "Jetzt starten",
      perMonth: "/Monat",
      hoursUnit: "Einstellungs-Volumen",
      planSetupFee: "+€{fee} Setup-Gebühr",
      planNoSetupFee: "Kostenloses Setup inklusive",
      disclaimer: "Alle Pläne monatlich abrechnbar ohne Langzeitvertrag. Jederzeit upgraden oder downgraden. Erste Kandidaten innerhalb von 7 Tagen."
    },

    // Final CTA
    finalCTA: {
      badge: "Beginnen Sie heute mit smarter Hiring",
      title: "Bereit, Ihr <span class=\"text-gold\">Recruiting zu transformieren?</span>",
      description: "Schließen Sie sich 200+ Unternehmen an, die Social Media nutzen, um schneller und kostengünstiger Top-Talente zu finden.",
    },

    // Value Proposition (if used)
    valueProposition: {
      heading: "Warum <span class=\"text-gold\">200+</span> Unternehmen uns vertrauen",
      description: "Datengesteuertes Recruiting mit 60% schnellerer Time-to-Hire und 40% niedrigeren Kosten pro Einstellung als traditionelle Agenturen.",
    },

    // Tools Integration
    tools: {
      badge: "Plattformen die wir nutzen",
      heading: "Integriert mit <span class=\"text-gold\">Top-Plattformen</span>",
      description: "Wir nutzen die besten Social-Media- und professionellen Netzwerke, um Ihre idealen Kandidaten zu erreichen.",
    },
  },
} as const;

/**
 * Helper to get copy for a language (en/ge)
 */
export const getCopy = <K extends keyof typeof copy.en>(lang: string, key: K) => {
  const normalizedLang = lang.toLowerCase().startsWith('ge') || lang.toLowerCase().startsWith('de') ? 'ge' : 'en';
  return copy[normalizedLang as 'en' | 'ge'][key];
};


