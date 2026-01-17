"use client";

import { motion } from "framer-motion";
import { Briefcase, GraduationCap, Award, Target } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useLocale } from "@/providers/providers";
import { experience } from "@/lib/data";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/motion";

export function AboutSection() {
  const { locale, t } = useLocale();

  return (
    <section id="about" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <FadeIn className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {t.about.title}
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {t.about.description}
          </p>
        </FadeIn>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left: Experience Cards */}
          <div>
            <FadeIn delay={0.1}>
              <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <Briefcase className="h-5 w-5 text-primary" />
                {t.about.experience}
              </h3>
            </FadeIn>

            <StaggerContainer className="grid sm:grid-cols-2 gap-4">
              {experience.map((exp, index) => (
                <StaggerItem key={exp.domain}>
                  <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.2 }}>
                    <Card className="h-full border-border/50 hover:border-primary/50 transition-colors">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="font-semibold">{exp.domain}</h4>
                          <Badge variant="secondary" className="font-mono">
                            {exp.years} {t.about.years}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {locale === "th" ? exp.level : exp.levelEn}
                        </p>
                        {/* Progress bar */}
                        <div className="mt-4 h-1.5 bg-muted rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${(exp.years / 10) * 100}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: index * 0.1 }}
                            className="h-full bg-gradient-to-r from-primary to-accent rounded-full"
                          />
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>

          {/* Right: Education & Highlights */}
          <div className="space-y-6">
            {/* Education */}
            <FadeIn delay={0.2}>
              <Card className="border-border/50">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <GraduationCap className="h-5 w-5 text-primary" />
                    {t.about.education}
                  </h3>
                  <p className="text-muted-foreground">{t.about.educationDetail}</p>
                </CardContent>
              </Card>
            </FadeIn>

            {/* Key Highlights */}
            <FadeIn delay={0.3}>
              <Card className="border-border/50 bg-gradient-to-br from-primary/5 to-accent/5">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <Target className="h-5 w-5 text-primary" />
                    Key Highlights
                  </h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                      <span className="text-muted-foreground">
                        {locale === "th"
                          ? "AI Agent ที่แทนที่ Customer Support ได้ ~99%"
                          : "AI Agent replacing ~99% of Customer Support"}
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                      <span className="text-muted-foreground">
                        {locale === "th"
                          ? "ประหยัดเวลาปีละ 240+ ชั่วโมงด้วย Automation"
                          : "Save 240+ hours yearly with Automation"}
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                      <span className="text-muted-foreground">
                        {locale === "th"
                          ? "Data Dashboards ครบทุกแผนกขององค์กร"
                          : "Data Dashboards for all company departments"}
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                      <span className="text-muted-foreground">
                        {locale === "th"
                          ? "สร้าง Production Apps ด้วย Vibe Coding"
                          : "Build Production Apps with Vibe Coding"}
                      </span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </FadeIn>

            {/* Certifications placeholder */}
            <FadeIn delay={0.4}>
              <Card className="border-border/50 border-dashed">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <Award className="h-5 w-5 text-primary" />
                    Certifications
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {locale === "th"
                      ? "จะเพิ่มเติมภายหลัง"
                      : "To be added later"}
                  </p>
                </CardContent>
              </Card>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}
