"use client";

import { Services } from "@/components/Services";
import { Testimonials } from "@/components/Testimonials";
import { HowItWorks } from "@/components/HowItWorks";
import { Pricing } from "@/components/Pricing";
import { ToolsIntegration } from "@/components/ToolsIntegration";
import { CaseStudies } from "@/components/CaseStudies.client";
import { Blog } from "@/components/Blog";
import { FAQInteractive } from "@/components/FAQInteractive.client";
import { SPACING } from "@/lib/constants";

export function HomeBelowFold({ lang }: { lang: string }) {
  return (
    <div className={SPACING.container}>
      <HowItWorks />
      <Services />
      <Pricing />
      <ToolsIntegration />
      <Testimonials />
      <Blog />
      <CaseStudies lang={lang} />
      <FAQInteractive lang={lang} />
    </div>
  );
}
