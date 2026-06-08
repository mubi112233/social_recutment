"use client";

import { Button } from "@/components/ui/button";
import { motion, useScroll, useTransform, useSpring, useInView } from "framer-motion";
import { useRef, useEffect, useState, useMemo } from "react";
import { ArrowRight, Calendar, Sparkles, Loader2, Users, Clock, Award } from "lucide-react";
import { fetchHero, HeroData } from "@/lib/api";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { siteConfig, localizedPath, type SiteLocale } from "@/lib/site-config";

export const Hero = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.8, 0]);
  const springY = useSpring(y, { stiffness: 100, damping: 30 });

  const [currentLang, setCurrentLang] = useState<string>("en");

  const getLangFromPath = () => {
    if (typeof window === "undefined") return "en";
    const match = window.location.pathname.match(/^\/(en|ge|de)\b/i);
    const raw = match?.[1]?.toLowerCase() || "en";
    return raw === "de" ? "ge" : raw;
  };

  useEffect(() => {
    setCurrentLang(getLangFromPath());
  }, []);

  const isGe = currentLang === "ge";

  // SocialRecruit style fallback data
  const fallbackData: HeroData = useMemo(() => isGe
    ? {
        title: "Social-Media-Recruiting für Top-Talente",
        subtitle: "Finden Sie qualifizierte Kandidaten über LinkedIn, Instagram & TikTok. Wir übernehmen das Sourcing, Screening und Engagement – 80% schneller als traditionelle Methoden.",
        tagline: "Social Media Recruiting",
        image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=1200&h=900&fit=crop&q=80",
        ctaPrimary: "Kostenlosen Strategieanruf buchen",
        urgency: "Verfügbar 24/7",
        stats: { clients: "500+", costSaved: "80%", rating: "98%" },
      }
    : {
        title: "Social Media Recruitment for Top Talent",
        subtitle: "Find qualified candidates through LinkedIn, Instagram & TikTok. We handle sourcing, screening, and engagement – 80% faster than traditional methods.",
        tagline: "Social Media Recruiting",
        image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=1200&h=900&fit=crop&q=80",
        ctaPrimary: "Book Free Strategy Call",
        urgency: "Available 24/7",
        stats: { clients: "500+", costSaved: "80%", rating: "98%" },
      }, [isGe]);

  const [heroData, setHeroData] = useState<HeroData | null>(fallbackData);

  useEffect(() => {
    const fetchHeroData = async () => {
      try {
        setLoading(true);
        const data = await fetchHero(currentLang);
        setHeroData(data || fallbackData);
      } catch (error) {
        console.error("Failed to fetch hero data:", error);
        setHeroData(fallbackData);
      } finally {
        setLoading(false);
      }
    };

    if (currentLang) {
      fetchHeroData();
    }
  }, [currentLang, fallbackData]);

  const title = heroData?.title || fallbackData.title;
  const subtitle = heroData?.subtitle || fallbackData.subtitle;
  // Translate tagline to German if API returns English but user is on German site
  const rawTagline = heroData?.tagline || fallbackData.tagline;
  const tagline = isGe && rawTagline === "Trusted by 500+ Businesses Worldwide"
    ? "Vertraut von 500+ Unternehmen weltweit"
    : rawTagline;
  const rawImage = heroData?.image || fallbackData.image;
  // Handle relative image URLs by prepending API base URL
  const heroImage = rawImage?.startsWith('/') && !rawImage.startsWith('http')
    ? `${process.env.NEXT_PUBLIC_API_BASE || 'https://api.don-va.com'}${rawImage}`
    : rawImage;
  const ctaPrimary = heroData?.ctaPrimary || fallbackData.ctaPrimary;
  const urgency = heroData?.urgency || fallbackData.urgency;
  const stats = heroData?.stats || fallbackData.stats;

  const statsLabels = isGe
    ? { clients: "Unternehmen bedient", costSaved: "Zeitersparnis", rating: "Zufriedenheit" }
    : { clients: "Companies Served", costSaved: "Time Savings", rating: "Satisfaction" };

  return (
    <motion.section
      ref={ref}
      className="relative min-h-screen flex items-center bg-background text-[hsl(222,47%,11%)] dark:text-white overflow-hidden pt-16 sm:pt-20 md:pt-0"
      style={{ opacity }}
    >
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-background/60 backdrop-blur-[2px] text-[hsl(222,47%,11%)]/70 dark:text-white/70 z-20">
          <Loader2 className="w-8 h-8 animate-spin text-primary" aria-hidden />
        </div>
      )}

      {/* Background - match navbar */}
      <motion.div
        className="absolute inset-0 bg-background z-0"
        style={{ y }}
      />

      <div className="container mx-auto px-6 sm:px-8 md:px-12 lg:px-16 py-8 sm:py-12 md:py-16 lg:py-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
            transition={{
              duration: 1,
              delay: 0.2,
              ease: [0.25, 0.46, 0.45, 0.94],
              type: "spring",
              stiffness: 100
            }}
          >
            {/* Badge - Blue Style */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={isInView ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.8, y: 20 }}
              transition={{
                duration: 0.8,
                delay: 0.4,
                type: "spring",
                stiffness: 120,
                damping: 20
              }}
              className="inline-block mb-4 sm:mb-5 md:mb-6"
            >
              <span className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 bg-gradient-to-r from-[hsl(330,81%,60%)] to-[hsl(217,91%,60%)] rounded-full text-white text-xs sm:text-sm font-semibold shadow-lg">
                <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4" aria-hidden="true" />
                {loading ? "Loading..." : tagline}
              </span>
            </motion.div>

            {/* Title - White text, multi-line */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-5 md:mb-6 leading-[1.1] sm:leading-[1.08] md:leading-[1.05]">
              <span className="text-white">Expert </span>
              <span className="bg-gradient-to-r from-[hsl(330,81%,60%)] via-[hsl(270,60%,60%)] to-[hsl(217,91%,60%)] bg-clip-text text-transparent">Social Media Recruitment</span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg md:text-xl text-[hsl(215,20%,40%)] dark:text-white/80 mb-6 sm:mb-8 leading-relaxed max-w-xl">
              {subtitle}
            </p>

            {/* CTA Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="space-y-4"
            >
              <Button
                size="lg"
                onClick={() => router.push(localizedPath((currentLang === "ge" ? "ge" : "en") as SiteLocale, siteConfig.routes.bookMeeting))}
                className="group relative w-full sm:w-auto text-sm sm:text-base md:text-lg px-8 sm:px-10 md:px-12 py-5 sm:py-6 md:py-7 h-auto font-bold bg-gradient-to-r from-[hsl(330,81%,60%)] to-[hsl(217,91%,60%)] text-white hover:opacity-90 transform hover:scale-[1.02] transition-all duration-300 cursor-pointer overflow-hidden rounded-xl shadow-lg shadow-[hsl(330,81%,60%)]/25"
              >
                <span className="relative z-10 flex items-center justify-center gap-2.5">
                  <Calendar className="w-4 h-4 sm:w-5 sm:h-5" aria-hidden="true" />
                  <span className="font-semibold">{ctaPrimary}</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-all duration-300" aria-hidden="true" />
                </span>
              </Button>

              {/* Trust indicator */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.8 }}
                className="flex items-center justify-center sm:justify-start gap-2 text-xs sm:text-sm text-white/60"
              >
                <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[hsl(217,91%,70%)]" aria-hidden="true" />
                <span className="font-medium">{isGe ? "Vertraut von 500+ Unternehmen weltweit" : "Trusted by 500+ companies worldwide"}</span>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Right Image */}
          <motion.div
            className="relative lg:ml-auto mt-8 sm:mt-10 lg:mt-0"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.4, ease: [0.6, -0.05, 0.01, 0.99] }}
            style={{ perspective: 1200 }}
          >
            {/* Floating badge - 500+ Clients */}
            <motion.div
              initial={{ opacity: 0, x: 20, y: -20 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
              className="absolute -top-3 -right-3 sm:-top-4 sm:-right-4 z-20"
            >
              <motion.div
                animate={{
                  y: [-3, 3, -3]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="bg-primary text-primary-foreground px-3 py-2 sm:px-4 sm:py-2.5 rounded-full shadow-lg flex items-center gap-1.5 sm:gap-2"
              >
                <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                  <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                </svg>
                <span className="text-[10px] sm:text-xs font-bold whitespace-nowrap">500+ {isGe ? "Kunden" : "Clients"}</span>
              </motion.div>
            </motion.div>

            {/* Image container */}
            <motion.div
              className="relative rounded-2xl md:rounded-3xl overflow-hidden border border-primary/20 group shadow-2xl shadow-primary/10"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 220, damping: 20 }}
            >
              {/* Image */}
              <div className="relative">
                <Image
                  src={heroImage}
                  alt={isGe ? "Social Recruitment Dashboard" : "Social Recruitment Dashboard"}
                  width={1200}
                  height={900}
                  className="w-full h-auto object-cover"
                  priority
                  sizes="(min-width: 1024px) 50vw, 100vw"
                />
                
                {/* Dark overlay at bottom for stats */}
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent" />
              </div>

              {/* Stats Card overlay - positioned at bottom of image */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1 }}
                className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 md:bottom-8 md:left-8 md:right-8 bg-card/90 backdrop-blur-md border border-primary/20 rounded-2xl p-4 sm:p-5 md:p-6"
              >
                <div className="grid grid-cols-3 gap-4 sm:gap-6">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.2, duration: 0.5 }}
                    className="text-center"
                  >
                    <Users className="w-5 h-5 sm:w-6 sm:h-6 mx-auto mb-2 text-primary" aria-hidden="true" />
                    <div className="text-lg sm:text-xl md:text-2xl font-bold text-[hsl(222,47%,11%)] dark:text-white">{stats.clients}</div>
                    <div className="text-[10px] sm:text-xs text-[hsl(215,20%,40%)] dark:text-white/70 font-medium mt-0.5">{statsLabels.clients}</div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.3, duration: 0.5 }}
                    className="text-center border-x border-border/50"
                  >
                    <Clock className="w-5 h-5 sm:w-6 sm:h-6 mx-auto mb-2 text-primary" aria-hidden="true" />
                    <div className="text-lg sm:text-xl md:text-2xl font-bold text-[hsl(222,47%,11%)] dark:text-white">{stats.costSaved}</div>
                    <div className="text-[10px] sm:text-xs text-[hsl(215,20%,40%)] dark:text-white/70 font-medium mt-0.5">{statsLabels.costSaved}</div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.4, duration: 0.5 }}
                    className="text-center"
                  >
                    <Award className="w-5 h-5 sm:w-6 sm:h-6 mx-auto mb-2 text-primary" aria-hidden="true" />
                    <div className="text-lg sm:text-xl md:text-2xl font-bold text-[hsl(222,47%,11%)] dark:text-white">{stats.rating}</div>
                    <div className="text-[10px] sm:text-xs text-[hsl(215,20%,40%)] dark:text-white/70 font-medium mt-0.5">{statsLabels.rating}</div>
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>

            {/* Animated decorative elements - Blue theme */}
            <motion.div
              className="absolute -top-4 -right-4 sm:-top-6 sm:-right-6 w-20 h-20 sm:w-28 sm:h-28 bg-primary/20 rounded-full blur-3xl"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.2, 0.4, 0.2]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              aria-hidden="true"
            />
            <motion.div
              className="absolute -bottom-4 -left-4 sm:-bottom-6 sm:-left-6 w-24 h-24 sm:w-32 sm:h-32 bg-primary/15 rounded-full blur-3xl"
              animate={{
                scale: [1, 1.4, 1],
                opacity: [0.1, 0.25, 0.1]
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5
              }}
              aria-hidden="true"
            />
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};


