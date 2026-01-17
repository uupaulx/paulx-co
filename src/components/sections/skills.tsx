"use client";

import { motion } from "framer-motion";
import {
  Database,
  Zap,
  Bot,
  Sparkles,
  CheckCircle2,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLocale } from "@/providers/providers";
import { skillCategories } from "@/lib/data";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/motion";

const categoryIcons: Record<string, React.ElementType> = {
  Data: Database,
  Automation: Zap,
  AI: Bot,
  "Vibe Coding": Sparkles,
};

const categoryColors: Record<string, string> = {
  Data: "from-blue-500 to-cyan-500",
  Automation: "from-amber-500 to-orange-500",
  AI: "from-violet-500 to-purple-500",
  "Vibe Coding": "from-pink-500 to-rose-500",
};

export function SkillsSection() {
  const { locale, t } = useLocale();

  return (
    <section id="skills" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <FadeIn className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {t.skills.title}
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {t.skills.subtitle}
          </p>
        </FadeIn>

        <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {skillCategories.map((category, index) => {
            const Icon = categoryIcons[category.nameEn] || Database;
            const gradientClass = categoryColors[category.nameEn] || "from-primary to-accent";

            return (
              <StaggerItem key={category.nameEn}>
                <motion.div
                  whileHover={{ y: -8, scale: 1.02 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                >
                  <Card className="h-full border-border/50 hover:border-primary/50 transition-all overflow-hidden group">
                    {/* Gradient header */}
                    <div className={`h-1.5 bg-gradient-to-r ${gradientClass}`} />

                    <CardHeader className="pb-4">
                      <div className="flex items-center gap-3">
                        <div
                          className={`p-2.5 rounded-xl bg-gradient-to-br ${gradientClass} text-white shadow-lg`}
                        >
                          <Icon className="h-5 w-5" />
                        </div>
                        <CardTitle className="text-lg">
                          {locale === "th" ? category.name : category.nameEn}
                        </CardTitle>
                      </div>
                    </CardHeader>

                    <CardContent>
                      <ul className="space-y-3">
                        {category.skills.map((skill, skillIndex) => (
                          <motion.li
                            key={skill}
                            initial={{ opacity: 0, x: -10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: skillIndex * 0.1 }}
                            className="flex items-center gap-2 text-sm text-muted-foreground group-hover:text-foreground transition-colors"
                          >
                            <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0" />
                            {skill}
                          </motion.li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </motion.div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>

        {/* Additional skills note */}
        <FadeIn delay={0.4} className="text-center mt-12">
          <p className="text-sm text-muted-foreground">
            {locale === "th"
              ? "และเครื่องมืออื่นๆ อีกมากมายที่พร้อมเรียนรู้ตามความต้องการของโปรเจค"
              : "And many more tools ready to learn based on project requirements"}
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
