import type { Metadata } from "next";
import { ResumeClient } from "./resume-client";
import { generateSEO } from "@/lib/seo";

export const metadata: Metadata = generateSEO({
  title: "Resume | ประวัติและประสบการณ์ทำงาน",
  description: "Resume ของ Paul (Udomchai) - ผู้เชี่ยวชาญด้าน Data, Automation, AI และ Vibe Coding กว่า 10 ปี พร้อมผลงานและความสำเร็จที่ผ่านมา",
  path: "/resume",
  noIndex: true, // Protected content - don't index
});

export default function ResumePage() {
  return <ResumeClient />;
}
