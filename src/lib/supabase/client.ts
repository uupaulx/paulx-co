import { createBrowserClient } from "@supabase/ssr";
import type { Database } from "@/types/database";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export function createClient() {
  if (!supabaseUrl || !supabaseAnonKey) {
    console.warn(
      "Supabase credentials not configured. Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY environment variables."
    );
    // Return a mock client that throws user-friendly errors
    return {
      auth: {
        signInWithPassword: async () => ({
          data: null,
          error: {
            message: "ยังไม่ได้ตั้งค่า Supabase กรุณาติดต่อ Admin",
            status: 500,
          },
        }),
        signOut: async () => ({ error: null }),
        getSession: async () => ({ data: { session: null }, error: null }),
        getUser: async () => ({ data: { user: null }, error: null }),
        onAuthStateChange: () => ({
          data: { subscription: { unsubscribe: () => {} } },
        }),
      },
      from: () => ({
        select: () => ({ data: [], error: null }),
        insert: () => ({ data: null, error: { message: "Supabase not configured" } }),
        update: () => ({ data: null, error: { message: "Supabase not configured" } }),
        delete: () => ({ data: null, error: { message: "Supabase not configured" } }),
      }),
    } as unknown as ReturnType<typeof createBrowserClient<Database>>;
  }

  return createBrowserClient<Database>(supabaseUrl, supabaseAnonKey);
}

// Singleton instance for client-side
let client: ReturnType<typeof createClient> | null = null;

export function getSupabaseClient() {
  if (!client) {
    client = createClient();
  }
  return client;
}
