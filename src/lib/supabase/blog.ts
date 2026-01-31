import { createPublicSupabaseClient } from "./server";
import type { BlogPost } from "@/types/database";

export interface BlogPostWithLocale {
  id: string;
  slug: string;
  title: { th: string; en: string };
  excerpt: { th: string; en: string };
  content: { th: string; en: string };
  coverImage: string | null;
  publishedAt: string;
  tags: string[];
}

/**
 * Transform database row to frontend format
 */
function transformBlogPost(post: BlogPost): BlogPostWithLocale {
  return {
    id: post.id,
    slug: post.slug,
    title: { th: post.title_th, en: post.title_en },
    excerpt: { th: post.excerpt_th, en: post.excerpt_en },
    content: { th: post.content_th, en: post.content_en },
    coverImage: post.cover_image,
    publishedAt: post.published_at || post.created_at,
    tags: [], // Tags can be added later with a separate table
  };
}

/**
 * Get all published blog posts
 * Caching is handled at page level via ISR (revalidate = 300)
 */
export async function getPublishedBlogPosts(): Promise<BlogPostWithLocale[]> {
  const supabase = createPublicSupabaseClient();

  // Return empty array if Supabase is not configured (will fallback to mock data)
  if (!supabase) {
    return [];
  }

  try {
    const { data, error } = await supabase
      .from("blog_posts")
      .select("*")
      .eq("status", "published")
      .order("published_at", { ascending: false });

    if (error) {
      console.error("Error fetching blog posts:", error);
      return [];
    }

    return (data || []).map(transformBlogPost);
  } catch (err) {
    console.error("Error connecting to Supabase:", err);
    return [];
  }
}

/**
 * Get a single blog post by slug
 * Caching is handled at page level via ISR (revalidate = 300)
 */
export async function getBlogPostBySlug(
  slug: string
): Promise<BlogPostWithLocale | null> {
  const supabase = createPublicSupabaseClient();

  // Return null if Supabase is not configured (will fallback to mock data)
  if (!supabase) {
    return null;
  }

  try {
    const { data, error } = await supabase
      .from("blog_posts")
      .select("*")
      .eq("slug", slug)
      .eq("status", "published")
      .single();

    if (error || !data) {
      // Don't log error for not found posts
      if (error?.code !== "PGRST116") {
        console.error("Error fetching blog post:", error);
      }
      return null;
    }

    return transformBlogPost(data);
  } catch (err) {
    console.error("Error connecting to Supabase:", err);
    return null;
  }
}

/**
 * Get all blog slugs for static generation
 */
export async function getAllBlogSlugs(): Promise<string[]> {
  const supabase = createPublicSupabaseClient();

  // Return empty array if Supabase is not configured
  if (!supabase) {
    return [];
  }

  try {
    const { data, error } = await supabase
      .from("blog_posts")
      .select("slug")
      .eq("status", "published");

    if (error) {
      console.error("Error fetching blog slugs:", error);
      return [];
    }

    return (data || []).map((post) => post.slug);
  } catch (err) {
    console.error("Error connecting to Supabase:", err);
    return [];
  }
}
