import type { Metadata } from "next";
import { getPublishedBlogPosts, type BlogPostWithLocale } from "@/lib/supabase";
import { blogPosts as mockBlogPosts, type BlogPost as MockBlogPost } from "@/lib/data";
import { BlogListClient } from "./blog-list-client";
import { generateSEO } from "@/lib/seo";

export const metadata: Metadata = generateSEO({
  title: "Blog | บทความเกี่ยวกับ Data, AI & Automation",
  description: "บทความและ Case Studies เกี่ยวกับ Data Analytics, AI, Automation และ Vibe Coding จากประสบการณ์จริง",
  path: "/blog",
});

// Transform mock data to match BlogPostWithLocale format
function transformMockPosts(posts: MockBlogPost[]): BlogPostWithLocale[] {
  return posts.map((post) => ({
    id: post.id,
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    content: post.content,
    coverImage: post.coverImage,
    publishedAt: post.publishedAt,
    tags: post.tags,
  }));
}

export default async function BlogPage() {
  // Try to fetch from Supabase first
  let posts = await getPublishedBlogPosts();

  // Fallback to mock data if no posts from Supabase
  if (posts.length === 0) {
    posts = transformMockPosts(mockBlogPosts);
  }

  return <BlogListClient posts={posts} />;
}
