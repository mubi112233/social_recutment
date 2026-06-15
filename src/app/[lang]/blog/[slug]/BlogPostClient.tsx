"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { Calendar, Clock, ArrowLeft, Share2, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { getCopy } from "@/lib/copy";
import { SPACING } from "@/lib/constants";
import { Breadcrumb } from "@/components/Breadcrumb";
import { localizedPath, siteConfig, type SiteLocale } from "@/lib/site-config";
import { fetchBlog } from "@/lib/api";

interface BlogPost {
  blogId: number;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  image: string;
}

const slugify = (title: string) =>
  title.toLowerCase().replace(/[^\w\s-]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-").trim();

function extractPosts(data: any): BlogPost[] {
  const raw = data?.blogs;
  if (!Array.isArray(raw)) return [];
  if (raw[0]?.blogId !== undefined) return raw;
  const container = raw[0];
  return Object.keys(container || {})
    .filter((k) => k.startsWith("blog_"))
    .map((k) => container[k])
    .filter(Boolean);
}

function findPost(posts: BlogPost[], slug: string): BlogPost | null {
  const id = Number(slug.split("-").pop());
  if (!isNaN(id)) {
    const byId = posts.find((p) => p.blogId === id);
    if (byId) return byId;
  }
  return posts.find((p) => p.title && slug.startsWith(slugify(p.title))) ?? null;
}

export default function BlogPostClient({ lang }: { lang: string }) {
  const params = useParams();
  const slug = Array.isArray(params.slug) ? params.slug[0] : (params.slug as string);
  const router = useRouter();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const copy = getCopy(lang, "blog");
  const isGe = lang === "ge";

  useEffect(() => {
    fetchBlog(lang)
      .then((data) => {
        const posts = extractPosts(data);
        setPost(findPost(posts, slug));
      })
      .catch(() => setPost(null))
      .finally(() => setLoading(false));
  }, [lang, slug]);

  const handleShare = async () => {
    const url = typeof window !== "undefined" ? window.location.href : "";
    if (navigator.share) {
      try { await navigator.share({ title: post?.title, text: post?.excerpt, url }); } catch {}
    } else {
      try {
        await navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch {
        // clipboard API unavailable (HTTP, old browser) — silent fail
      }
    }
  };

  if (loading) {
    return (
      <div className={`min-h-screen ${SPACING.sideMargin} bg-background flex items-center justify-center`}>
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!post) {
    return (
      <div className={`min-h-screen ${SPACING.sideMargin} bg-background flex items-center justify-center`}>
        <div className="text-center">
          <p className="text-muted-foreground mb-4">{isGe ? "Artikel nicht gefunden." : "Post not found."}</p>
          <button onClick={() => router.push(`/${lang}/blog`)} className="text-primary underline">
            {isGe ? "Zurück zum Blog" : "Back to Blog"}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${SPACING.sideMargin} bg-background`}>
      <motion.article
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto py-6 sm:py-8 md:py-12 px-4 sm:px-6 lg:px-8"
      >
        <Breadcrumb items={[
          { label: isGe ? "Startseite" : "Home", href: `/${lang}` },
          { label: "Blog", href: `/${lang}/blog` },
          { label: post.title, href: `/${lang}/blog/${slug}` },
        ]} />

        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          onClick={() => router.back()}
          className="inline-flex items-center gap-2 mb-6 sm:mb-8 text-sm text-muted-foreground hover:text-blue-400 transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span className="hidden sm:inline">{isGe ? "Zurück zum Blog" : "Back to Blog"}</span>
          <span className="sm:hidden">{isGe ? "Zurück" : "Back"}</span>
        </motion.button>

        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mb-8 sm:mb-10"
        >
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
            <span className="px-3 sm:px-4 py-1 sm:py-1.5 bg-blue-500/10 text-blue-400 text-xs sm:text-sm font-bold rounded-full">
              {post.category}
            </span>
            <div className="flex items-center gap-2 sm:gap-4 text-xs sm:text-sm text-muted-foreground">
              <div className="flex items-center gap-1 sm:gap-1.5">
                <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
                <time dateTime={post.date}>{post.date}</time>
              </div>
              <div className="flex items-center gap-1 sm:gap-1.5">
                <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
                <span>{post.readTime}</span>
              </div>
            </div>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-foreground mb-4 sm:mb-6 leading-tight">
            {post.title}
          </h1>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-400 font-bold text-base sm:text-lg flex-shrink-0">
                {post.author.charAt(0)}
              </div>
              <div>
                <div className="font-semibold text-foreground text-sm sm:text-base">{post.author}</div>
                <div className="text-xs sm:text-sm text-muted-foreground">{copy.by}</div>
              </div>
            </div>
            <button
              onClick={handleShare}
              className="relative p-2.5 sm:p-3 rounded-full bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 transition-colors self-start sm:self-auto"
              aria-label="Share"
            >
              <Share2 className="w-4 h-4 sm:w-5 sm:h-5" />
              {copied && (
                <span className="absolute -top-10 right-0 bg-foreground text-background text-xs px-2 py-1 rounded whitespace-nowrap">
                  {isGe ? "Link kopiert!" : "Link copied!"}
                </span>
              )}
            </button>
          </div>
        </motion.header>

        {post.image && (
          <motion.figure
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="mb-8 sm:mb-12"
          >
            <div className="relative w-full h-48 sm:h-64 md:h-80 lg:h-96 xl:h-[500px] rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl">
              <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
            </div>
          </motion.figure>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="prose prose-base sm:prose-lg max-w-none mb-10 sm:mb-14
            prose-headings:font-bold prose-p:text-foreground/90 prose-p:leading-relaxed prose-p:mb-5
            prose-strong:text-blue-500 prose-h2:text-blue-500 prose-h3:text-blue-500"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {post.category && (
          <div className="mt-8 sm:mt-10 pb-6 sm:pb-8 border-b border-border/50">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">
              {isGe ? "Kategorie" : "Category"}
            </h3>
            <span className="px-4 py-2 bg-blue-500/10 text-blue-400 text-sm font-medium rounded-lg">{post.category}</span>
          </div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-8 sm:mt-10 p-6 sm:p-8 bg-gradient-to-br from-blue-500/10 via-blue-500/5 to-transparent border-2 border-blue-500/30 rounded-2xl text-center"
        >
          <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-3">
            {isGe ? "Bereit, Ihre Ergebnisse zu verbessern?" : "Ready to Improve Your Results?"}
          </h3>
          <p className="text-sm sm:text-base text-muted-foreground mb-6 max-w-2xl mx-auto">
            {isGe ? "Entdecken Sie, wie Social-Media-Recruiting Ihre Einstellung beschleunigen kann." : "Discover how social media recruiting can transform your hiring."}
          </p>
          <button
            onClick={() => router.push(localizedPath((lang === "ge" ? "ge" : "en") as SiteLocale, siteConfig.routes.bookMeeting))}
            className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-blue-500 text-white text-sm sm:text-base font-bold rounded-xl hover:bg-blue-500/90 transition-all hover:shadow-xl hover:scale-105"
          >
            {isGe ? "Jetzt starten" : "Get Started"}
          </button>
        </motion.div>

        <footer className="mt-12 sm:mt-16 pt-6 sm:pt-8 border-t border-border/50 text-center">
          <button
            onClick={() => router.push(`/${lang}/blog`)}
            className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-card border border-border/50 text-foreground text-sm sm:text-base font-semibold rounded-xl hover:border-blue-400/50 transition-all group"
          >
            <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 group-hover:-translate-x-1 transition-transform" />
            <span>{isGe ? "Alle Blog-Artikel ansehen" : "View All Blog Posts"}</span>
          </button>
        </footer>
      </motion.article>
    </div>
  );
}
