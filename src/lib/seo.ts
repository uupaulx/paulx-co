import type { Metadata } from "next";

export const siteConfig = {
  name: "PaulX",
  url: "https://paulx.co",
  ogImage: "https://i.ibb.co/zH7N2y5h/20251231-221309-213.jpg",
  author: {
    name: "Paul (Udomchai)",
    email: "udomchai.u@gmail.com",
    linkedin: "https://www.linkedin.com/in/udomchai/",
  },
  description: {
    th: "Portfolio website ของ Paul (Udomchai) - ผู้เชี่ยวชาญด้าน Data, Automation, AI และ Vibe Coding กว่า 10 ปี",
    en: "Portfolio website of Paul (Udomchai) - 10+ years of experience in Data, Automation, AI, and Vibe Coding",
  },
  keywords: [
    "Data Analyst",
    "AI Developer",
    "Automation Expert",
    "Vibe Coding",
    "Thailand",
    "Bangkok",
    "n8n",
    "Power BI",
    "Claude API",
    "OpenAI",
    "Next.js Developer",
    "Business Intelligence",
  ],
};

export function generateSEO({
  title,
  description,
  path = "",
  image,
  noIndex = false,
  keywords,
  publishedTime,
  modifiedTime,
  type = "website",
}: {
  title?: string;
  description?: string;
  path?: string;
  image?: string;
  noIndex?: boolean;
  keywords?: string[];
  publishedTime?: string;
  modifiedTime?: string;
  type?: "website" | "article";
}): Metadata {
  const url = `${siteConfig.url}${path}`;
  const ogImage = image || siteConfig.ogImage;
  const allKeywords = keywords
    ? [...keywords, ...siteConfig.keywords]
    : siteConfig.keywords;

  return {
    title: title,
    description: description || siteConfig.description.th,
    keywords: allKeywords,
    authors: [{ name: siteConfig.author.name }],
    alternates: {
      canonical: url,
    },
    openGraph: {
      type: type,
      locale: "th_TH",
      alternateLocale: "en_US",
      url: url,
      siteName: siteConfig.name,
      title: title || siteConfig.name,
      description: description || siteConfig.description.th,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title || siteConfig.name,
        },
      ],
      ...(type === "article" && {
        publishedTime: publishedTime,
        modifiedTime: modifiedTime || publishedTime,
        authors: [siteConfig.author.name],
        section: "Technology",
        tags: keywords,
      }),
    },
    twitter: {
      card: "summary_large_image",
      title: title || siteConfig.name,
      description: description || siteConfig.description.th,
      images: [ogImage],
      creator: "@paulx",
    },
    robots: noIndex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
          },
        },
  };
}

// JSON-LD Structured Data Types
export interface PersonSchema {
  "@context": "https://schema.org";
  "@type": "Person";
  name: string;
  url: string;
  image: string;
  email: string;
  jobTitle: string;
  worksFor?: {
    "@type": "Organization";
    name: string;
  };
  sameAs: string[];
  knowsAbout: string[];
}

export interface WebSiteSchema {
  "@context": "https://schema.org";
  "@type": "WebSite";
  name: string;
  url: string;
  description: string;
  author: {
    "@type": "Person";
    name: string;
  };
}

export interface BlogPostingSchema {
  "@context": "https://schema.org";
  "@type": "BlogPosting";
  headline: string;
  description: string;
  image: string;
  datePublished: string;
  dateModified?: string;
  author: {
    "@type": "Person";
    name: string;
    url: string;
  };
  publisher: {
    "@type": "Person";
    name: string;
    url: string;
  };
  mainEntityOfPage: {
    "@type": "WebPage";
    "@id": string;
  };
}

export function generatePersonSchema(): PersonSchema {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.author.name,
    url: siteConfig.url,
    image: siteConfig.ogImage,
    email: siteConfig.author.email,
    jobTitle: "Data, Automation & AI Expert",
    sameAs: [siteConfig.author.linkedin],
    knowsAbout: [
      "Data Analytics",
      "Business Intelligence",
      "Automation",
      "Artificial Intelligence",
      "Machine Learning",
      "n8n",
      "Power BI",
      "Python",
      "TypeScript",
      "Next.js",
    ],
  };
}

export function generateWebSiteSchema(): WebSiteSchema {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description.en,
    author: {
      "@type": "Person",
      name: siteConfig.author.name,
    },
  };
}

export function generateBlogPostSchema({
  title,
  description,
  image,
  datePublished,
  dateModified,
  slug,
}: {
  title: string;
  description: string;
  image: string;
  datePublished: string;
  dateModified?: string;
  slug: string;
}): BlogPostingSchema {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    description: description,
    image: image || siteConfig.ogImage,
    datePublished: datePublished,
    dateModified: dateModified || datePublished,
    author: {
      "@type": "Person",
      name: siteConfig.author.name,
      url: siteConfig.url,
    },
    publisher: {
      "@type": "Person",
      name: siteConfig.author.name,
      url: siteConfig.url,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${siteConfig.url}/blog/${slug}`,
    },
  };
}
