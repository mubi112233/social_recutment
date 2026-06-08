"use client";

import { motion } from "framer-motion";
import { Calendar, UserCheck, Rocket, LineChart, CheckCircle, ArrowRight, Star, Sparkles, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import { fetchHowItWorks } from "@/lib/api";
import { SPACING } from "@/lib/constants";
import { usePathname } from "next/navigation";

// Icon mapping
const iconMap: Record<string, any> = {
  Calendar,
  UserCheck,
  Rocket,
  LineChart,
  CheckCircle,
  ArrowRight,
  Star,
  Sparkles,
};

interface HowItWorksStep {
  _id?: string;
  stepNumber: number;
  title: string;
  description: string;
  icon: string;
  stepLabel?: string;
}

const headerCopy = {
  en: {
    badge: "How It Works",
    heading: "Get started in <span class=\"text-[hsl(270,80%,75%)]\">4 simple steps</span>",
    description:
      "From onboarding to measurable results — our process is designed to be fast, clear, and efficient.",
  },
  ge: {
    badge: "Wie es funktioniert",
    heading: "Starten Sie in <span class=\"text-[hsl(270,80%,75%)]\">4 einfachen Schritten</span>",
    description:
      "Vom Onboarding bis zu messbaren Ergebnissen – unser Prozess ist schnell, klar und effizient.",
  },
} as const;

const fallbackStepsCopy: Record<string, HowItWorksStep[]> = {
  en: [
    {
      stepNumber: 1,
      title: "Schedule a Free Strategy Call",
      description: "Book a 15-minute call with our team to discuss your hiring challenges and talent needs.",
      icon: "Calendar"
    },
    {
      stepNumber: 2,
      title: "Setup & Automation",
      description: "We set up smart sourcing workflows, automation, and tracking to find your ideal candidates.",
      icon: "UserCheck"
    },
    {
      stepNumber: 3,
      title: "Daily Management Begins",
      description: "Our team starts sourcing candidates daily—screening, engaging, and delivering qualified talent.",
      icon: "Rocket"
    },
    {
      stepNumber: 4,
      title: "Watch Your Productivity Grow",
      description: "See your hiring speed soar as our social media sourcing delivers qualified candidates 80% faster.",
      icon: "LineChart"
    }
  ],
  ge: [
    {
      stepNumber: 1,
      title: "Kostenlosen Strategieanruf vereinbaren",
      description: "Vereinbaren Sie einen 15-minütigen Anruf mit unserem Team, um Ihre Recruiting-Herausforderungen zu besprechen.",
      icon: "Calendar"
    },
    {
      stepNumber: 2,
      title: "Setup & Automatisierung",
      description: "Wir konfigurieren intelligente Sourcing-Workflows, Automatisierung und Tracking zur Kandidatenfindung.",
      icon: "UserCheck"
    },
    {
      stepNumber: 3,
      title: "Tägliches Management beginnt",
      description: "Unser Team beginnt mit dem täglichen Kandidaten-Sourcing – screenen, kontaktieren, qualifizierte Talente liefern.",
      icon: "Rocket"
    },
    {
      stepNumber: 4,
      title: "Sehen Sie Ihre Produktivität steigen",
      description: "Erleben Sie, wie Ihre Einstellungsgeschwindigkeit steigt, während unser Social-Media-Sourcing 80% schneller qualifizierte Kandidaten liefert.",
      icon: "LineChart"
    }
  ]
};

export const HowItWorksDynamic = () => {
  const [steps, setSteps] = useState<HowItWorksStep[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const pathname = usePathname() ?? "/";
  const currentLang = pathname.startsWith('/ge') || pathname.startsWith('/de') ? 'ge' : 'en';

  // Fetch How It Works data from API
  useEffect(() => {
    const fetchHowItWorksData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const howItWorksData = await fetchHowItWorks(currentLang);
        
        if (howItWorksData && howItWorksData.steps && howItWorksData.steps.length > 0) {
          setSteps(howItWorksData.steps);
        } else {
          // Use fallback data if API fails
          const fallbackSteps: HowItWorksStep[] = fallbackStepsCopy[currentLang];
          
          setSteps(fallbackSteps);
        }
      } catch (err) {
        console.error('Error fetching HowItWorks:', err);
        setError('Failed to load HowItWorks data');
        
        // Set fallback data on error
        const fallbackSteps: HowItWorksStep[] = fallbackStepsCopy[currentLang];
        
        setSteps(fallbackSteps);
      } finally {
        setLoading(false);
      }
    };

    fetchHowItWorksData();
  }, [currentLang]);

  // Loading state
  if (loading) {
    return (
      <section 
        id="how-it-works"
        className="relative py-8 sm:py-10 md:py-12 lg:py-14 bg-[hsl(250,50%,12%)] z-20 min-h-[600px]"
      >
        <div className={`container mx-auto ${SPACING.container}`}>
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-[hsl(270,80%,75%)]" />
          </div>
        </div>
      </section>
    );
  }

  // Error state or no steps
  if (error || steps.length === 0) {
    return (
      <section 
        id="how-it-works"
        className="relative py-8 sm:py-10 md:py-12 lg:py-14 bg-[hsl(250,50%,12%)] z-20 min-h-[600px]"
      >
        <div className={`container mx-auto ${SPACING.container}`}>
          <div className="text-center py-20">
            <p className="text-white/60 mb-4">
              {error || 'No steps available. Please add steps in the admin panel.'}
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <motion.section 
      id="how-it-works"
      className="relative py-8 sm:py-10 md:py-12 lg:py-14 bg-[hsl(250,50%,12%)] z-20 min-h-[600px]"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.05 }}
      transition={{ duration: 1.2, ease: [0.6, -0.05, 0.01, 0.99] }}
    >
      <div className={`container mx-auto ${SPACING.container}`}>
        <motion.div 
          className="mb-10 sm:mb-16 md:mb-20 text-left"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <span className="inline-block px-4 py-2 bg-[hsl(270,80%,65%)] text-white text-sm font-semibold rounded-full mb-4">
            {currentLang === 'ge' ? headerCopy.ge.badge : headerCopy.en.badge}
          </span>
          <h2 
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 text-white"
            dangerouslySetInnerHTML={{
              __html: currentLang === 'ge' ? headerCopy.ge.heading : headerCopy.en.heading,
            }}
          />
          <p className="text-base sm:text-lg md:text-xl text-white/60 max-w-3xl leading-relaxed">
            {currentLang === 'ge' ? headerCopy.ge.description : headerCopy.en.description}
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto">
          {steps.map((step, index) => {
            const IconComponent = iconMap[step.icon] || Calendar;
            const stepLabel = step.stepLabel || `Step ${step.stepNumber}`;
            
            return (
              <motion.div 
                key={step._id || step.stepNumber}
                className="relative mb-12 sm:mb-16 last:mb-0"
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50, rotateY: 0 }}
                whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.8, delay: index * 0.2, ease: [0.6, -0.05, 0.01, 0.99] }}
              >
                <div className={`flex flex-col md:flex-row gap-6 sm:gap-8 md:gap-10 items-center ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
                  <motion.div 
                    className="flex-shrink-0 w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full bg-gradient-to-br from-[hsl(270,80%,65%)] via-[hsl(260,85%,60%)] to-[hsl(220,90%,60%)] flex items-center justify-center shadow-[0_20px_60px_-15px_hsl(270,80%,65%/0.6)] relative group"
                    whileHover={{ scale: 1.1, rotate: 360 }}
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                  >
                    <div className="absolute inset-0 rounded-full bg-[hsl(270,80%,65%)]/20 blur-xl group-hover:blur-2xl transition-all duration-500" />
                    <IconComponent className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 text-white relative z-10" />
                    <div className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 w-7 h-7 sm:w-8 sm:h-8 bg-white text-[hsl(270,80%,65%)] rounded-full flex items-center justify-center text-xs sm:text-sm font-bold border-2 border-[hsl(270,80%,65%)]">
                      {step.stepNumber}
                    </div>
                  </motion.div>
                  
                  <motion.div 
                    className={`flex-1 bg-white/5 rounded-xl sm:rounded-2xl p-6 sm:p-8 md:p-10 hover:shadow-[0_20px_60px_-15px_hsl(270,80%,65%/0.4)] transition-all duration-500 group ${index % 2 === 1 ? 'md:text-right' : ''}`}
                    whileHover={{ y: -8, scale: 1.02 }}
                  >
                    <p className="text-[hsl(270,80%,75%)] font-bold text-sm uppercase tracking-wider mb-3 inline-block px-3 py-1 bg-[hsl(270,80%,65%)]/10 rounded-full">
                      {stepLabel}
                    </p>
                    <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 sm:mb-4 text-white group-hover:text-[hsl(270,80%,75%)] transition-colors duration-300">
                      {step.title}
                    </h3>
                    <p className="text-white/60 leading-relaxed text-sm sm:text-base md:text-lg">
                      {step.description}
                    </p>
                    
                    {/* Decorative corner */}
                    <div className={`absolute ${index % 2 === 1 ? 'top-0 left-0 rounded-tl-xl sm:rounded-tl-2xl' : 'bottom-0 right-0 rounded-br-xl sm:rounded-br-2xl'} w-12 h-12 sm:w-16 sm:h-16 transition-all duration-500`} />
                  </motion.div>
                </div>
                

              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.section>
  );
};



