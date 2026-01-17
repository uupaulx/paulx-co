"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Plus,
  Edit,
  Trash2,
  LogOut,
  FileText,
  Eye,
  EyeOff,
  MoreHorizontal,
  Calendar,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { getSupabaseClient } from "@/lib/supabase/client";
import type { BlogPost } from "@/types/database";

interface AdminDashboardClientProps {
  posts: BlogPost[];
  userEmail: string;
}

export function AdminDashboardClient({
  posts: initialPosts,
  userEmail,
}: AdminDashboardClientProps) {
  const router = useRouter();
  const [posts, setPosts] = useState(initialPosts);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleLogout = async () => {
    const supabase = getSupabaseClient();
    await supabase.auth.signOut();
    router.push("/blog/admin/login");
    router.refresh();
  };

  const handleDelete = async () => {
    if (!deleteId) return;

    setIsDeleting(true);
    try {
      const supabase = getSupabaseClient();
      const { error } = await supabase
        .from("blog_posts")
        .delete()
        .eq("id", deleteId);

      if (error) {
        console.error("Error deleting post:", error);
        return;
      }

      setPosts(posts.filter((p) => p.id !== deleteId));
    } catch (err) {
      console.error("Delete error:", err);
    } finally {
      setIsDeleting(false);
      setDeleteId(null);
    }
  };

  const toggleStatus = async (post: BlogPost) => {
    const newStatus = post.status === "published" ? "draft" : "published";
    const supabase = getSupabaseClient();

    const { error } = await supabase
      .from("blog_posts")
      .update({
        status: newStatus,
        published_at: newStatus === "published" ? new Date().toISOString() : null,
      })
      .eq("id", post.id);

    if (error) {
      console.error("Error updating status:", error);
      return;
    }

    setPosts(
      posts.map((p) =>
        p.id === post.id
          ? {
              ...p,
              status: newStatus,
              published_at:
                newStatus === "published" ? new Date().toISOString() : null,
            }
          : p
      )
    );
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("th-TH", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const publishedCount = posts.filter((p) => p.status === "published").length;
  const draftCount = posts.filter((p) => p.status === "draft").length;

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/blog" className="text-muted-foreground hover:text-foreground">
              <FileText className="h-5 w-5" />
            </Link>
            <h1 className="text-xl font-bold">Blog Admin</h1>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">{userEmail}</span>
            <Button variant="ghost" size="sm" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              ออกจากระบบ
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">บทความทั้งหมด</p>
                  <p className="text-3xl font-bold">{posts.length}</p>
                </div>
                <FileText className="h-8 w-8 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">เผยแพร่แล้ว</p>
                  <p className="text-3xl font-bold text-green-600">{publishedCount}</p>
                </div>
                <Eye className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">ฉบับร่าง</p>
                  <p className="text-3xl font-bold text-yellow-600">{draftCount}</p>
                </div>
                <EyeOff className="h-8 w-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold">รายการบทความ</h2>
          <Button asChild>
            <Link href="/blog/admin/posts/new">
              <Plus className="h-4 w-4 mr-2" />
              เขียนบทความใหม่
            </Link>
          </Button>
        </div>

        {/* Posts List */}
        <Card>
          <CardContent className="p-0">
            {posts.length === 0 ? (
              <div className="text-center py-12">
                <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground mb-4">ยังไม่มีบทความ</p>
                <Button asChild>
                  <Link href="/blog/admin/posts/new">
                    <Plus className="h-4 w-4 mr-2" />
                    เขียนบทความแรก
                  </Link>
                </Button>
              </div>
            ) : (
              <div className="divide-y divide-border">
                {posts.map((post, index) => (
                  <motion.div
                    key={post.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="p-4 hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <Badge
                            variant={post.status === "published" ? "default" : "secondary"}
                            className="text-xs"
                          >
                            {post.status === "published" ? "เผยแพร่แล้ว" : "ฉบับร่าง"}
                          </Badge>
                        </div>
                        <h3 className="font-medium truncate">{post.title_th}</h3>
                        <p className="text-sm text-muted-foreground truncate">
                          {post.excerpt_th}
                        </p>
                        <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {formatDate(post.created_at)}
                          </span>
                          <span>/{post.slug}</span>
                        </div>
                      </div>

                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem asChild>
                            <Link href={`/blog/admin/posts/${post.id}`}>
                              <Edit className="h-4 w-4 mr-2" />
                              แก้ไข
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => toggleStatus(post)}>
                            {post.status === "published" ? (
                              <>
                                <EyeOff className="h-4 w-4 mr-2" />
                                ซ่อน (Draft)
                              </>
                            ) : (
                              <>
                                <Eye className="h-4 w-4 mr-2" />
                                เผยแพร่
                              </>
                            )}
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link href={`/blog/${post.slug}`} target="_blank">
                              <Eye className="h-4 w-4 mr-2" />
                              ดูตัวอย่าง
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => setDeleteId(post.id)}
                            className="text-red-600"
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            ลบ
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>ยืนยันการลบ</AlertDialogTitle>
            <AlertDialogDescription>
              คุณต้องการลบบทความนี้หรือไม่? การกระทำนี้ไม่สามารถย้อนกลับได้
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>ยกเลิก</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={isDeleting}
              className="bg-red-600 hover:bg-red-700"
            >
              {isDeleting ? "กำลังลบ..." : "ลบบทความ"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </main>
  );
}
