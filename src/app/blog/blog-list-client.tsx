"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Navbar, Footer } from "@/components/layout";
import { useLocale } from "@/providers/providers";
import { getLocalizedContent } from "@/lib/data";
import { PageTransition, StaggerContainer, StaggerItem } from "@/components/motion";
import type { BlogPostWithLocale } from "@/lib/supabase";

interface BlogListClientProps {
  posts: BlogPostWithLocale[];
}

export function BlogListClient({ posts }: BlogListClientProps) {
  const { locale, t } = useLocale();

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString(locale === "th" ? "th-TH" : "en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Estimate read time based on content length (rough estimate)
  const getReadTime = (post: BlogPostWithLocale) => {
    const content = locale === "th" ? post.content.th : post.content.en;
    const words = content.split(/\s+/).length;
    return Math.max(1, Math.ceil(words / 200)); // ~200 words per minute
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-24 pb-16">
        <div className="container mx-auto px-4">
          <PageTransition>
            {/* Header */}
            <div className="text-center mb-16">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                {t.blog.title}
              </h1>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                {t.blog.subtitle}
              </p>
            </div>

            {/* Blog Posts Grid */}
            <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <StaggerItem key={post.id}>
                  <Link href={`/blog/${post.slug}`}>
                    <motion.div
                      whileHover={{ y: -8 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Card className="h-full overflow-hidden border-border/50 hover:border-primary/50 transition-all group">
                        {/* Cover Image */}
                        <div className="relative h-48 bg-gradient-to-br from-primary/20 to-accent/20 overflow-hidden">
                          {post.coverImage ? (
                            <Image
                              src={post.coverImage}
                              alt={getLocalizedContent(post.title, locale)}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform duration-300"
                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            />
                          ) : (
                            <div className="absolute inset-0 flex items-center justify-center">
                              <span className="text-4xl">
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

                        <CardHeader className="pb-3">
                          {/* Tags */}
                          <div className="flex flex-wrap gap-2 mb-3">
                            {post.tags.slice(0, 2).map((tag) => (
                              <Badge
                                key={tag}
                                variant="secondary"
                                className="text-xs"
                              >
                                {tag}
                              </Badge>
                            ))}
                          </div>

                          {/* Title */}
                          <h2 className="text-xl font-semibold line-clamp-2 group-hover:text-primary transition-colors">
                            {getLocalizedContent(post.title, locale)}
                          </h2>
                        </CardHeader>

                        <CardContent className="pt-0">
                          {/* Excerpt */}
                          <p className="text-muted-foreground text-sm line-clamp-3 mb-4">
                            {getLocalizedContent(post.excerpt, locale)}
                          </p>

                          {/* Meta */}
                          <div className="flex items-center justify-between text-xs text-muted-foreground">
                            <div className="flex items-center gap-4">
                              <span className="flex items-center gap-1">
                                <Calendar className="h-3 w-3" />
                                {formatDate(post.publishedAt)}
                              </span>
                              <span className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                {getReadTime(post)} {t.blog.readTime}
                              </span>
                            </div>
                            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform text-primary" />
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  </Link>
                </StaggerItem>
              ))}
            </StaggerContainer>

            {/* Empty state */}
            {posts.length === 0 && (
              <div className="text-center py-16">
                <p className="text-muted-foreground">
                  {locale === "th"
                    ? "ยังไม่มีบทความ"
                    : "No posts yet"}
                </p>
              </div>
            )}
          </PageTransition>
        </div>
      </main>
      <Footer />
    </>
  );
}
