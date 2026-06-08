"use client";

import { motion, useScroll, useTransform, useSpring, useInView } from "framer-motion";
import { Award, Loader2, Sparkles } from "lucide-react";
import { useRef } from "react";
import { useState, useEffect, useMemo } from "react";
import * as LucideIcons from "lucide-react";
import { fetchWhyChooseUs } from "@/lib/api";
import { SPACING } from "@/lib/constants";
import { usePathname } from "next/navigation";

interface WhyChooseUsItem {
  icon: string;
  title: string;
  description: string;
}

interface WhyChooseUsData {
  badge: string;
  heading: string;
  description: string;
  items: WhyChooseUsItem[];
}

// Icon mapping helper
const getIconComponent = (iconName: string) => {
  const IconComponent = (LucideIcons as any)[iconName];
  return IconComponent || Award; // Fallback to Award if icon not found
};

export const WhyChooseUs = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const springY = useSpring(y, { stiffness: 100, damping: 30 });
  
  const [whyChooseUsData, setWhyChooseUsData] = useState<WhyChooseUsData | null>(null);
  const [loading, setLoading] = useState(true);

  const pathname = usePathname() ?? "/";
  const currentLang = pathname.startsWith('/ge') || pathname.startsWith('/de') ? 'ge' : 'en';

  const isGe = currentLang === 'ge';

  const fallbackData: WhyChooseUsData = useMemo(() => isGe ? {
    badge: "Warum wir",
    heading: "Was uns <span class=\"text-[hsl(45,100%,60%)]\">auszeichnet</span>",
    description: "Professionelles Social-Media-Recruiting, intelligente Automatisierung und 80% Zeitersparnis garantiert.",
    items: [
      { icon: "Mail", title: "Plattform-Expertise", description: "Wir beherrschen alle gängigen Social-Media-Plattformen und finden Kandidaten professionell." },
      { icon: "Shield", title: "Sicherheitsgarantie", description: "DSGVO-konform, sichere Datenverarbeitung und vertrauliche Kandidatenbeziehungen." },
      { icon: "Zap", title: "Schneller Start", description: "Setup innerhalb von 24-72 Stunden. Unser optimierter Prozess sorgt für sofortige Entlastung." },
      { icon: "HeartHandshake", title: "Persönlicher Support", description: "Unser Social-Media-Recruiting-Team ist immer verfügbar, um Ihre Anliegen zu klären." },
      { icon: "TrendingUp", title: "80% Zeitersparnis", description: "Wir reduzieren Ihre Recruiting-Zeit von Wochen auf Tage pro Position." },
      { icon: "Award", title: "Bewährte Erfolgsbilanz", description: "Von 500+ Profis vertraut mit einer Kundenzufriedenheitsrate von 98%." },
    ]
  } : {
    badge: "Why Choose Us",
    heading: "What Makes Us <span class=\"text-[hsl(45,100%,60%)]\">Different</span>",
    description: "Professional Social Recruitment, intelligent automation, and 80% time savings guaranteed.",
    items: [
      { icon: "Mail", title: "Platform Expertise", description: "We master all major social media platforms and source candidates professionally." },
      { icon: "Shield", title: "Security Guarantee", description: "GDPR-compliant, secure data processing, and confidential candidate relationships." },
      { icon: "Zap", title: "Fast Start", description: "Setup within 24-72 hours. Our streamlined process ensures immediate relief." },
      { icon: "HeartHandshake", title: "Personal Support", description: "Our Social Recruitment team is always available to address your concerns." },
      { icon: "TrendingUp", title: "80% Time Savings", description: "We reduce your recruiting time from weeks to days per position." },
      { icon: "Award", title: "Proven Track Record", description: "Trusted by 500+ professionals with a 98% client satisfaction rate." },
    ]
  }, [isGe]);

  // Fetch Why Choose Us data from API
  useEffect(() => {
    const fetchWhyChooseUsData = async () => {
      try {
        setLoading(true);
        const data = await fetchWhyChooseUs(currentLang);
        setWhyChooseUsData(data || fallbackData);
      } catch {
        setWhyChooseUsData(fallbackData);
      } finally {
        setLoading(false);
      }
    };
    fetchWhyChooseUsData();
  }, [currentLang, fallbackData]);

  if (loading) {
    return (
      <section className="py-8 sm:py-10 md:py-14 lg:py-16 bg-[#3D2817] text-white z-30 overflow-hidden min-h-[500px]">
        <div className={`container mx-auto ${SPACING.container}`}>

          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-[hsl(45,100%,55%)]" />
          </div>
        </div>
      </section>
    );
  }

  if (!whyChooseUsData) return null;

  const badge = whyChooseUsData.badge;
  const heading = whyChooseUsData.heading;
  const description = whyChooseUsData.description;
  const items = whyChooseUsData.items;

  return (
    <motion.section 
      ref={ref}
      className="relative py-8 sm:py-10 md:py-12 lg:py-14 overflow-hidden z-40"
      style={{ 
        background: 'linear-gradient(135deg, hsl(250 50% 12%) 0%, hsl(260 45% 18%) 50%, hsl(250 50% 15%) 100%)'
      }}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 1.2, ease: [0.6, -0.05, 0.01, 0.99] }}
    >
      {/* Animated gradient orbs - Hero style */}
      <motion.div
        className="absolute top-0 right-0 w-[500px] h-[500px] bg-[hsl(270,80%,65%)]/20 rounded-full blur-[120px] z-0"
        style={{ y: springY }}
        animate={{ x: [0, 50, 0], y: [0, -30, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden
      />
      <motion.div
        className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[hsl(260,85%,60%)]/15 rounded-full blur-[100px] z-0"
        style={{ y: springY }}
        animate={{ x: [0, -40, 0], y: [0, 40, 0], scale: [1, 1.15, 1] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        aria-hidden
      />
      <motion.div
        className="absolute top-1/2 left-1/3 w-[300px] h-[300px] bg-[hsl(270,80%,75%)]/10 rounded-full blur-[80px] z-0"
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        aria-hidden
      />

      <div className={`container mx-auto ${SPACING.container} relative z-10`}>
        <motion.div 
          className="mb-10 sm:mb-12 md:mb-16 lg:mb-20 text-left"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="inline-flex items-center gap-2 mb-4 sm:mb-5 md:mb-6 px-4 sm:px-5 py-2 sm:py-2.5 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-xs sm:text-sm font-medium text-white/90 hover:bg-white/15 transition-all duration-300 cursor-default"
          >
            <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[hsl(270,80%,75%)]" />
            <span>{badge}</span>
          </motion.div>
          <h2 
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-5 md:mb-6 text-white px-2"
            dangerouslySetInnerHTML={{ __html: heading }}
          />
          <p className="text-base sm:text-lg md:text-xl text-white/60 max-w-3xl leading-relaxed px-2">
            {description}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 md:gap-8 max-w-7xl mx-auto">
          {items.map((item, index) => {
            const IconComponent = getIconComponent(item.icon);
            return (
            <motion.div 
              key={index}
              className="relative bg-white/5 border border-white/10 rounded-xl sm:rounded-2xl p-6 sm:p-8 md:p-10 hover:border-[hsl(270,80%,65%)]/50 hover:shadow-[0_25px_80px_-20px_hsl(270,80%,65%/0.4)] transition-all duration-700 group overflow-hidden"
              initial={{ opacity: 0, y: 100, scale: 0.8 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, delay: index * 0.15, ease: [0.6, -0.05, 0.01, 0.99] }}
              whileHover={{ y: -8, scale: 1.03 }}
            >
              {/* Animated gradient background */}
              <div className="absolute inset-0 bg-gradient-to-br from-[hsl(270,80%,65%)]/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              
              <div className="relative z-10">
                <motion.div 
                  className="mb-4 sm:mb-5 md:mb-6 inline-flex p-3 sm:p-4 md:p-5 rounded-lg sm:rounded-xl bg-[hsl(270,80%,65%)]/20 text-[hsl(270,80%,75%)] group-hover:bg-[hsl(270,80%,65%)] group-hover:text-white group-hover:scale-110 transition-all duration-500 shadow-[0_10px_30px_-10px_hsl(270,80%,65%/0.4)]"
                  whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                  transition={{ duration: 0.5 }}
                >
                  <IconComponent className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10" />
                </motion.div>
                <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-white group-hover:text-[hsl(270,80%,75%)] transition-colors duration-300">
                  {item.title}
                </h3>
                <p className="text-sm sm:text-base text-white/60 leading-relaxed">
                  {item.description}
                </p>
              </div>
              
              {/* Corner decoration */}
              <div className="absolute bottom-0 right-0 w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-br-xl sm:rounded-br-2xl transition-all duration-700" />
            </motion.div>
            );
          })}
        </div>
      </div>
    </motion.section>
  );
};


