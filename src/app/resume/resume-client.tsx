"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Mail,
  Lock,
  CheckCircle2,
  Loader2,
  Download,
  Shield,
  Briefcase,
  GraduationCap,
  Award,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Navbar, Footer } from "@/components/layout";
import { useLocale } from "@/providers/providers";
import { personalInfo, experience, skillCategories } from "@/lib/data";
import { PageTransition, FadeIn, StaggerContainer, StaggerItem } from "@/components/motion";
import { useOtpAuth } from "@/hooks";

export function ResumeClient() {
  const { locale, t } = useLocale();
  const {
    step,
    email,
    otp,
    isLoading,
    error,
    setEmail,
    setOtp,
    handleSendOtp,
    handleVerifyOtp,
  } = useOtpAuth();

  const isVerified = step === "verified";

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-24 pb-16">
        <div className="container mx-auto px-4">
          <PageTransition>
            {/* Back button */}
            <div className="mb-8">
              <Button asChild variant="ghost" size="sm">
                <Link href="/">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  {locale === "th" ? "กลับหน้าหลัก" : "Back to Home"}
                </Link>
              </Button>
            </div>

            <AnimatePresence mode="wait">
              {!isVerified ? (
                <motion.div
                  key="auth"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="max-w-md mx-auto"
                >
                  <Card className="border-border/50">
                    <CardHeader className="text-center">
                      <div className="mx-auto p-3 rounded-full bg-primary/10 text-primary w-fit mb-4">
                        <Lock className="h-6 w-6" />
                      </div>
                      <CardTitle className="text-2xl">{t.resume.title}</CardTitle>
                      <p className="text-muted-foreground mt-2">
                        {t.resume.subtitle}
                      </p>
                    </CardHeader>

                    <CardContent className="space-y-6">
                      {/* LINE Login Button (placeholder) */}
                      <Button
                        variant="outline"
                        className="w-full h-12 bg-[#00B900] hover:bg-[#00A000] text-white border-0"
                        disabled
                      >
                        <span className="mr-2 text-lg">💚</span>
                        {t.resume.loginWith} LINE
                        <Badge variant="secondary" className="ml-2 text-xs">
                          Coming Soon
                        </Badge>
                      </Button>

                      <div className="relative">
                        <Separator />
                        <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-card px-4 text-sm text-muted-foreground">
                          {t.resume.orEmail}
                        </span>
                      </div>

                      {/* Email/OTP Flow */}
                      <AnimatePresence mode="wait">
                        {step === "email" && (
                          <motion.div
                            key="email-step"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="space-y-4"
                          >
                            {error && (
                              <div className="p-3 rounded-lg bg-red-500/10 text-red-600 dark:text-red-400 text-sm text-center">
                                <AlertCircle className="h-4 w-4 inline mr-2" />
                                {error}
                              </div>
                            )}
                            <div className="space-y-2">
                              <Label htmlFor="email">Email</Label>
                              <Input
                                id="email"
                                type="email"
                                placeholder={t.resume.emailPlaceholder}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                              />
                            </div>
                            <Button
                              className="w-full"
                              onClick={handleSendOtp}
                              disabled={!email || isLoading}
                            >
                              {isLoading ? (
                                <Loader2 className="h-4 w-4 animate-spin mr-2" />
                              ) : (
                                <Mail className="h-4 w-4 mr-2" />
                              )}
                              {t.resume.sendOtp}
                            </Button>
                          </motion.div>
                        )}

                        {step === "otp" && (
                          <motion.div
                            key="otp-step"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="space-y-4"
                          >
                            {error && (
                              <div className="p-3 rounded-lg bg-red-500/10 text-red-600 dark:text-red-400 text-sm text-center">
                                <AlertCircle className="h-4 w-4 inline mr-2" />
                                {error}
                              </div>
                            )}
                            <div className="p-3 rounded-lg bg-green-500/10 text-green-600 dark:text-green-400 text-sm text-center">
                              <CheckCircle2 className="h-4 w-4 inline mr-2" />
                              {t.resume.otpSent}
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="otp">OTP Code</Label>
                              <Input
                                id="otp"
                                type="text"
                                placeholder="Enter 6-digit code"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                                maxLength={6}
                                className="text-center text-2xl tracking-widest"
                              />
                              <p className="text-xs text-muted-foreground text-center">
                                {locale === "th"
                                  ? "* Demo: กรอกเลขอะไรก็ได้ 6 หลัก"
                                  : "* Demo: Enter any 6 digits"}
                              </p>
                            </div>
                            <Button
                              className="w-full"
                              onClick={handleVerifyOtp}
                              disabled={otp.length !== 6 || isLoading}
                            >
                              {isLoading ? (
                                <Loader2 className="h-4 w-4 animate-spin mr-2" />
                              ) : (
                                <Shield className="h-4 w-4 mr-2" />
                              )}
                              {t.resume.verifyOtp}
                            </Button>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </CardContent>
                  </Card>
                </motion.div>
              ) : (
                <motion.div
                  key="resume"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="max-w-4xl mx-auto"
                >
                  {/* Success message */}
                  <FadeIn className="mb-8">
                    <div className="flex items-center justify-center gap-2 p-4 rounded-lg bg-green-500/10 text-green-600 dark:text-green-400">
                      <CheckCircle2 className="h-5 w-5" />
                      <span className="font-medium">
                        {locale === "th"
                          ? "ยืนยันตัวตนสำเร็จ! ยินดีต้อนรับครับ"
                          : "Verified successfully! Welcome"}
                      </span>
                    </div>
                  </FadeIn>

                  {/* Resume Header */}
                  <FadeIn delay={0.1} className="mb-8">
                    <Card className="border-border/50">
                      <CardContent className="p-8">
                        <div className="flex flex-col md:flex-row items-center gap-6">
                          <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-primary/20">
                            <Image
                              src={personalInfo.profileImage}
                              alt={personalInfo.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="text-center md:text-left flex-1">
                            <h1 className="text-3xl font-bold mb-2">
                              {personalInfo.name}
                            </h1>
                            <p className="text-xl text-primary mb-4">
                              Data, Automation, AI & Vibe Coding Expert
                            </p>
                            <div className="flex flex-wrap justify-center md:justify-start gap-2">
                              <Badge variant="secondary">10+ Years Experience</Badge>
                              <Badge variant="secondary">Open to Work</Badge>
                            </div>
                          </div>
                          <Button size="lg" className="gap-2" disabled>
                            <Download className="h-4 w-4" />
                            {t.resume.download}
                            <Badge variant="secondary" className="ml-1 text-xs">
                              Soon
                            </Badge>
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </FadeIn>

                  <div className="grid md:grid-cols-3 gap-8">
                    {/* Left Column - Experience */}
                    <div className="md:col-span-2 space-y-8">
                      {/* Experience */}
                      <FadeIn delay={0.2}>
                        <Card className="border-border/50">
                          <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                              <Briefcase className="h-5 w-5 text-primary" />
                              {t.about.experience}
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <StaggerContainer className="space-y-4">
                              {experience.map((exp) => (
                                <StaggerItem key={exp.domain}>
                                  <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                                    <div>
                                      <h3 className="font-semibold">{exp.domain}</h3>
                                      <p className="text-sm text-muted-foreground">
                                        {locale === "th" ? exp.level : exp.levelEn}
                                      </p>
                                    </div>
                                    <Badge variant="outline" className="font-mono">
                                      {exp.years} {t.about.years}
                                    </Badge>
                                  </div>
                                </StaggerItem>
                              ))}
                            </StaggerContainer>
                          </CardContent>
                        </Card>
                      </FadeIn>

                      {/* Key Achievements */}
                      <FadeIn delay={0.3}>
                        <Card className="border-border/50">
                          <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                              <Award className="h-5 w-5 text-primary" />
                              Key Achievements
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <ul className="space-y-3">
                              <li className="flex items-start gap-3">
                                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-bold">
                                  1
                                </span>
                                <span className="text-muted-foreground">
                                  {locale === "th"
                                    ? "สร้าง AI Agent ที่แทนที่ Customer Support ได้ ~99%"
                                    : "Built AI Agent replacing ~99% of Customer Support"}
                                </span>
                              </li>
                              <li className="flex items-start gap-3">
                                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-bold">
                                  2
                                </span>
                                <span className="text-muted-foreground">
                                  {locale === "th"
                                    ? "สร้างระบบ Automation ที่ประหยัดเวลาปีละ 240+ ชั่วโมง"
                                    : "Created Automation saving 240+ hours yearly"}
                                </span>
                              </li>
                              <li className="flex items-start gap-3">
                                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-bold">
                                  3
                                </span>
                                <span className="text-muted-foreground">
                                  {locale === "th"
                                    ? "พัฒนา BI Dashboards ครบทุกแผนกขององค์กร"
                                    : "Developed BI Dashboards for all company departments"}
                                </span>
                              </li>
                              <li className="flex items-start gap-3">
                                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-bold">
                                  4
                                </span>
                                <span className="text-muted-foreground">
                                  {locale === "th"
                                    ? "สร้าง Production Apps ด้วย Vibe Coding"
                                    : "Built Production Apps with Vibe Coding"}
                                </span>
                              </li>
                            </ul>
                          </CardContent>
                        </Card>
                      </FadeIn>
                    </div>

                    {/* Right Column - Skills & Education */}
                    <div className="space-y-8">
                      {/* Skills */}
                      <FadeIn delay={0.2}>
                        <Card className="border-border/50">
                          <CardHeader>
                            <CardTitle className="text-lg">Skills</CardTitle>
                          </CardHeader>
                          <CardContent className="space-y-4">
                            {skillCategories.map((category) => (
                              <div key={category.nameEn}>
                                <h4 className="text-sm font-medium mb-2 text-primary">
                                  {locale === "th" ? category.name : category.nameEn}
                                </h4>
                                <div className="flex flex-wrap gap-1.5">
                                  {category.skills.map((skill) => (
                                    <Badge
                                      key={skill}
                                      variant="secondary"
                                      className="text-xs"
                                    >
                                      {skill}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            ))}
                          </CardContent>
                        </Card>
                      </FadeIn>

                      {/* Education */}
                      <FadeIn delay={0.3}>
                        <Card className="border-border/50">
                          <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-lg">
                              <GraduationCap className="h-5 w-5 text-primary" />
                              {t.about.education}
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <p className="text-muted-foreground">
                              {t.about.educationDetail}
                            </p>
                          </CardContent>
                        </Card>
                      </FadeIn>

                      {/* Contact CTA */}
                      <FadeIn delay={0.4}>
                        <Card className="border-primary/50 bg-gradient-to-br from-primary/5 to-accent/5">
                          <CardContent className="p-6 text-center">
                            <h3 className="font-semibold mb-2">
                              {locale === "th"
                                ? "สนใจพูดคุยเพิ่มเติม?"
                                : "Interested in talking more?"}
                            </h3>
                            <p className="text-sm text-muted-foreground mb-4">
                              {locale === "th"
                                ? "ติดต่อผมได้เลยครับ"
                                : "Feel free to reach out"}
                            </p>
                            <Button asChild className="w-full">
                              <Link href="/#contact">
                                <Mail className="h-4 w-4 mr-2" />
                                {t.hero.cta.contact}
                              </Link>
                            </Button>
                          </CardContent>
                        </Card>
                      </FadeIn>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </PageTransition>
        </div>
      </main>
      <Footer />
    </>
  );
}
