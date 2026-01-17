"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BarChart3,
  Bot,
  Zap,
  Code2,
  ExternalLink,
  ChevronRight,
  Building2,
  Rocket,
} from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLocale } from "@/providers/providers";
import { projects, getLocalizedContent } from "@/lib/data";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/motion";

const categoryIcons = {
  data: BarChart3,
  automation: Zap,
  ai: Bot,
  vibeCoding: Code2,
};

const categories = [
  { id: "all", label: { th: "ทั้งหมด", en: "All" } },
  { id: "data", label: { th: "Data", en: "Data" } },
  { id: "automation", label: { th: "Automation", en: "Automation" } },
  { id: "ai", label: { th: "AI", en: "AI" } },
  { id: "vibeCoding", label: { th: "Vibe Coding", en: "Vibe Coding" } },
];

export function PortfolioSection() {
  const { locale, t } = useLocale();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [expandedProject, setExpandedProject] = useState<string | null>(null);

  const filteredProjects =
    selectedCategory === "all"
      ? projects
      : projects.filter((p) => p.category === selectedCategory);

  return (
    <section id="portfolio" className="py-24">
      <div className="container mx-auto px-4">
        <FadeIn className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {t.portfolio.title}
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {t.portfolio.subtitle}
          </p>
        </FadeIn>

        {/* Category Filter */}
        <FadeIn delay={0.1} className="flex justify-center mb-12">
          <Tabs
            value={selectedCategory}
            onValueChange={setSelectedCategory}
            className="w-auto"
          >
            <TabsList className="flex-wrap h-auto gap-1 p-1">
              {categories.map((cat) => (
                <TabsTrigger
                  key={cat.id}
                  value={cat.id}
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  {cat.label[locale]}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </FadeIn>

        {/* Projects Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProjects.map((project) => {
                const Icon = categoryIcons[project.category];
                const isExpanded = expandedProject === project.id;

                return (
                  <StaggerItem key={project.id}>
                    <motion.div
                      layout
                      whileHover={{ y: -4 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Card
                        className={`h-full cursor-pointer border-border/50 hover:border-primary/50 transition-all ${
                          isExpanded ? "ring-2 ring-primary" : ""
                        }`}
                        onClick={() =>
                          setExpandedProject(isExpanded ? null : project.id)
                        }
                      >
                        <CardHeader className="pb-4">
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex items-center gap-3">
                              <div className="p-2 rounded-lg bg-primary/10 text-primary">
                                <Icon className="h-5 w-5" />
                              </div>
                              <div>
                                <h3 className="font-semibold leading-tight">
                                  {getLocalizedContent(project.title, locale)}
                                </h3>
                                <div className="flex items-center gap-2 mt-1">
                                  <Badge variant="secondary" className="text-xs">
                                    {project.category}
                                  </Badge>
                                  {project.status === "production" && (
                                    <Badge className="text-xs bg-green-500/10 text-green-600 dark:text-green-400 border-0">
                                      <Rocket className="h-3 w-3 mr-1" />
                                      Production
                                    </Badge>
                                  )}
                                  {project.status === "internal" && (
                                    <Badge
                                      variant="outline"
                                      className="text-xs border-muted-foreground/30"
                                    >
                                      <Building2 className="h-3 w-3 mr-1" />
                                      Internal
                                    </Badge>
                                  )}
                                </div>
                              </div>
                            </div>
                            <ChevronRight
                              className={`h-5 w-5 text-muted-foreground transition-transform ${
                                isExpanded ? "rotate-90" : ""
                              }`}
                            />
                          </div>
                        </CardHeader>

                        <CardContent>
                          <p className="text-sm text-muted-foreground mb-4">
                            {getLocalizedContent(project.description, locale)}
                          </p>

                          {/* Tech Stack */}
                          <div className="flex flex-wrap gap-1.5 mb-4">
                            {project.tech.map((tech) => (
                              <span
                                key={tech}
                                className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>

                          {/* Expanded Content */}
                          <AnimatePresence>
                            {isExpanded && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.2 }}
                                className="border-t pt-4 mt-4"
                              >
                                {/* Features */}
                                <div className="mb-4">
                                  <h4 className="text-sm font-medium mb-2">
                                    Features:
                                  </h4>
                                  <ul className="text-sm text-muted-foreground space-y-1">
                                    {project.features[locale].map((feature, i) => (
                                      <li key={i} className="flex items-start gap-2">
                                        <span className="text-primary">•</span>
                                        {feature}
                                      </li>
                                    ))}
                                  </ul>
                                </div>

                                {/* Impact */}
                                <div>
                                  <h4 className="text-sm font-medium mb-2 text-primary">
                                    {t.portfolio.impact}:
                                  </h4>
                                  <ul className="text-sm space-y-1">
                                    {project.impact[locale].map((impact, i) => (
                                      <li
                                        key={i}
                                        className="flex items-start gap-2 text-muted-foreground"
                                      >
                                        <span className="text-accent">✓</span>
                                        {impact}
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </CardContent>
                      </Card>
                    </motion.div>
                  </StaggerItem>
                );
              })}
            </StaggerContainer>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
