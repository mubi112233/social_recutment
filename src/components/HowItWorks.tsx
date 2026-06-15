"use client";

import { motion } from "framer-motion";
import { Calendar, UserCheck, Rocket, LineChart } from "lucide-react";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { fetchHowItWorks, type Step } from "@/lib/api";

const iconMap = {
  Calendar,
  UserCheck,
  Rocket,
  LineChart
};

const fallbackSteps: Step[] = [
  { _id: "1", lang: "en", stepNumber: 1, icon: "Calendar", stepLabel: "Step 1", title: "Strategy & Targeting", description: "We analyze your hiring needs and build ideal candidate personas for precise social media targeting." },
  { _id: "2", lang: "en", stepNumber: 2, icon: "UserCheck", stepLabel: "Step 2", title: "Campaign Creation", description: "We craft compelling job ads and employer branding content optimized for each platform." },
  { _id: "3", lang: "en", stepNumber: 3, icon: "Rocket", stepLabel: "Step 3", title: "Active Sourcing", description: "Our team runs targeted campaigns across LinkedIn, Meta, TikTok, and professional networks." },
  { _id: "4", lang: "en", stepNumber: 4, icon: "LineChart", stepLabel: "Step 4", title: "Screening & Delivery", description: "We pre-screen applicants and deliver a shortlist of qualified, interested candidates." },
];

const fallbackStepsDe: Step[] = [
  { _id: "1", lang: "de", stepNumber: 1, icon: "Calendar", stepLabel: "Schritt 1", title: "Strategie & Targeting", description: "Wir analysieren Ihre Hiring-Bedürfnisse und erstellen ideale Kandidaten-Personas für präzises Targeting." },
  { _id: "2", lang: "de", stepNumber: 2, icon: "UserCheck", stepLabel: "Schritt 2", title: "Kampagnen-Erstellung", description: "Wir erstellen überzeugende Stellenanzeigen und Employer-Branding-Inhalte für jede Plattform." },
  { _id: "3", lang: "de", stepNumber: 3, icon: "Rocket", stepLabel: "Schritt 3", title: "Aktives Sourcing", description: "Unser Team führt gezielte Kampagnen über LinkedIn, Meta, TikTok und professionelle Netzwerke durch." },
  { _id: "4", lang: "de", stepNumber: 4, icon: "LineChart", stepLabel: "Schritt 4", title: "Screening & Lieferung", description: "Wir screenen Bewerber vor und liefern eine Shortlist qualifizierter Kandidaten." },
];

const sectionCopy = {
  en: {
    badge: "Social Recruitment in 4 Steps",
    heading: "How It Works",
    description: "From discovery to launch in weeks—not months. Clear milestones and measurable results.",
  },
  ge: {
    badge: "Social-Media-Recruiting in 4 Schritten",
    heading: "So funktioniert's",
    description: "Von der Entdeckung bis zum Launch in Wochen – nicht Monaten. Klare Meilensteine und messbare Ergebnisse.",
  },
};

export const HowItWorks = () => {
  const pathname = usePathname() ?? "/";
  const currentLang = pathname.startsWith('/ge') || pathname.startsWith('/de') ? 'ge' : 'en';
  const copy = sectionCopy[currentLang as keyof typeof sectionCopy] || sectionCopy.en;
  const fallback = currentLang === 'ge' ? fallbackStepsDe : fallbackSteps;

  const [steps, setSteps] = useState<Step[]>(fallback); // show fallback immediately
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHowItWorks(currentLang)
      .then((data) => setSteps(data?.steps?.length ? data.steps : fallback))
      .catch(() => setSteps(fallback))
      .finally(() => setLoading(false));
  }, [currentLang]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <motion.section
      id="how-it-works"
      className="relative py-4 sm:py-6 md:py-8 lg:py-10 z-20 bg-background"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.05 }}
      transition={{ duration: 1.2, ease: [0.6, -0.05, 0.01, 0.99] }}
    >
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div
          className="mb-10 sm:mb-16 md:mb-20 text-left"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <span className="inline-block px-4 py-2 bg-primary text-primary-foreground text-sm font-semibold rounded-full mb-4 shadow-lg">
            {copy.badge}
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 text-foreground">
            How It <span className="text-primary">Works</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl leading-relaxed">
            {copy.description}
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto">
          {steps.map((step, index) => {
            const IconComponent = iconMap[step.icon as keyof typeof iconMap] || Calendar;
            return (
              <motion.div
                key={step._id || index}
                className="relative mb-12 sm:mb-16 last:mb-0"
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50, rotateY: 0 }}
                whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.8, delay: index * 0.2, ease: [0.6, -0.05, 0.01, 0.99] }}
              >
                <div className={`flex flex-col md:flex-row gap-6 sm:gap-8 md:gap-10 items-center ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
                  <motion.div
                    className="flex-shrink-0 w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full bg-primary flex items-center justify-center shadow-[0_20px_60px_-15px_hsl(var(--primary)/0.4)] relative group"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                  >
                    <div className="absolute inset-0 rounded-full bg-primary/30 blur-xl group-hover:blur-2xl transition-all duration-500" />
                    <IconComponent className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 text-primary-foreground relative z-10" />
                    <div className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 w-7 h-7 sm:w-8 sm:h-8 bg-background text-primary rounded-full flex items-center justify-center text-xs sm:text-sm font-bold border-2 border-primary">
                      {step.stepNumber || index + 1}
                    </div>
                  </motion.div>

                  <motion.div
                    className={`relative flex-1 bg-card border border-border rounded-xl sm:rounded-2xl p-6 sm:p-8 md:p-10 hover:border-primary/40 hover:shadow-[0_20px_60px_-15px_hsl(var(--primary)/0.2)] transition-all duration-500 group overflow-hidden ${index % 2 === 1 ? 'md:text-right' : ''}`}
                    whileHover={{ y: -8, scale: 1.02 }}
                  >
                    <p className="text-primary font-bold text-sm uppercase tracking-wider mb-3">
                      {step.stepLabel || `STEP ${index + 1}`}
                    </p>
                    <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 sm:mb-4 text-foreground group-hover:text-primary transition-colors duration-300">
                      {step.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed text-sm sm:text-base md:text-lg">
                      {step.description}
                    </p>

                    {/* Decorative corner */}
                    <div className={`absolute ${index % 2 === 1 ? 'top-0 left-0 border-t-2 border-l-2 rounded-tl-xl sm:rounded-tl-2xl' : 'bottom-0 right-0 border-b-2 border-r-2 rounded-br-xl sm:rounded-br-2xl'} w-12 h-12 sm:w-16 sm:h-16 border-primary/0 group-hover:border-primary/50 transition-all duration-500`} />
                  </motion.div>
                </div>

                {index < steps.length - 1 && (
                  <motion.div
                    className="absolute left-16 top-32 w-0.5 h-16 bg-gradient-to-b from-primary via-primary/50 to-transparent hidden md:block"
                    initial={{ scaleY: 0 }}
                    whileInView={{ scaleY: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.2 + 0.4 }}
                  />
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.section>
  );
};


