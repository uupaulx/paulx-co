"use server";

import { revalidatePath } from "next/cache";

/**
 * Revalidate blog pages after admin updates
 * This clears the ISR cache so changes appear immediately
 */
export async function revalidateBlogPages(slug?: string) {
  // Revalidate the blog list page
  revalidatePath("/blog");

  // Revalidate the specific blog post page if slug is provided
  if (slug) {
    revalidatePath(`/blog/${slug}`);
  }
}
