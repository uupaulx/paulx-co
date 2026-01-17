"use client";

import { Navbar, Footer } from "@/components/layout";
import {
  HeroSection,
  AboutSection,
  PortfolioSection,
  SkillsSection,
  ContactSection,
} from "@/components/sections";

export function HomeClient() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        <HeroSection />
        <AboutSection />
        <PortfolioSection />
        <SkillsSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
