"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, Clock, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Navbar, Footer } from "@/components/layout";
import { useLocale } from "@/providers/providers";
import { getLocalizedContent } from "@/lib/data";
import { PageTransition } from "@/components/motion";
import type { BlogPostWithLocale } from "@/lib/supabase";

interface BlogPostClientProps {
  post: BlogPostWithLocale | null;
}

export function BlogPostClient({ post }: BlogPostClientProps) {
  const { locale, t } = useLocale();

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString(locale === "th" ? "th-TH" : "en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Estimate read time based on content length
  const getReadTime = (p: BlogPostWithLocale) => {
    const content = locale === "th" ? p.content.th : p.content.en;
    const words = content.split(/\s+/).length;
    return Math.max(1, Math.ceil(words / 200));
  };

  if (!post) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen pt-24 pb-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-2xl font-bold mb-4">
              {locale === "th" ? "ไม่พบบทความ" : "Post not found"}
            </h1>
            <Button asChild>
              <Link href="/blog">
                <ArrowLeft className="h-4 w-4 mr-2" />
                {locale === "th" ? "กลับไปหน้าบทความ" : "Back to Blog"}
              </Link>
            </Button>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-24 pb-16">
        <article className="container mx-auto px-4 max-w-3xl">
          <PageTransition>
            {/* Back button */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="mb-8"
            >
              <Button asChild variant="ghost" size="sm">
                <Link href="/blog">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  {locale === "th" ? "กลับ" : "Back"}
                </Link>
              </Button>
            </motion.div>

            {/* Header */}
            <header className="mb-8">
              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {post.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>

              {/* Title */}
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                {getLocalizedContent(post.title, locale)}
              </h1>

              {/* Meta */}
              <div className="flex flex-wrap items-center gap-4 text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <Calendar className="h-4 w-4" />
                  {t.blog.publishedAt} {formatDate(post.publishedAt)}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="h-4 w-4" />
                  {getReadTime(post)} {t.blog.readTime}
                </span>
              </div>
            </header>

            <Separator className="mb-8" />

            {/* Cover image - supports any domain */}
            <div className="relative h-64 md:h-80 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 mb-8 overflow-hidden">
              {post.coverImage ? (
                <img
                  src={post.coverImage}
                  alt={getLocalizedContent(post.title, locale)}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-6xl">
                    {post.tags[0] === "Vibe Coding"
                      ? "💻"
                      : post.tags[0] === "AI"
                      ? "🤖"
                      : post.tags[0] === "Automation"
                      ? "⚡"
                      : "📊"}
                  </span>
                </div>
              )}
            </div>

            {/* Content */}
            <div className="prose prose-lg max-w-none">
              {/* Full content - render as HTML */}
              {getLocalizedContent(post.content, locale) ? (
                <div
                  dangerouslySetInnerHTML={{
                    __html: getLocalizedContent(post.content, locale),
                  }}
                />
              ) : (
                <div className="p-8 rounded-xl bg-muted/50 text-center">
                  <p className="text-muted-foreground">
                    {locale === "th"
                      ? "เนื้อหาบทความเต็มจะเพิ่มในภายหลัง..."
                      : "Full article content coming soon..."}
                  </p>
                </div>
              )}
            </div>

            <Separator className="my-8" />

            {/* Share */}
            <div className="flex items-center justify-between">
              <Button asChild variant="outline">
                <Link href="/blog">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  {locale === "th" ? "บทความอื่นๆ" : "More Articles"}
                </Link>
              </Button>

              <Button variant="ghost" size="sm">
                <Share2 className="h-4 w-4 mr-2" />
                {locale === "th" ? "แชร์" : "Share"}
              </Button>
            </div>
          </PageTransition>
        </article>
      </main>
      <Footer />
    </>
  );
}
