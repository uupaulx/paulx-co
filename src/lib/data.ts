import type { Locale } from "./i18n";

export interface ExperienceItem {
  domain: string;
  years: number;
  level: string;
  levelEn: string;
}

export interface SkillCategory {
  name: string;
  nameEn: string;
  skills: string[];
}

export interface Project {
  id: string;
  category: "data" | "automation" | "ai" | "vibeCoding";
  title: { th: string; en: string };
  description: { th: string; en: string };
  features: { th: string[]; en: string[] };
  impact: { th: string[]; en: string[] };
  tech: string[];
  status?: "production" | "internal";
}

export interface BlogPost {
  id: string;
  slug: string;
  title: { th: string; en: string };
  excerpt: { th: string; en: string };
  content: { th: string; en: string };
  coverImage: string;
  publishedAt: string;
  readTime: number;
  tags: string[];
}

export const personalInfo = {
  name: "Paul (Udomchai)",
  email: "udomchai.u@gmail.com",
  linkedin: "https://www.linkedin.com/in/udomchai/",
  lineId: "uu7171",
  phone: "(+66) 095-669-7171",
  profileImage: "https://i.ibb.co/zH7N2y5h/20251231-221309-213.jpg",
};

export const experience: ExperienceItem[] = [
  { domain: "Automation", years: 10, level: "Senior/Expert", levelEn: "Senior/Expert" },
  { domain: "Data", years: 3, level: "Mid-Senior", levelEn: "Mid-Senior" },
  { domain: "AI", years: 3, level: "Mid-Senior", levelEn: "Mid-Senior" },
  { domain: "Vibe Coding", years: 1, level: "Junior-Mid", levelEn: "Junior-Mid" },
];

export const skillCategories: SkillCategory[] = [
  {
    name: "Data",
    nameEn: "Data",
    skills: ["Power BI", "SQL", "Python", "Microsoft Excel", "Google Sheets"],
  },
  {
    name: "Automation",
    nameEn: "Automation",
    skills: ["n8n", "Python (Vibe Code)", "API Integrations"],
  },
  {
    name: "AI",
    nameEn: "AI",
    skills: ["OpenAI API", "Claude API", "Claude Code Max", "Gemini API"],
  },
  {
    name: "Vibe Coding",
    nameEn: "Vibe Coding",
    skills: ["Antigravity (Claude Code Max)", "Next.js", "React", "TypeScript"],
  },
];

export const projects: Project[] = [
  {
    id: "bi-dashboards",
    category: "data",
    title: {
      th: "Business Intelligence Dashboards",
      en: "Business Intelligence Dashboards",
    },
    description: {
      th: "ระบบ Dashboard ครบวงจรสำหรับองค์กร ครอบคลุมทุกแผนก",
      en: "Comprehensive Dashboard system for organizations, covering all departments",
    },
    features: {
      th: [
        "Sales Team Dashboard - ติดตามยอดขาย, performance metrics",
        "Procurement Team Dashboard - การจัดซื้อ, supplier management",
        "Accounting Team Dashboard - Financial reporting",
        "HR Team Dashboard - People analytics",
      ],
      en: [
        "Sales Team Dashboard - Sales tracking, performance metrics",
        "Procurement Team Dashboard - Purchasing, supplier management",
        "Accounting Team Dashboard - Financial reporting",
        "HR Team Dashboard - People analytics",
      ],
    },
    impact: {
      th: [
        "เปลี่ยนจาก 'ไม่มี report' เป็น 'data-driven decisions'",
        "เพิ่มความเร็วในการตัดสินใจหลายเท่า",
        "Cost saving จากการตัดสินใจที่แม่นยำขึ้น",
      ],
      en: [
        "Transformed from 'no reports' to 'data-driven decisions'",
        "Multiplied decision-making speed",
        "Cost savings from more accurate decisions",
      ],
    },
    tech: ["Power BI", "SQL", "Excel"],
    status: "internal",
  },
  {
    id: "sales-automation",
    category: "automation",
    title: {
      th: "Sales Coordination Automation System",
      en: "Sales Coordination Automation System",
    },
    description: {
      th: "ระบบแจ้งเตือนอัตโนมัติสำหรับทีมประสานงานขาย",
      en: "Automated notification system for sales coordination team",
    },
    features: {
      th: [
        "แจ้งเตือนการส่งของให้ลูกค้าล่วงหน้า (วันพรุ่งนี้)",
        "Automated notifications",
        "Customer engagement enhancement",
      ],
      en: [
        "Advance delivery notifications to customers (next day)",
        "Automated notifications",
        "Customer engagement enhancement",
      ],
    },
    impact: {
      th: [
        "ประหยัดเวลาต่อวัน: 1 ชั่วโมง",
        "ประหยัดเวลาต่อปี: ~240-264 ชั่วโมง",
        "Customer Engagement เพิ่มขึ้นอย่างมีนัยสำคัญ",
      ],
      en: [
        "Time saved daily: 1 hour",
        "Time saved yearly: ~240-264 hours",
        "Significant increase in Customer Engagement",
      ],
    },
    tech: ["n8n", "API Integrations", "LINE Notify"],
    status: "internal",
  },
  {
    id: "hr-ai-agent",
    category: "ai",
    title: {
      th: "HR AI Agent (Internal)",
      en: "HR AI Agent (Internal)",
    },
    description: {
      th: "AI Assistant สำหรับพนักงานภายในองค์กร",
      en: "AI Assistant for internal employees",
    },
    features: {
      th: [
        "ตอบคำถามเรื่องวันหยุด",
        "ข้อมูลสวัสดิการ",
        "ระบบการลาต่างๆ",
        "คำถามทั่วไปเกี่ยวกับ HR",
      ],
      en: [
        "Answer questions about holidays",
        "Benefits information",
        "Leave management system",
        "General HR questions",
      ],
    },
    impact: {
      th: [
        "พนักงานได้คำตอบทันที (24/7)",
        "เพิ่มความพึงพอใจของพนักงาน",
        "ลด workload ทีม HR",
      ],
      en: [
        "Instant answers for employees (24/7)",
        "Increased employee satisfaction",
        "Reduced HR team workload",
      ],
    },
    tech: ["Claude API", "n8n", "LINE OA"],
    status: "internal",
  },
  {
    id: "customer-support-ai",
    category: "ai",
    title: {
      th: "Customer Support AI Agent",
      en: "Customer Support AI Agent",
    },
    description: {
      th: "AI ที่แทนที่ทีม Customer Support เกือบทั้งหมด",
      en: "AI that replaces almost the entire Customer Support team",
    },
    features: {
      th: [
        "ตอบคำถามลูกค้าจากฐานข้อมูลผลิตภัณฑ์ขนาดใหญ่",
        "Handle complex product inquiries",
        "24/7 availability",
      ],
      en: [
        "Answer customer questions from large product database",
        "Handle complex product inquiries",
        "24/7 availability",
      ],
    },
    impact: {
      th: [
        "Replacement Rate: ~99%",
        "Response Time: ภายในไม่กี่นาที",
        "ลดค่าใช้จ่ายทีม Support อย่างมหาศาล",
        "ลูกค้าได้คำตอบตรงตามต้องการ",
      ],
      en: [
        "Replacement Rate: ~99%",
        "Response Time: Within minutes",
        "Massive reduction in support team costs",
        "Customers get exactly the answers they need",
      ],
    },
    tech: ["Claude API", "OpenAI API", "Vector Database", "n8n"],
    status: "production",
  },
  {
    id: "plant-disease-scanner",
    category: "vibeCoding",
    title: {
      th: "Plant Disease Scanner",
      en: "Plant Disease Scanner",
    },
    description: {
      th: "แอปพลิเคชันสแกนโรคพืชด้วย AI สำหรับเกษตรกร",
      en: "AI-powered plant disease scanning app for farmers",
    },
    features: {
      th: [
        "ถ่ายรูปใบพืช",
        "AI วินิจฉัยโรคจากรูปภาพ",
        "แนะนำผลิตภัณฑ์ที่ช่วยแก้ปัญหาตรงจุด",
        "คำแนะนำวิธีใช้งานผลิตภัณฑ์ที่ถูกต้อง",
      ],
      en: [
        "Take photos of plant leaves",
        "AI diagnoses diseases from images",
        "Recommend targeted products",
        "Proper product usage instructions",
      ],
    },
    impact: {
      th: [
        "ใช้งานจริงกับลูกค้าเกษตรกร",
        "ลดเวลาในการวินิจฉัยโรค",
        "เพิ่มยอดขายผลิตภัณฑ์ที่ตรงจุด",
      ],
      en: [
        "Live with real farmer customers",
        "Reduced disease diagnosis time",
        "Increased sales of targeted products",
      ],
    },
    tech: ["Next.js", "Claude API", "AI Image Recognition"],
    status: "production",
  },
  {
    id: "agri-intelligence",
    category: "vibeCoding",
    title: {
      th: "Agricultural Intelligence Platform",
      en: "Agricultural Intelligence Platform",
    },
    description: {
      th: "แพลตฟอร์มรวบรวมข้อมูลเกษตรครบวงจร",
      en: "Comprehensive agricultural data platform",
    },
    features: {
      th: [
        "Weather Intelligence - ข้อมูลสภาพอากาศย้อนหลัง + พยากรณ์",
        "Cultivation Area Data - พื้นที่เพาะปลูกแยกตามจังหวัด/พืช",
        "Price Analytics - ราคาผลผลิตย้อนหลังหลายปี",
        "Crop Protection Products - ฐานข้อมูลผลิตภัณฑ์อารักขาพืช",
        "Data Visualization - Graphs & Heat Maps",
        "AI Chat Assistant - พูดคุยถามข้อมูลในเว็บได้",
      ],
      en: [
        "Weather Intelligence - Historical + Forecast data",
        "Cultivation Area Data - By province and crop type",
        "Price Analytics - Multi-year historical prices",
        "Crop Protection Products - Product database",
        "Data Visualization - Graphs & Heat Maps",
        "AI Chat Assistant - Ask questions about the data",
      ],
    },
    impact: {
      th: [
        "ช่วยเกษตรกรวางแผนการเพาะปลูก",
        "ช่วยทีมขายเข้าใจตลาดและลูกค้า",
      ],
      en: [
        "Helps farmers plan cultivation",
        "Helps sales team understand market and customers",
      ],
    },
    tech: ["Next.js", "TypeScript", "Claude API", "Data Visualization"],
    status: "internal",
  },
];

export const blogPosts: BlogPost[] = [
  {
    id: "1",
    slug: "introduction-to-vibe-coding",
    title: {
      th: "Vibe Coding คืออะไร? และทำไมมันจะเปลี่ยนวิธีการเขียนโปรแกรม",
      en: "What is Vibe Coding? And why it will change programming",
    },
    excerpt: {
      th: "Vibe Coding คือการเขียนโปรแกรมด้วย AI โดยที่เราแค่บอก AI ว่าต้องการอะไร แล้ว AI จะเขียนโค้ดให้...",
      en: "Vibe Coding is programming with AI where you just tell the AI what you want, and it writes the code for you...",
    },
    content: {
      th: "เนื้อหาบทความเต็ม...",
      en: "Full article content...",
    },
    coverImage: "/blog/vibe-coding.jpg",
    publishedAt: "2025-01-10",
    readTime: 5,
    tags: ["Vibe Coding", "AI", "Programming"],
  },
  {
    id: "2",
    slug: "automation-saves-time",
    title: {
      th: "Automation ช่วยประหยัดเวลาได้อย่างไร: กรณีศึกษาจริง",
      en: "How Automation Saves Time: Real Case Studies",
    },
    excerpt: {
      th: "จากประสบการณ์กว่า 10 ปีในการทำ Automation ผมพบว่างานที่เสียเวลาซ้ำๆ สามารถ automate ได้เกือบทั้งหมด...",
      en: "From 10+ years of automation experience, I've found that repetitive time-consuming tasks can almost all be automated...",
    },
    content: {
      th: "เนื้อหาบทความเต็ม...",
      en: "Full article content...",
    },
    coverImage: "/blog/automation.jpg",
    publishedAt: "2025-01-05",
    readTime: 8,
    tags: ["Automation", "Productivity", "n8n"],
  },
  {
    id: "3",
    slug: "ai-customer-support",
    title: {
      th: "AI แทนที่ Customer Support ได้ 99%: บทเรียนจากการ Implement จริง",
      en: "AI Replaces 99% of Customer Support: Lessons from Real Implementation",
    },
    excerpt: {
      th: "เมื่อเราตัดสินใจใช้ AI มาช่วยตอบคำถามลูกค้า ผลลัพธ์เกินความคาดหมาย...",
      en: "When we decided to use AI to help answer customer questions, the results exceeded expectations...",
    },
    content: {
      th: "เนื้อหาบทความเต็ม...",
      en: "Full article content...",
    },
    coverImage: "/blog/ai-support.jpg",
    publishedAt: "2024-12-20",
    readTime: 10,
    tags: ["AI", "Customer Support", "Case Study"],
  },
];

export function getProjectsByCategory(category: string) {
  if (category === "all") return projects;
  return projects.filter((p) => p.category === category);
}

export function getProjectById(id: string) {
  return projects.find((p) => p.id === id);
}

export function getBlogPostBySlug(slug: string) {
  return blogPosts.find((p) => p.slug === slug);
}

export function getLocalizedContent<T extends { th: string; en: string }>(
  content: T,
  locale: Locale
): string {
  return content[locale];
}
