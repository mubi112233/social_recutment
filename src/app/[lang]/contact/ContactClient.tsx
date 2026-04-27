"use client";

import { useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm, useWatch, type SubmitHandler } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { Navbar } from "@/components/Navbar";
import {
  Mail,
  Send,
  CheckCircle2,
  Users,
  Briefcase,
  MessageSquare,
  Loader2,
  Star,
  Clock,
  Shield,
} from "lucide-react";

type FormValues = {
  email: string;
  phone: string;
  companyName: string;
  contactName: string;
  projectType: string;
  projectTypeOther?: string;
  budgetRange: string;
  industry: string;
  timeline: string;
  designRequirements: string;
  otherInfo: string;
};

const translations: Record<string, Record<string, string>> = {
  en: {
    badge: "Get In Touch",
    title: "Let's Transform Your Recruitment",
    subtitle: "Tell us about your hiring challenges and we'll create a custom sourcing strategy. Get a free strategy call within 24 hours.",
    email: "Email Address",
    phone: "Phone Number",
    companyName: "Company Name",
    contactName: "Your Name",
    projectTypeLabel: "Service Needed",
    projectTypePlaceholder: "Select service type",
    projectTypeOtherLabel: "Describe your needs",
    projectTypeOtherPlaceholder: "What Social Recruitment help do you need?",
    budgetRangeLabel: "Monthly Open Positions",
    budgetRangePlaceholder: "e.g. 5-10 positions/month",
    industryLabel: "Industry/Sector",
    timelineLabel: "When do you need help?",
    timelinePlaceholder: "Select timeline",
    designRequirementsLabel: "Social Recruitment Requirements",
    designRequirementsPlaceholder: "Describe your hiring challenges, open positions, platforms used...",
    otherInfoLabel: "Additional Information",
    otherInfoPlaceholder: "Anything else we should know about your recruitment needs...",
    submit: "Request Free Strategy Call",
    submitSending: "Sending...",
    emailRequired: "Email is required",
    emailInvalid: "Enter a valid email",
    phoneRequired: "Phone is required",
    phoneInvalid: "Enter a valid phone number",
    companyNameRequired: "Company name is required",
    contactNameRequired: "Your name is required",
    projectTypeRequired: "Please select service type",
    industryRequired: "Please select industry",
    sideTitle: "Why Choose SocialRecruit?",
    stat1Value: "500+",
    stat1Label: "Companies Served",
    stat2Value: "80%",
    stat2Label: "Time Savings",
    stat3Value: "98%",
    stat3Label: "Satisfaction",
    feature1: "Professional recruiting experts",
    feature2: "Custom sourcing strategies",
    feature3: "Complete security & privacy",
    feature4: "LinkedIn, Instagram & TikTok specialists",
    responseTime: "We respond within 2 hours during business hours",
  },
  ge: {
    badge: "Kontakt aufnehmen",
    title: "Lassen Sie uns Ihr Recruiting transformieren",
    subtitle: "Erzählen Sie uns von Ihren Recruiting-Herausforderungen und wir erstellen eine maßgeschneiderte Sourcing-Lösung. Kostenloser Strategieanruf innerhalb von 24 Stunden.",
    email: "E-Mail-Adresse",
    phone: "Telefonnummer",
    companyName: "Firmenname",
    contactName: "Ihr Name",
    projectTypeLabel: "Service benötigt",
    projectTypePlaceholder: "Servicetyp wählen",
    projectTypeOtherLabel: "Bedürfnisse beschreiben",
    projectTypeOtherPlaceholder: "Welche Social-Media-Recruiting-Hilfe benötigen Sie?",
    budgetRangeLabel: "Monatliche offene Stellen",
    budgetRangePlaceholder: "z.B. 5-10 Stellen/Monat",
    industryLabel: "Branche/Sektor",
    timelineLabel: "Wann benötigen Sie Hilfe?",
    timelinePlaceholder: "Zeitraum wählen",
    designRequirementsLabel: "Social-Media-Recruiting-Anforderungen",
    designRequirementsPlaceholder: "Beschreiben Sie Ihre Recruiting-Herausforderungen, offene Stellen, verwendete Plattformen...",
    otherInfoLabel: "Zusätzliche Informationen",
    otherInfoPlaceholder: "Was sollten wir noch über Ihre Recruiting-Bedürfnisse wissen...",
    submit: "Kostenlosen Strategieanruf anfragen",
    submitSending: "Wird gesendet...",
    emailRequired: "E-Mail ist erforderlich",
    emailInvalid: "Gültige E-Mail eingeben",
    phoneRequired: "Telefon ist erforderlich",
    phoneInvalid: "Gültige Telefonnummer eingeben",
    companyNameRequired: "Firmenname ist erforderlich",
    contactNameRequired: "Ihr Name ist erforderlich",
    projectTypeRequired: "Bitte wählen Sie den Servicetyp",
    industryRequired: "Bitte wählen Sie die Branche",
    sideTitle: "Warum SocialRecruit wählen?",
    stat1Value: "500+",
    stat1Label: "Unternehmen bedient",
    stat2Value: "80%",
    stat2Label: "Zeitersparnis",
    stat3Value: "98%",
    stat3Label: "Zufriedenheit",
    feature1: "Professionelle Recruiting-Experten",
    feature2: "Maßgeschneiderte Sourcing-Strategien",
    feature3: "Komplette Sicherheit & Privatsphäre",
    feature4: "LinkedIn, Instagram & TikTok Experten",
    responseTime: "Wir antworten innerhalb von 2 Stunden während der Geschäftszeiten",
  },
};

const projectTypeOptions = [
  { value: "linkedin", label: "LinkedIn Recruiting" },
  { value: "instagram", label: "Instagram Recruiting" },
  { value: "tiktok", label: "TikTok Recruiting" },
  { value: "employer-branding", label: "Employer Branding" },
  { value: "candidate-sourcing", label: "Candidate Sourcing & Screening" },
  { value: "campaigns", label: "Recruitment Campaign Management" },
  { value: "enterprise", label: "Enterprise Recruitment Solutions" },
  { value: "other", label: "Other" },
];

const industryOptions = [
  { value: "technology", label: "Technology / IT" },
  { value: "finance", label: "Finance / Banking" },
  { value: "healthcare", label: "Healthcare / Pharma" },
  { value: "manufacturing", label: "Manufacturing" },
  { value: "consulting", label: "Consulting" },
  { value: "retail", label: "Retail / E-Commerce" },
  { value: "logistics", label: "Logistics / Transport" },
  { value: "energy", label: "Energy / Utilities" },
  { value: "construction", label: "Construction" },
  { value: "other", label: "Other" },
];

const budgetRangeOptions = [
  { value: "under5", label: "Under 5 positions/month" },
  { value: "5to10", label: "5-10 positions/month" },
  { value: "10to20", label: "10-20 positions/month" },
  { value: "20to50", label: "20-50 positions/month" },
  { value: "50plus", label: "50+ positions/month" },
  { value: "flexible", label: "Not sure / Discuss" },
];

const timelineOptions = [
  { value: "immediate", label: "Immediate / ASAP" },
  { value: "2weeks", label: "Within 2 weeks" },
  { value: "1month", label: "Within 1 month" },
  { value: "2months", label: "Within 2 months" },
  { value: "3months", label: "Within 3 months" },
  { value: "flexible", label: "Flexible" },
];

function FormSection({ icon: Icon, title, children }: { icon: React.ElementType; title: string; children: React.ReactNode }) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 pb-2 border-b border-border/50">
        <div className="w-7 h-7 rounded-lg bg-blue-500/10 flex items-center justify-center flex-shrink-0">
          <Icon className="w-4 h-4 text-blue-400" />
        </div>
        <span className="text-sm font-semibold text-foreground">{title}</span>
      </div>
      {children}
    </div>
  );
}

function FieldError({ message }: { message?: string }) {
  return message ? <p className="text-xs font-medium text-destructive mt-1">{message}</p> : null;
}

export default function ContactClient({ lang }: { lang: string }) {
  const c = translations[lang] ?? translations.en;
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormValues>({
    defaultValues: {
      email: "", phone: "", companyName: "", contactName: "",
      projectType: "", projectTypeOther: "", budgetRange: "",
      industry: "", timeline: "",
      designRequirements: "", otherInfo: "",
    },
    mode: "onBlur",
  });

  const projectTypeValue = useWatch({ control, name: "projectType" });

  const emailPattern = useMemo(() => /[^\s@]+@[^\s@]+\.[^\s@]+/, []);
  const phonePattern = useMemo(() => /^[0-9+\-()\s]{7,20}$/i, []);

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const formData = new FormData();
    formData.append("access_key", process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY ?? "8aff1902-6795-4608-ad79-be6702aa7f3a");
    formData.append("to", "hello@don-sr.com");
    formData.append("subject", "New Social Recruitment Inquiry - SocialRecruit");
    formData.append("companyName", data.companyName);
    formData.append("contactName", data.contactName);
    formData.append("email", data.email);
    formData.append("phone", data.phone);
    formData.append("projectType", data.projectType);
    if (data.projectType === "other" && data.projectTypeOther?.trim())
      formData.append("projectTypeOther", data.projectTypeOther.trim());
    formData.append("budgetRange", data.budgetRange);
    formData.append("industry", data.industry);
    formData.append("timeline", data.timeline);
    if (data.designRequirements.trim()) formData.append("designRequirements", data.designRequirements.trim());
    if (data.otherInfo.trim()) formData.append("otherInfo", data.otherInfo.trim());

    try {
      const res = await fetch("https://api.web3forms.com/submit", { method: "POST", body: formData });
      const json = await res.json();
      if (json.success) {
        toast({ title: "Success!", description: "Your message has been sent." });
        reset();
      } else {
        toast({ title: "Error", description: json.message || "Please try again." });
      }
    } catch {
      toast({ title: "Network error", description: "Please try again later." });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/10 to-background relative overflow-hidden">
      {/* Background blobs */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/4 rounded-full blur-[140px] pointer-events-none" />

      <Navbar />

      <div className="container mx-auto px-4 sm:px-6 lg:px-10 xl:px-12 pt-28 pb-20">
        {/* Page Header */}
        <motion.div
          className="text-left mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block px-4 py-1.5 bg-blue-500/10 text-blue-400 text-xs font-semibold rounded-full mb-4 tracking-wide uppercase">
            {c.badge}
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
            {c.title}
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl leading-relaxed">
            {c.subtitle}
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 items-start">

          {/* Left — Info Panel */}
          <motion.div
            className="lg:col-span-2 lg:sticky lg:top-28 space-y-6"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {/* Stats */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { value: c.stat1Value, label: c.stat1Label, icon: Users },
                { value: c.stat2Value, label: c.stat2Label, icon: Clock },
                { value: c.stat3Value, label: c.stat3Label, icon: Star },
              ].map(({ value, label, icon: Icon }) => (
                <div key={label} className="text-center p-4 bg-card border border-border/50 rounded-xl hover:border-blue-400/40 transition-colors">
                  <Icon className="w-4 h-4 text-blue-400 mx-auto mb-1.5" />
                  <div className="text-xl font-bold text-blue-400">{value}</div>
                  <div className="text-xs text-muted-foreground mt-0.5">{label}</div>
                </div>
              ))}
            </div>

            {/* Features */}
            <div className="p-6 bg-card border border-border/50 rounded-xl space-y-4">
              <h3 className="font-bold text-foreground text-base">{c.sideTitle}</h3>
              <ul className="space-y-3">
                {[c.feature1, c.feature2, c.feature3, c.feature4].map((f) => (
                  <li key={f} className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-muted-foreground">{f}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Response time */}
            <div className="flex items-center gap-3 p-4 bg-blue-500/5 border border-blue-500/20 rounded-xl">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse flex-shrink-0" />
              <p className="text-sm text-muted-foreground">{c.responseTime}</p>
            </div>

            {/* Testimonial */}
            <div className="p-5 bg-card border border-border/50 rounded-xl space-y-3">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 text-blue-400 fill-blue-400" />)}
              </div>
              <p className="text-sm text-muted-foreground italic leading-relaxed">
                &ldquo;SocialRecruit transformed our brand identity completely. The team's creativity and attention to detail exceeded all our expectations.&rdquo;
              </p>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500/30 to-blue-500/10 flex items-center justify-center">
                  <span className="text-blue-400 font-bold text-xs">MK</span>
                </div>
                <div>
                  <div className="text-xs font-semibold text-foreground">Michael Keller</div>
                  <div className="text-xs text-muted-foreground">CEO, TechFlow GmbH</div>
                </div>
              </div>
            </div>

            {/* Security note */}
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Shield className="w-3.5 h-3.5 text-blue-400 flex-shrink-0" />
              <span>Your information is 100% secure and never shared.</span>
            </div>
          </motion.div>

          {/* Right — Form */}
          <motion.div
            className="lg:col-span-3"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="bg-card border border-border/50 rounded-2xl shadow-xl shadow-black/10 overflow-hidden">
              {/* Form header bar */}
              <div className="px-6 sm:px-8 py-5 border-b border-border/50 bg-gradient-to-r from-blue-500/5 to-transparent">
                <h2 className="font-bold text-foreground text-lg">Fill in your details</h2>
                <p className="text-sm text-muted-foreground mt-0.5">All fields marked are required</p>
              </div>

              <form className="px-6 sm:px-8 py-7 space-y-8" onSubmit={handleSubmit(onSubmit)}>

                {/* Contact Info */}
                <FormSection icon={Mail} title="Contact Information">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <Label htmlFor="contactName" className="text-sm">{c.contactName} <span className="text-blue-400">*</span></Label>
                      <Input
                        id="contactName"
                        type="text"
                        placeholder="John Smith"
                        className="border-border/60 focus:border-blue-400/60 transition-colors"
                        {...register("contactName", { required: c.contactNameRequired })}
                      />
                      <FieldError message={errors.contactName?.message} />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="email" className="text-sm">{c.email} <span className="text-blue-400">*</span></Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="you@company.com"
                        className="border-border/60 focus:border-blue-400/60 transition-colors"
                        {...register("email", {
                          required: c.emailRequired,
                          pattern: { value: emailPattern, message: c.emailInvalid },
                        })}
                      />
                      <FieldError message={errors.email?.message} />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <Label htmlFor="companyName" className="text-sm">{c.companyName} <span className="text-blue-400">*</span></Label>
                      <Input
                        id="companyName"
                        type="text"
                        placeholder="Your Company GmbH"
                        className="border-border/60 focus:border-blue-400/60 transition-colors"
                        {...register("companyName", { required: c.companyNameRequired })}
                      />
                      <FieldError message={errors.companyName?.message} />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="phone" className="text-sm">{c.phone} <span className="text-blue-400">*</span></Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="+49 123 456 789"
                        className="border-border/60 focus:border-blue-400/60 transition-colors"
                        {...register("phone", {
                          required: c.phoneRequired,
                          pattern: { value: phonePattern, message: c.phoneInvalid },
                        })}
                      />
                      <FieldError message={errors.phone?.message} />
                    </div>
                  </div>
                </FormSection>

                {/* Project Details */}
                <FormSection icon={Briefcase} title="Project Details">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <Label className="text-sm">{c.projectTypeLabel} <span className="text-blue-400">*</span></Label>
                      <Select onValueChange={(v) => setValue("projectType", v, { shouldValidate: true })}>
                        <SelectTrigger className="border-border/60 focus:border-blue-400/60">
                          <SelectValue placeholder={c.projectTypePlaceholder} />
                        </SelectTrigger>
                        <SelectContent>
                          {projectTypeOptions.map((opt) => (
                            <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <input type="hidden" {...register("projectType", { required: c.projectTypeRequired })} />
                      <FieldError message={errors.projectType?.message} />
                      <AnimatePresence>
                        {projectTypeValue === "other" && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="space-y-1.5 mt-3"
                          >
                            <Label htmlFor="projectTypeOther" className="text-sm">{c.projectTypeOtherLabel}</Label>
                            <Textarea
                              id="projectTypeOther"
                              rows={2}
                              placeholder={c.projectTypeOtherPlaceholder}
                              className="border-border/60 focus:border-blue-400/60 resize-none"
                              {...register("projectTypeOther")}
                            />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                    <div className="space-y-1.5">
                      <Label className="text-sm">{c.budgetRangeLabel}</Label>
                      <Select onValueChange={(v) => setValue("budgetRange", v)}>
                        <SelectTrigger className="border-border/60 focus:border-blue-400/60">
                          <SelectValue placeholder={c.budgetRangePlaceholder} />
                        </SelectTrigger>
                        <SelectContent>
                          {budgetRangeOptions.map((opt) => (
                            <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <input type="hidden" {...register("budgetRange")} />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <Label className="text-sm">{c.industryLabel} <span className="text-blue-400">*</span></Label>
                      <Select onValueChange={(v) => setValue("industry", v, { shouldValidate: true })}>
                        <SelectTrigger className="border-border/60 focus:border-blue-400/60">
                          <SelectValue placeholder={c.industryLabel} />
                        </SelectTrigger>
                        <SelectContent>
                          {industryOptions.map((opt) => (
                            <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <input type="hidden" {...register("industry", { required: c.industryRequired })} />
                      <FieldError message={errors.industry?.message} />
                    </div>
                    <div className="space-y-1.5">
                      <Label className="text-sm">{c.timelineLabel}</Label>
                      <Select onValueChange={(v) => setValue("timeline", v)}>
                        <SelectTrigger className="border-border/60 focus:border-blue-400/60">
                          <SelectValue placeholder={c.timelinePlaceholder} />
                        </SelectTrigger>
                        <SelectContent>
                          {timelineOptions.map((opt) => (
                            <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <input type="hidden" {...register("timeline")} />
                    </div>
                  </div>
                </FormSection>

                {/* Design Requirements */}
                <FormSection icon={Users} title="Design Requirements">
                  <div className="grid grid-cols-1 gap-4">
                    <div className="space-y-1.5">
                      <Label htmlFor="designRequirements" className="text-sm">{c.designRequirementsLabel}</Label>
                      <Textarea
                        id="designRequirements"
                        rows={6}
                        placeholder={c.designRequirementsPlaceholder}
                        className="border-border/60 focus:border-blue-400/60 resize-none"
                        {...register("designRequirements")}
                      />
                    </div>
                  </div>
                </FormSection>

                {/* Additional Notes */}
                <FormSection icon={MessageSquare} title="Additional Information">
                  <div className="space-y-1.5">
                    <Label htmlFor="otherInfo" className="text-sm">{c.otherInfoLabel}</Label>
                    <Textarea
                      id="otherInfo"
                      rows={4}
                      placeholder={c.otherInfoPlaceholder}
                      className="border-border/60 focus:border-blue-400/60 resize-none"
                      {...register("otherInfo")}
                    />
                  </div>
                </FormSection>

                {/* Submit */}
                <div className="pt-2">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto px-10 py-3 bg-gold hover:bg-[hsl(221,54%,45%)] text-white font-bold rounded-xl shadow-lg shadow-gold/25 hover:shadow-gold/40 hover:scale-[1.02] active:scale-[0.99] transition-all duration-200 text-base"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <Loader2 className="w-4 h-4 animate-spin" />
                        {c.submitSending}
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <Send className="w-4 h-4" />
                        {c.submit}
                      </span>
                    )}
                  </Button>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
