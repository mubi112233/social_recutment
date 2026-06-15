"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { ArrowLeft, TrendingUp, Users, Clock, DollarSign, Loader2 } from "lucide-react";
import Link from "next/link";
import { getCopy } from "@/lib/copy";
import { SPACING } from "@/lib/constants";
import { fetchCaseStudiesCardsData, type CaseStudyCard } from "@/lib/data-fetching";

export default function CaseStudyClient({ lang }: { lang: string }) {
  const params = useParams();
  const slug = Array.isArray(params.slug) ? params.slug[0] : (params.slug as string);
  const [study, setStudy] = useState<CaseStudyCard | null>(null);
  const [loading, setLoading] = useState(true);
  const copy = getCopy(lang, "caseStudies");
  const isGe = lang === "ge";

  useEffect(() => {
    const id = Number(slug.split("-").pop());
    fetchCaseStudiesCardsData(lang)
      .then((studies) => {
        setStudy(isNaN(id) ? null : studies.find((s) => s.id === id) ?? null);
      })
      .catch(() => setStudy(null))
      .finally(() => setLoading(false));
  }, [lang, slug]);

  if (loading) {
    return (
      <div className={`min-h-screen ${SPACING.sideMargin} bg-background flex items-center justify-center`}>
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!study) {
    return (
      <div className={`min-h-screen ${SPACING.sideMargin} bg-background flex items-center justify-center`}>
        <div className="text-center">
          <p className="text-muted-foreground mb-4">{isGe ? "Fallstudie nicht gefunden." : "Case study not found."}</p>
          <Link href={`/${lang}/case-studies`} className="text-primary underline">
            {isGe ? "Alle Fallstudien" : "All Case Studies"}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${SPACING.sideMargin} bg-background`}>
      <article className="max-w-5xl mx-auto py-6 sm:py-8 md:py-12 px-4 sm:px-6 lg:px-8">
        <nav className="mb-4 sm:mb-6 text-xs sm:text-sm text-muted-foreground overflow-x-auto whitespace-nowrap">
          <Link href={`/${lang}`} className="hover:text-foreground transition-colors">
            {isGe ? "Startseite" : "Home"}
          </Link>
          <span className="mx-2">/</span>
          <Link href={`/${lang}/case-studies`} className="hover:text-foreground transition-colors">
            {isGe ? "Fallstudien" : "Case Studies"}
          </Link>
          <span className="mx-2">/</span>
          <span className="text-foreground truncate inline-block max-w-[150px] sm:max-w-none align-bottom">{study.company}</span>
        </nav>

        <Link
          href={`/${lang}/case-studies`}
          className="inline-flex items-center gap-2 mb-6 sm:mb-8 text-sm text-muted-foreground hover:text-primary transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span className="hidden sm:inline">{isGe ? "Zurück zu Fallstudien" : "Back to Case Studies"}</span>
          <span className="sm:hidden">{isGe ? "Zurück" : "Back"}</span>
        </Link>

        <header className="mb-8 sm:mb-10">
          <div className="flex items-center gap-2 sm:gap-3 mb-4">
            <span className="px-3 sm:px-4 py-1 sm:py-1.5 bg-primary/10 text-primary text-xs sm:text-sm font-bold rounded-full">
              {study.industry}
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-3 sm:mb-4 leading-tight">
            {study.company}
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-primary font-semibold leading-relaxed">{study.title}</p>
        </header>

        {study.image && (
          <figure className="mb-10 sm:mb-12">
            <div className="relative w-full h-48 sm:h-64 md:h-80 lg:h-96 xl:h-[500px] rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl bg-muted">
              <img src={study.image} alt={`${study.company} case study`} className="w-full h-full object-cover" />
            </div>
          </figure>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-10 sm:mb-12">
          {[
            { Icon: DollarSign, value: study.stats?.costSaved || "N/A", label: copy.labels.saved },
            { Icon: Users, value: study.stats?.vaCount || "1", label: copy.labels.teamSize },
            { Icon: Clock, value: study.stats?.timeframe || "1 week", label: copy.labels.timeline },
          ].map(({ Icon, value, label }, i) => (
            <div key={i} className="bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20 rounded-xl sm:rounded-2xl p-6 sm:p-8 text-center hover:shadow-lg hover:scale-105 transition-all">
              <div className="flex justify-center mb-3 sm:mb-4">
                <div className="p-2.5 sm:p-3 bg-primary/10 rounded-full">
                  <Icon className="w-6 h-6 sm:w-8 sm:h-8 text-primary" />
                </div>
              </div>
              <div className="text-2xl sm:text-3xl font-bold text-primary mb-1 sm:mb-2">{value}</div>
              <div className="text-xs sm:text-sm font-medium text-muted-foreground uppercase tracking-wide">{label}</div>
            </div>
          ))}
        </div>

        <section className="mb-10 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4 sm:mb-6 flex items-center gap-3">
            <span className="w-1 h-6 sm:h-8 bg-primary rounded-full" />
            {isGe ? "Herausforderung" : "Challenge"}
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">{study.challenge}</p>
        </section>

        <section className="mb-10 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4 sm:mb-6 flex items-center gap-3">
            <span className="w-1 h-6 sm:h-8 bg-primary rounded-full" />
            {isGe ? "Ergebnisse" : "Results"}
          </h2>
          <div className="bg-gradient-to-br from-card to-card/50 border border-border/50 rounded-xl sm:rounded-2xl p-5 sm:p-6 hover:border-primary/30 transition-all hover:shadow-lg">
            <div className="flex items-start gap-3 sm:gap-4">
              <div className="p-2 bg-primary/10 rounded-lg flex-shrink-0">
                <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-bold text-foreground mb-1">{study.stats?.costSaved}</div>
                <div className="text-xs sm:text-sm font-semibold text-primary mb-2">{copy.labels.saved}</div>
                <div className="text-xs sm:text-sm text-muted-foreground leading-relaxed">{study.challenge}</div>
              </div>
            </div>
          </div>
        </section>

        <footer className="mt-12 sm:mt-16 pt-6 sm:pt-8 border-t border-border/50 text-center">
          <Link
            href={`/${lang}/case-studies`}
            className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-primary text-primary-foreground text-sm sm:text-base font-semibold rounded-xl hover:bg-primary/90 transition-all hover:shadow-lg hover:scale-105 group"
          >
            <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 group-hover:-translate-x-1 transition-transform" />
            <span>{isGe ? "Alle Fallstudien ansehen" : "View All Case Studies"}</span>
          </Link>
        </footer>
      </article>
    </div>
  );
}
