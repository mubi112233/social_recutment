export interface CaseStudy {
  id: number;
  title: string;
  company: string;
  industry: string;
  challenge: string;
  solution: string;
  results: {
    metric: string;
    value: string;
    description: string;
  }[];
  testimonial: string;
  testimonialAuthor: string;
  testimonialRole: string;
  image: string;
  stats: {
    mainResult: string;
    timeframe: string;
    seoFocus: string;
  };
  description?: string;
  category?: string;
  tags?: string[];
  content?: string;
  link?: string;
}

export const caseStudies: CaseStudy[] = [
  {
    id: 1,
    title: "Scaling DTC with PMAX + UGC on Meta",
    company: "Luxe Beauty Co.",
    industry: "DTC Beauty",
    challenge:
      "Rising CPAs on Meta and stagnating Google Search. Needed fresh creative and broader reach without tanking ROAS.",
    solution:
      "UGC creative testing on Meta (hooks/angles) + PMAX asset groups by theme. Weekly optimization with budget guardrails and GA4 validation.",
    results: [
      { metric: "ROAS", value: "3.4x", description: "Blended across Meta/Google" },
      { metric: "CPA", value: "-29%", description: "Cost per purchase" },
      { metric: "Spend", value: "+65%", description: "Scaled budget profitably" },
      { metric: "Time", value: "8 wks", description: "From audit to scale" },
    ],
    testimonial:
      "The weekly cadence and creative testing unlocked scale without sacrificing ROAS.",
    testimonialAuthor: "Emma Rodriguez",
    testimonialRole: "Founder, Luxe Beauty Co.",
    image:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=500&fit=crop",
    stats: { mainResult: "3.4x ROAS", timeframe: "8 weeks", seoFocus: "Meta + PMAX" },
    description: "Scaled DTC brand through strategic Meta campaigns with UGC content and PMAX optimization.",
    category: "E-Commerce",
    tags: ["PMAX", "UGC", "Meta", "DTC"],
    content: "Detailed case study about scaling a DTC beauty brand through Meta and Google campaigns."
  },
  {
    id: 2,
    title: "B2B Pipeline: LinkedIn + Search Capture",
    company: "Peak Performance",
    industry: "B2B Services",
    challenge:
      "Expensive leads on LinkedIn and poor MQL quality from forms. Needed pipeline growth at lower blended CAC.",
    solution:
      "ABM audience layers on LinkedIn with thought‑leadership + high‑intent Google Search. CRO tweaks and attribution clean‑up in GA4/GTM.",
    results: [
      { metric: "CAC", value: "-32%", description: "Blended across channels" },
      { metric: "SQLs", value: "+58%", description: "Sales‑qualified leads" },
      { metric: "Conv.", value: "+41%", description: "Lead to opp" },
      { metric: "Time", value: "6 wks", description: "From launch to impact" },
    ],
    testimonial:
      "Quality leads finally. The ABM + Search combo changed our pipeline overnight.",
    testimonialAuthor: "David Chen",
    testimonialRole: "CEO, Peak Performance",
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=500&fit=crop",
    stats: {
      mainResult: "-32% CAC",
      timeframe: "6 weeks",
      seoFocus: "LinkedIn + Search",
    },
    description: "B2B lead generation transformation through LinkedIn ABM and Google Search campaigns.",
    category: "B2B Lead Gen",
    tags: ["LinkedIn", "ABM", "Google Search", "B2B"],
    content: "Detailed case study about B2B pipeline growth through LinkedIn and Google Search."
  },
  {
    id: 3,
    title: "Unlocking Incremental Lift with TikTok + Snapchat",
    company: "CloudFlow",
    industry: "SaaS",
    challenge:
      "Search was tapped out; needed incremental volume. Unsure how to measure lift across new social channels.",
    solution:
      "TikTok + Snapchat creatives with weekly iterations, event mapping, and platform/GA4 lift studies. Budget rules and holdout tests.",
    results: [
      { metric: "Lift", value: "+22%", description: "Incremental signups" },
      { metric: "CPA", value: "-18%", description: "After optimization" },
      { metric: "Output", value: "3x", description: "Creative iterations" },
      { metric: "Time", value: "5 wks", description: "From test to scale" },
    ],
    testimonial:
      "We found real incremental volume instead of cannibalizing Search.",
    testimonialAuthor: "Marco Schneider",
    testimonialRole: "VP Marketing, CloudFlow",
    image:
      "https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=500&fit=crop",
    stats: {
      mainResult: "+22% Lift",
      timeframe: "5 weeks",
      seoFocus: "TikTok + Snapchat",
    },
    description: "SaaS growth through emerging platforms with incrementality testing and creative optimization.",
    category: "SaaS Growth",
    tags: ["TikTok", "Snapchat", "SaaS", "Incrementality"],
    content: "Detailed case study about SaaS growth through TikTok and Snapchat advertising."
  }
];


