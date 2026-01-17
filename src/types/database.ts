export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      blog_posts: {
        Row: {
          id: string;
          title_th: string;
          title_en: string;
          slug: string;
          content_th: string;
          content_en: string;
          excerpt_th: string;
          excerpt_en: string;
          cover_image: string | null;
          status: "draft" | "published";
          published_at: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title_th: string;
          title_en: string;
          slug: string;
          content_th: string;
          content_en: string;
          excerpt_th: string;
          excerpt_en: string;
          cover_image?: string | null;
          status?: "draft" | "published";
          published_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title_th?: string;
          title_en?: string;
          slug?: string;
          content_th?: string;
          content_en?: string;
          excerpt_th?: string;
          excerpt_en?: string;
          cover_image?: string | null;
          status?: "draft" | "published";
          published_at?: string | null;
          updated_at?: string;
        };
        Relationships: [];
      };
      resume_access_logs: {
        Row: {
          id: string;
          method: "email_otp" | "line";
          identifier: string;
          name: string | null;
          company: string | null;
          accessed_at: string;
          ip_address: string | null;
          user_agent: string | null;
        };
        Insert: {
          id?: string;
          method: "email_otp" | "line";
          identifier: string;
          name?: string | null;
          company?: string | null;
          accessed_at?: string;
          ip_address?: string | null;
          user_agent?: string | null;
        };
        Update: {
          method?: "email_otp" | "line";
          identifier?: string;
          name?: string | null;
          company?: string | null;
          ip_address?: string | null;
          user_agent?: string | null;
        };
        Relationships: [];
      };
      contact_reveal_logs: {
        Row: {
          id: string;
          captcha_token: string | null;
          revealed_at: string;
          ip_address: string | null;
        };
        Insert: {
          id?: string;
          captcha_token?: string | null;
          revealed_at?: string;
          ip_address?: string | null;
        };
        Update: {
          captcha_token?: string | null;
          ip_address?: string | null;
        };
        Relationships: [];
      };
      otp_codes: {
        Row: {
          id: string;
          email: string;
          code: string;
          expires_at: string;
          used: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          email: string;
          code: string;
          expires_at: string;
          used?: boolean;
          created_at?: string;
        };
        Update: {
          used?: boolean;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
  };
}

// Helper types
export type BlogPost = Database["public"]["Tables"]["blog_posts"]["Row"];
export type ResumeAccessLog = Database["public"]["Tables"]["resume_access_logs"]["Row"];
export type ContactRevealLog = Database["public"]["Tables"]["contact_reveal_logs"]["Row"];
export type OtpCode = Database["public"]["Tables"]["otp_codes"]["Row"];
