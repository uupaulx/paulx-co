"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Save,
  Eye,
  Loader2,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getSupabaseClient } from "@/lib/supabase/client";
import type { BlogPost } from "@/types/database";

interface PostEditorProps {
  post?: BlogPost;
  mode: "create" | "edit";
}

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function PostEditor({ post, mode }: PostEditorProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    title_th: post?.title_th || "",
    title_en: post?.title_en || "",
    slug: post?.slug || "",
    excerpt_th: post?.excerpt_th || "",
    excerpt_en: post?.excerpt_en || "",
    content_th: post?.content_th || "",
    content_en: post?.content_en || "",
    cover_image: post?.cover_image || "",
    status: post?.status || "draft",
  });

  const handleChange = (
    field: keyof typeof formData,
    value: string
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    // Auto-generate slug from Thai title
    if (field === "title_en" && !post) {
      setFormData((prev) => ({
        ...prev,
        [field]: value,
        slug: generateSlug(value),
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccess(false);

    // Validation
    if (!formData.title_th || !formData.title_en) {
      setError("กรุณากรอกชื่อบทความทั้งภาษาไทยและอังกฤษ");
      setIsLoading(false);
      return;
    }

    if (!formData.slug) {
      setError("กรุณากรอก Slug");
      setIsLoading(false);
      return;
    }

    try {
      const supabase = getSupabaseClient();

      const postData = {
        title_th: formData.title_th,
        title_en: formData.title_en,
        slug: formData.slug,
        excerpt_th: formData.excerpt_th || formData.content_th.substring(0, 200),
        excerpt_en: formData.excerpt_en || formData.content_en.substring(0, 200),
        content_th: formData.content_th,
        content_en: formData.content_en,
        cover_image: formData.cover_image || null,
        status: formData.status as "draft" | "published",
        published_at:
          formData.status === "published" ? new Date().toISOString() : null,
      };

      if (mode === "create") {
        const { error } = await supabase.from("blog_posts").insert(postData);

        if (error) {
          if (error.code === "23505") {
            setError("Slug นี้ถูกใช้แล้ว กรุณาเปลี่ยน Slug ใหม่");
          } else {
            setError(error.message);
          }
          return;
        }
      } else {
        const { error } = await supabase
          .from("blog_posts")
          .update(postData)
          .eq("id", post!.id);

        if (error) {
          setError(error.message);
          return;
        }
      }

      setSuccess(true);
      setTimeout(() => {
        router.push("/blog/admin");
        router.refresh();
      }, 1000);
    } catch (err) {
      console.error("Save error:", err);
      setError("เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 bg-card sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button asChild variant="ghost" size="sm">
              <Link href="/blog/admin">
                <ArrowLeft className="h-4 w-4 mr-2" />
                กลับ
              </Link>
            </Button>
            <h1 className="text-xl font-bold">
              {mode === "create" ? "เขียนบทความใหม่" : "แก้ไขบทความ"}
            </h1>
          </div>
          <div className="flex items-center gap-2">
            {formData.slug && (
              <Button variant="outline" size="sm" asChild>
                <Link href={`/blog/${formData.slug}`} target="_blank">
                  <Eye className="h-4 w-4 mr-2" />
                  ดูตัวอย่าง
                </Link>
              </Button>
            )}
            <Button onClick={handleSubmit} disabled={isLoading}>
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
              ) : (
                <Save className="h-4 w-4 mr-2" />
              )}
              บันทึก
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <form onSubmit={handleSubmit}>
          {/* Status Messages */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 rounded-lg bg-red-500/10 text-red-600 dark:text-red-400 flex items-center gap-2"
            >
              <AlertCircle className="h-5 w-5 flex-shrink-0" />
              {error}
            </motion.div>
          )}

          {success && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 rounded-lg bg-green-500/10 text-green-600 dark:text-green-400 flex items-center gap-2"
            >
              <CheckCircle2 className="h-5 w-5 flex-shrink-0" />
              บันทึกสำเร็จ! กำลังกลับไปหน้ารายการ...
            </motion.div>
          )}

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>เนื้อหาบทความ</CardTitle>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="th" className="w-full">
                    <TabsList className="mb-4">
                      <TabsTrigger value="th">ภาษาไทย</TabsTrigger>
                      <TabsTrigger value="en">English</TabsTrigger>
                    </TabsList>

                    <TabsContent value="th" className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="title_th">ชื่อบทความ (ไทย) *</Label>
                        <Input
                          id="title_th"
                          value={formData.title_th}
                          onChange={(e) => handleChange("title_th", e.target.value)}
                          placeholder="ชื่อบทความภาษาไทย"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="excerpt_th">คำอธิบายย่อ (ไทย)</Label>
                        <Textarea
                          id="excerpt_th"
                          value={formData.excerpt_th}
                          onChange={(e) => handleChange("excerpt_th", e.target.value)}
                          placeholder="คำอธิบายสั้นๆ สำหรับแสดงในรายการบทความ"
                          rows={3}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="content_th">เนื้อหา (ไทย)</Label>
                        <Textarea
                          id="content_th"
                          value={formData.content_th}
                          onChange={(e) => handleChange("content_th", e.target.value)}
                          placeholder="เนื้อหาบทความภาษาไทย"
                          rows={15}
                          className="font-mono text-sm"
                        />
                      </div>
                    </TabsContent>

                    <TabsContent value="en" className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="title_en">Title (English) *</Label>
                        <Input
                          id="title_en"
                          value={formData.title_en}
                          onChange={(e) => handleChange("title_en", e.target.value)}
                          placeholder="Article title in English"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="excerpt_en">Excerpt (English)</Label>
                        <Textarea
                          id="excerpt_en"
                          value={formData.excerpt_en}
                          onChange={(e) => handleChange("excerpt_en", e.target.value)}
                          placeholder="Short description for article listing"
                          rows={3}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="content_en">Content (English)</Label>
                        <Textarea
                          id="content_en"
                          value={formData.content_en}
                          onChange={(e) => handleChange("content_en", e.target.value)}
                          placeholder="Article content in English"
                          rows={15}
                          className="font-mono text-sm"
                        />
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>การตั้งค่า</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="slug">Slug (URL) *</Label>
                    <Input
                      id="slug"
                      value={formData.slug}
                      onChange={(e) => handleChange("slug", e.target.value)}
                      placeholder="article-url-slug"
                    />
                    <p className="text-xs text-muted-foreground">
                      /blog/{formData.slug || "..."}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="status">สถานะ</Label>
                    <Select
                      value={formData.status}
                      onValueChange={(value) => handleChange("status", value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="draft">ฉบับร่าง</SelectItem>
                        <SelectItem value="published">เผยแพร่</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="cover_image">รูปปก (URL)</Label>
                    <Input
                      id="cover_image"
                      value={formData.cover_image}
                      onChange={(e) => handleChange("cover_image", e.target.value)}
                      placeholder="https://..."
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <Button
                    type="submit"
                    className="w-full"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    ) : (
                      <Save className="h-4 w-4 mr-2" />
                    )}
                    {mode === "create" ? "สร้างบทความ" : "บันทึกการแก้ไข"}
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </form>
      </div>
    </main>
  );
}
