import { redirect } from "next/navigation";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { PostEditor } from "../post-editor";

export default async function NewPostPage() {
  const supabase = await createServerSupabaseClient();

  // Handle case when Supabase is not configured
  if (!supabase) {
    redirect("/blog/admin/login");
  }

  // Check if user is authenticated
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/blog/admin/login");
  }

  return <PostEditor mode="create" />;
}
