import type { Metadata } from "next";
import { getBlogPostBySlug, type BlogPostWithLocale } from "@/lib/supabase";
import { getBlogPostBySlug as getMockBlogPost, type BlogPost as MockBlogPost } from "@/lib/data";
import { BlogPostClient } from "./blog-post-client";
import { generateSEO, generateBlogPostSchema, siteConfig } from "@/lib/seo";

// ISR: Revalidate blog post every 5 minutes
export const revalidate = 300;

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
      title: "ไม่พบบทความ",
      description: "ไม่พบบทความที่คุณกำลังมองหา",
      path: `/blog/${slug}`,
      noIndex: true,
    });
  }

  // Use Thai for OG meta tags (primary audience is Thai)
  // Include article metadata for better SEO
  return generateSEO({
    title: post.title.th,
    description: post.excerpt.th,
    path: `/blog/${slug}`,
    image: post.coverImage || undefined,
    type: "article",
    publishedTime: post.publishedAt,
    keywords: post.tags,
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

  // Generate JSON-LD for blog post (use Thai as primary)
  const blogSchema = post
    ? generateBlogPostSchema({
        title: post.title.th || post.title.en,
        description: post.excerpt.th || post.excerpt.en,
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
