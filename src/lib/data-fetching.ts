/**
 * Server-side data fetching for home page sections
 * Fetches all data in parallel for optimal performance
 */

import { fetchAPI, API_ENDPOINTS, normalizeLanguage } from './api';
import type { Service, FAQItem } from './api';

export interface CaseStudyCard {
  id: number;
  title: string;
  company: string;
  industry: string;
  challenge: string;
  image: string;
  stats: { costSaved: string; timeframe: string; vaCount: string };
}

export interface FinalCtaSectionPayload {
  badge?: string;
  headlineLine1?: string;
  headlineLine2?: string;
  subheading?: string;
  benefits?: string[];
  stats?: { activeClients: string; avgRoi: string; satisfaction: string; fastStart: string };
  trust?: {
    consultationTime: string;
    consultationLabel: string;
    responseTime: string;
    responseLabel: string;
    noCommitment: string;
    noCommitmentLabel: string;
    footer: string;
  };
  ctas?: { primaryLabel: string; primaryHref: string; secondaryLabel: string; secondaryHref: string };
  whatsAppNumber?: string;
}

// Types for our data structures
export interface HomePageData {
  services: Service[];
  testimonials: Testimonial[];
  pricing: any;
  faq: any;
  caseStudies: any;
  blog: any;
}

// Testimonial interface
export interface Testimonial {
  _id?: string;
  content: string;
  name: string;
  role: string;
  company: string;
  order?: number;
}

/**
 * Fetch all home page data in parallel
 * This should be called from server components
 */
export async function fetchHomePageData(lang: string): Promise<HomePageData> {
  const normalizedLang = normalizeLanguage(lang);
  
  try {
    // Fetch all data in parallel for better performance
    const results = await Promise.allSettled([
      fetchAPI(`${API_ENDPOINTS.SERVICES}?lang=${normalizedLang}`),
      fetchAPI(`${API_ENDPOINTS.TESTIMONIALS}?lang=${normalizedLang}`),
      fetchAPI(`${API_ENDPOINTS.PRICING}?lang=${normalizedLang}`),
      fetchAPI(`${API_ENDPOINTS.FAQ}?lang=${normalizedLang}`),
      fetchAPI(`${API_ENDPOINTS.CASE_STUDIES}?lang=${normalizedLang}`),
      fetchAPI(`${API_ENDPOINTS.BLOGS}?lang=${normalizedLang}`)
    ]);

    const safeJson = async (result: PromiseSettledResult<Response>) => {
      if (result.status === 'rejected') return null;
      if (!result.value.ok) return null;
      try { return await result.value.json(); } catch { return null; }
    };

    const [
      servicesData,
      testimonialsData,
      pricingData,
      faqData,
      caseStudiesData,
      blogData
    ] = await Promise.all(results.map(safeJson));

    return {
      services: servicesData?.services || [],
      testimonials: testimonialsData?.testimonials || [],
      pricing: pricingData || {},
      faq: faqData || {},
      caseStudies: caseStudiesData || {},
      blog: blogData || {}
    };
  } catch (error) {
    console.error('Error fetching home page data:', error);
    // Return empty data on error to prevent crashes
    return {
      services: [],
      testimonials: [],
      pricing: {},
      faq: {},
      caseStudies: {},
      blog: {}
    };
  }
}

/**
 * Individual fetch functions for specific sections
 * Use these when you only need specific data
 */
export async function fetchServicesData(lang: string): Promise<Service[]> {
  try {
    const normalizedLang = normalizeLanguage(lang);
    const response = await fetchAPI(`${API_ENDPOINTS.SERVICES}?lang=${normalizedLang}`);
    if (!response.ok) return [];
    try {
      const data = await response.json();
      return data?.services || [];
    } catch {
      return [];
    }
  } catch (error) {
    console.error('Error fetching services:', error);
    return [];
  }
}

export async function fetchTestimonialsData(lang: string): Promise<Testimonial[]> {
  try {
    const normalizedLang = normalizeLanguage(lang);
    const response = await fetchAPI(`${API_ENDPOINTS.TESTIMONIALS}?lang=${normalizedLang}`);
    if (!response.ok) return [];
    try {
      const data = await response.json();
      return data?.testimonials || [];
    } catch {
      return [];
    }
  } catch (error) {
    console.error('Error fetching testimonials:', error);
    return [];
  }
}

export async function fetchFAQData(lang: string): Promise<FAQItem[]> {
  try {
    const normalizedLang = normalizeLanguage(lang);
    const response = await fetchAPI(`${API_ENDPOINTS.FAQ}?lang=${normalizedLang}`);
    if (!response.ok) return [];
    try {
      const data = await response.json();
      const list = Array.isArray(data?.faqs) ? (data.faqs as FAQItem[]) : [];
      return [...list].sort((a, b) => a.order - b.order);
    } catch {
      return [];
    }
  } catch (error) {
    console.error('Error fetching FAQs:', error);
    return [];
  }
}

// Fallback case studies data
const fallbackCaseStudies: CaseStudyCard[] = [
  {
    id: 1,
    title: "Fortune 500 LinkedIn Recruiting Transformation",
    company: "TechCorp Industries",
    industry: "Executive Management",
    challenge: "Complete social media recruiting overhaul for a C-suite executive struggling to find qualified candidates, achieving daily qualified pipeline in 5 days.",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&h=600&fit=crop&q=80",
    stats: { costSaved: "75%", timeframe: "5 days", vaCount: "2 VAs" }
  },
  {
    id: 2,
    title: "Marketing Team Social Recruiting Success",
    company: "Berlin Marketing Agency",
    industry: "Marketing",
    challenge: "Social media recruiting automation for a Berlin marketing agency, streamlining candidate sourcing and campaign management across LinkedIn and Instagram.",
    image: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=600&fit=crop&q=80",
    stats: { costSaved: "+200%", timeframe: "2 weeks", vaCount: "3 VAs" }
  },
  {
    id: 3,
    title: "Startup Founder recruitment efficiency",
    company: "Munich Tech Startup",
    industry: "Technology",
    challenge: "Social media recruiting system for a busy Munich tech founder, organizing candidate pipeline and priority outreach across platforms.",
    image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&h=600&fit=crop&q=80",
    stats: { costSaved: "65%", timeframe: "3 days", vaCount: "1 VA" }
  }
];

export async function fetchCaseStudiesCardsData(lang: string): Promise<CaseStudyCard[]> {
  try {
    const normalizedLang = normalizeLanguage(lang);
    let response: Response;
    try {
      response = await fetchAPI(`${API_ENDPOINTS.CASE_STUDIES}?lang=${normalizedLang}`);
    } catch {
      return fallbackCaseStudies;
    }
    if (!response.ok) return fallbackCaseStudies;
    const data = await response.json();
    
    // Handle different API response structures
    const caseStudiesArray = data?.caseStudies || data?.data || data?.items || data;
    
    if (!caseStudiesArray) {
      return fallbackCaseStudies;
    }
    
    if (!Array.isArray(caseStudiesArray)) {
      return fallbackCaseStudies;
    }
    
    if (caseStudiesArray.length === 0) {
      return fallbackCaseStudies;
    }
    
    return caseStudiesArray
      .map((cs: Record<string, unknown>) => {
        // API returns: _id, lang, caseStudyId, content, name, role, company, rating, order
        const content = (cs.content as string) || "";
        const company = (cs.company as string) || "Client";
        const name = (cs.name as string) || "";
        const role = (cs.role as string) || "";
        
        // Extract metric from content (e.g., "17%", "99%", "41%", "12 points")
        const metricMatch = content.match(/(\d+%?|\d+\s*points?)/);
        const costSaved = metricMatch ? metricMatch[1] : "75%";
        
        // Generate title from role + company
        const title = role && company 
          ? `${role} at ${company}`
          : `${company} Success Story`;
        
        // Get unique image based on caseStudyId
        const caseId = (cs.caseStudyId as number) ?? (cs.order as number) ?? 0;
        const images = [
          "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&h=600&fit=crop&q=80",
          "https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=600&fit=crop&q=80",
          "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&h=600&fit=crop&q=80",
          "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&h=600&fit=crop&q=80",
          "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=600&fit=crop&q=80",
          "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop&q=80",
        ];
        
        return {
          id: caseId,
          title: title,
          company: company,
          industry: "Customer Support", // Based on the roles/content
          challenge: content,
          image: images[caseId % images.length],
          stats: {
            costSaved: costSaved,
            timeframe: "2 weeks",
            vaCount: "2 VAs",
          },
        };
      })
      .sort((a: CaseStudyCard, b: CaseStudyCard) => a.id - b.id);
  } catch (error) {
    console.error('Error fetching case studies:', error);
    // Return fallback data on error
    return fallbackCaseStudies;
  }
}

export async function fetchFinalCtaSectionData(
  lang: string
): Promise<FinalCtaSectionPayload | null> {
  try {
    const normalizedLang = normalizeLanguage(lang);
    let response: Response;
    try {
      response = await fetchAPI(`${API_ENDPOINTS.FINAL_CTA}?lang=${normalizedLang}`);
    } catch {
      return null;
    }
    if (!response.ok) return null;
    const data = await response.json();
    const section = data?.finalCta;
    return section && typeof section === 'object' ? (section as FinalCtaSectionPayload) : null;
  } catch (error) {
    console.warn('Error fetching final CTA:', error);
    return null;
  }
}


