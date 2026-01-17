-- PaulX Portfolio Database Schema
-- Run this in Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- Blog Posts Table
-- ============================================
CREATE TABLE IF NOT EXISTS public.blog_posts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title_th TEXT NOT NULL,
    title_en TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    content_th TEXT NOT NULL,
    content_en TEXT NOT NULL,
    excerpt_th TEXT NOT NULL,
    excerpt_en TEXT NOT NULL,
    cover_image TEXT,
    status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
    published_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Index for slug lookup
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON public.blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_blog_posts_status ON public.blog_posts(status);
CREATE INDEX IF NOT EXISTS idx_blog_posts_published_at ON public.blog_posts(published_at DESC);

-- RLS for blog_posts
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;

-- Anyone can read published posts
CREATE POLICY "Anyone can read published posts"
    ON public.blog_posts
    FOR SELECT
    USING (status = 'published');

-- Only authenticated admin can insert/update/delete
-- (For now, we'll use service role key for admin operations)

-- ============================================
-- Resume Access Logs Table
-- ============================================
CREATE TABLE IF NOT EXISTS public.resume_access_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    method TEXT NOT NULL CHECK (method IN ('email_otp', 'line')),
    identifier TEXT NOT NULL, -- email or LINE user ID
    name TEXT,
    company TEXT,
    accessed_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    ip_address TEXT,
    user_agent TEXT
);

-- Index for analytics
CREATE INDEX IF NOT EXISTS idx_resume_access_logs_accessed_at ON public.resume_access_logs(accessed_at DESC);
CREATE INDEX IF NOT EXISTS idx_resume_access_logs_method ON public.resume_access_logs(method);

-- RLS for resume_access_logs
ALTER TABLE public.resume_access_logs ENABLE ROW LEVEL SECURITY;

-- Anyone can insert (after OTP verification)
CREATE POLICY "Anyone can insert access logs"
    ON public.resume_access_logs
    FOR INSERT
    WITH CHECK (true);

-- Only admin can read logs (via service role)

-- ============================================
-- Contact Reveal Logs Table
-- ============================================
CREATE TABLE IF NOT EXISTS public.contact_reveal_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    captcha_token TEXT,
    revealed_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    ip_address TEXT
);

-- Index
CREATE INDEX IF NOT EXISTS idx_contact_reveal_logs_revealed_at ON public.contact_reveal_logs(revealed_at DESC);

-- RLS
ALTER TABLE public.contact_reveal_logs ENABLE ROW LEVEL SECURITY;

-- Anyone can insert (after CAPTCHA verification)
CREATE POLICY "Anyone can insert contact reveal logs"
    ON public.contact_reveal_logs
    FOR INSERT
    WITH CHECK (true);

-- ============================================
-- OTP Codes Table
-- ============================================
CREATE TABLE IF NOT EXISTS public.otp_codes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email TEXT NOT NULL,
    code TEXT NOT NULL,
    expires_at TIMESTAMPTZ NOT NULL,
    used BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Index for lookup
CREATE INDEX IF NOT EXISTS idx_otp_codes_email ON public.otp_codes(email);
CREATE INDEX IF NOT EXISTS idx_otp_codes_expires_at ON public.otp_codes(expires_at);

-- RLS
ALTER TABLE public.otp_codes ENABLE ROW LEVEL SECURITY;

-- Service role only (no direct access from client)

-- ============================================
-- Auto-update updated_at trigger
-- ============================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_blog_posts_updated_at
    BEFORE UPDATE ON public.blog_posts
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- Sample Blog Posts (Optional)
-- ============================================
INSERT INTO public.blog_posts (title_th, title_en, slug, content_th, content_en, excerpt_th, excerpt_en, status, published_at)
VALUES
(
    'Vibe Coding คืออะไร? และทำไมมันจะเปลี่ยนวิธีการเขียนโปรแกรม',
    'What is Vibe Coding? And why it will change programming',
    'introduction-to-vibe-coding',
    'Vibe Coding คือการเขียนโปรแกรมด้วย AI โดยที่เราแค่บอก AI ว่าต้องการอะไร แล้ว AI จะเขียนโค้ดให้...',
    'Vibe Coding is programming with AI where you just tell the AI what you want, and it writes the code for you...',
    'Vibe Coding คือการเขียนโปรแกรมด้วย AI โดยที่เราแค่บอก AI ว่าต้องการอะไร แล้ว AI จะเขียนโค้ดให้...',
    'Vibe Coding is programming with AI where you just tell the AI what you want, and it writes the code for you...',
    'published',
    NOW()
),
(
    'Automation ช่วยประหยัดเวลาได้อย่างไร: กรณีศึกษาจริง',
    'How Automation Saves Time: Real Case Studies',
    'automation-saves-time',
    'จากประสบการณ์กว่า 10 ปีในการทำ Automation ผมพบว่างานที่เสียเวลาซ้ำๆ สามารถ automate ได้เกือบทั้งหมด...',
    'From 10+ years of automation experience, I''ve found that repetitive time-consuming tasks can almost all be automated...',
    'จากประสบการณ์กว่า 10 ปีในการทำ Automation ผมพบว่างานที่เสียเวลาซ้ำๆ สามารถ automate ได้เกือบทั้งหมด...',
    'From 10+ years of automation experience, I''ve found that repetitive time-consuming tasks can almost all be automated...',
    'published',
    NOW() - INTERVAL '5 days'
),
(
    'AI แทนที่ Customer Support ได้ 99%: บทเรียนจากการ Implement จริง',
    'AI Replaces 99% of Customer Support: Lessons from Real Implementation',
    'ai-customer-support',
    'เมื่อเราตัดสินใจใช้ AI มาช่วยตอบคำถามลูกค้า ผลลัพธ์เกินความคาดหมาย...',
    'When we decided to use AI to help answer customer questions, the results exceeded expectations...',
    'เมื่อเราตัดสินใจใช้ AI มาช่วยตอบคำถามลูกค้า ผลลัพธ์เกินความคาดหมาย...',
    'When we decided to use AI to help answer customer questions, the results exceeded expectations...',
    'published',
    NOW() - INTERVAL '20 days'
)
ON CONFLICT (slug) DO NOTHING;
