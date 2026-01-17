import { redirect } from "next/navigation";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { AdminDashboardClient } from "./admin-dashboard-client";
import type { BlogPost } from "@/types/database";

async function getAdminBlogPosts(): Promise<BlogPost[]> {
  const supabase = await createServerSupabaseClient();

  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching posts:", error);
    return [];
  }

  return data || [];
}

export default async function AdminDashboardPage() {
  const supabase = await createServerSupabaseClient();

  // Check if user is authenticated
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/blog/admin/login");
  }

  const posts = await getAdminBlogPosts();

  return <AdminDashboardClient posts={posts} userEmail={user.email || ""} />;
}
