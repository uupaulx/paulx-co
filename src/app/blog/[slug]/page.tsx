import type { Metadata } from "next";
import { getBlogPostBySlug, type BlogPostWithLocale } from "@/lib/supabase";
import { getBlogPostBySlug as getMockBlogPost, type BlogPost as MockBlogPost } from "@/lib/data";
import { BlogPostClient } from "./blog-post-client";
import { generateSEO, generateBlogPostSchema, siteConfig } from "@/lib/seo";

// Transform mock data to match BlogPostWithLocale format
function transformMockPost(post: MockBlogPost): BlogPostWithLocale {
  return {
    id: post.id,
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    content: post.content,
    coverImage: post.coverImage,
    publishedAt: post.publishedAt,
    tags: post.tags,
  };
}

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

// Generate dynamic metadata for each blog post
export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;

  let post = await getBlogPostBySlug(slug);
  if (!post) {
    const mockPost = getMockBlogPost(slug);
    if (mockPost) {
      post = transformMockPost(mockPost);
    }
  }

  if (!post) {
    return generateSEO({
      title: "Blog Post Not Found",
      description: "The blog post you are looking for does not exist.",
      path: `/blog/${slug}`,
      noIndex: true,
    });
  }

  return generateSEO({
    title: post.title.en,
    description: post.excerpt.en,
    path: `/blog/${slug}`,
    image: post.coverImage || undefined,
  });
}

// JSON-LD Component
function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;

  // Try to fetch from Supabase first
  let post = await getBlogPostBySlug(slug);

  // Fallback to mock data if not found in Supabase
  if (!post) {
    const mockPost = getMockBlogPost(slug);
    if (mockPost) {
      post = transformMockPost(mockPost);
    }
  }

  // Generate JSON-LD for blog post
  const blogSchema = post
    ? generateBlogPostSchema({
        title: post.title.en,
        description: post.excerpt.en,
        image: post.coverImage || siteConfig.ogImage,
        datePublished: post.publishedAt,
        slug: post.slug,
      })
    : null;

  return (
    <>
      {blogSchema && <JsonLd data={blogSchema} />}
      <BlogPostClient post={post} />
    </>
  );
}

// Generate static params for known slugs (mock data only for build time)
// Supabase posts will be fetched dynamically
export async function generateStaticParams() {
  // Use mock data slugs for static generation
  // Supabase posts are fetched dynamically at request time
  const mockSlugs = ["introduction-to-vibe-coding", "automation-saves-time", "ai-customer-support"];

  return mockSlugs.map((slug) => ({ slug }));
}

// Allow dynamic routes for Supabase posts
export const dynamicParams = true;
