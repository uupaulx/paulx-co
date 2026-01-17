"use client";

import Link from "next/link";
import { Github, Linkedin, Mail, Heart } from "lucide-react";
import { useLocale } from "@/providers/providers";
import { personalInfo } from "@/lib/data";

export function Footer() {
  const { t } = useLocale();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <Link
              href="/"
              className="text-2xl font-bold text-gradient inline-block mb-4"
            >
              PaulX
            </Link>
            <p className="text-muted-foreground text-sm max-w-xs">
              Data, Automation, AI & Vibe Coding Expert with 10+ years of experience
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <nav className="flex flex-col gap-2">
              <Link
                href="#about"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {t.nav.about}
              </Link>
              <Link
                href="#portfolio"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {t.nav.portfolio}
              </Link>
              <Link
                href="#skills"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {t.nav.skills}
              </Link>
              <Link
                href="/blog"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {t.nav.blog}
              </Link>
            </nav>
          </div>

          {/* Social */}
          <div>
            <h3 className="font-semibold mb-4">Connect</h3>
            <div className="flex gap-4">
              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-muted hover:bg-primary hover:text-primary-foreground transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href={`mailto:${personalInfo.email}`}
                className="p-2 rounded-lg bg-muted hover:bg-primary hover:text-primary-foreground transition-colors"
                aria-label="Email"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © {currentYear} Paul (Udomchai). {t.footer.rights}.
          </p>
          <p className="text-sm text-muted-foreground flex items-center gap-1">
            {t.footer.madeWith}{" "}
            <Heart className="h-4 w-4 text-accent fill-accent" /> & AI
          </p>
        </div>
      </div>
    </footer>
  );
}
