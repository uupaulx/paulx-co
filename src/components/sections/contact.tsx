"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  Phone,
  Linkedin,
  MessageCircle,
  Shield,
  CheckCircle2,
  Loader2,
  Eye,
  RefreshCw,
  AlertCircle,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLocale } from "@/providers/providers";
import { personalInfo } from "@/lib/data";
import { FadeIn } from "@/components/motion";
import { logContactReveal } from "@/lib/supabase/auth";

interface MathChallenge {
  num1: number;
  num2: number;
  operator: "+" | "-" | "×";
  answer: number;
}

function generateChallenge(): MathChallenge {
  const operators: ("+" | "-" | "×")[] = ["+", "-", "×"];
  const operator = operators[Math.floor(Math.random() * operators.length)];

  let num1: number, num2: number, answer: number;

  switch (operator) {
    case "+":
      num1 = Math.floor(Math.random() * 20) + 1;
      num2 = Math.floor(Math.random() * 20) + 1;
      answer = num1 + num2;
      break;
    case "-":
      num1 = Math.floor(Math.random() * 20) + 10;
      num2 = Math.floor(Math.random() * 10) + 1;
      answer = num1 - num2;
      break;
    case "×":
      num1 = Math.floor(Math.random() * 10) + 1;
      num2 = Math.floor(Math.random() * 10) + 1;
      answer = num1 * num2;
      break;
  }

  return { num1, num2, operator, answer };
}

export function ContactSection() {
  const { locale, t } = useLocale();
  const [isVerified, setIsVerified] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [userAnswer, setUserAnswer] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [attempts, setAttempts] = useState(0);
  const [challenge, setChallenge] = useState<MathChallenge | null>(null);

  // Generate challenge on mount
  useEffect(() => {
    setChallenge(generateChallenge());
  }, []);

  const refreshChallenge = useCallback(() => {
    setChallenge(generateChallenge());
    setUserAnswer("");
    setError(null);
  }, []);

  const handleVerify = async () => {
    if (!challenge) return;

    const parsedAnswer = parseInt(userAnswer, 10);

    if (isNaN(parsedAnswer)) {
      setError(locale === "th" ? "กรุณากรอกตัวเลข" : "Please enter a number");
      return;
    }

    if (parsedAnswer !== challenge.answer) {
      setAttempts((prev) => prev + 1);
      setError(
        locale === "th"
          ? `คำตอบไม่ถูกต้อง ลองใหม่อีกครั้ง (${attempts + 1}/3)`
          : `Incorrect answer. Try again (${attempts + 1}/3)`
      );

      // Refresh challenge after 3 failed attempts
      if (attempts >= 2) {
        setTimeout(() => {
          refreshChallenge();
          setAttempts(0);
        }, 1500);
      }
      return;
    }

    // Correct answer
    setIsVerifying(true);
    setError(null);

    // Log the reveal
    try {
      await logContactReveal("math-challenge-verified");
    } catch (err) {
      console.error("Failed to log contact reveal:", err);
    }

    // Simulate short delay for UX
    setTimeout(() => {
      setIsVerified(true);
      setIsVerifying(false);
    }, 800);
  };

  const contactItems = [
    {
      icon: Mail,
      label: t.contact.email,
      value: personalInfo.email,
      href: `mailto:${personalInfo.email}`,
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
    },
    {
      icon: Phone,
      label: t.contact.phone,
      value: personalInfo.phone,
      href: `tel:${personalInfo.phone.replace(/[^+0-9]/g, "")}`,
      color: "text-green-500",
      bgColor: "bg-green-500/10",
    },
    {
      icon: MessageCircle,
      label: t.contact.lineId,
      value: personalInfo.lineId,
      href: `https://line.me/ti/p/~${personalInfo.lineId}`,
      color: "text-emerald-500",
      bgColor: "bg-emerald-500/10",
    },
    {
      icon: Linkedin,
      label: t.contact.linkedin,
      value: "linkedin.com/in/udomchai",
      href: personalInfo.linkedin,
      color: "text-sky-500",
      bgColor: "bg-sky-500/10",
    },
  ];

  return (
    <section id="contact" className="py-24">
      <div className="container mx-auto px-4">
        <FadeIn className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {t.contact.title}
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {t.contact.subtitle}
          </p>
        </FadeIn>

        <div className="max-w-2xl mx-auto">
          <FadeIn delay={0.1}>
            <Card className="border-border/50 overflow-hidden">
              {/* Gradient top */}
              <div className="h-1.5 bg-gradient-to-r from-primary via-accent to-primary" />

              <CardHeader className="text-center pb-4">
                <div className="mx-auto p-3 rounded-full bg-primary/10 text-primary w-fit mb-4">
                  <Shield className="h-6 w-6" />
                </div>
                <CardTitle className="text-xl">
                  {isVerified
                    ? locale === "th"
                      ? "ข้อมูลติดต่อ"
                      : "Contact Information"
                    : t.contact.verifyHuman}
                </CardTitle>
                {!isVerified && (
                  <p className="text-sm text-muted-foreground mt-2">
                    {locale === "th"
                      ? "ตอบคำถามง่ายๆ เพื่อดูข้อมูลติดต่อ"
                      : "Answer a simple question to see contact info"}
                  </p>
                )}
              </CardHeader>

              <CardContent className="space-y-6">
                <AnimatePresence mode="wait">
                  {!isVerified ? (
                    <motion.div
                      key="verify"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="space-y-4"
                    >
                      {/* Math challenge */}
                      {challenge && (
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <Label htmlFor="challenge" className="text-base">
                              {locale === "th" ? "คำนวณ:" : "Calculate:"}
                            </Label>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={refreshChallenge}
                              className="text-muted-foreground hover:text-foreground"
                            >
                              <RefreshCw className="h-4 w-4 mr-1" />
                              {locale === "th" ? "เปลี่ยนโจทย์" : "New question"}
                            </Button>
                          </div>

                          <div className="flex items-center gap-3">
                            {/* Challenge display */}
                            <div className="flex-1 p-4 rounded-lg bg-muted/50 text-center">
                              <span className="text-2xl font-mono font-bold">
                                {challenge.num1} {challenge.operator} {challenge.num2} = ?
                              </span>
                            </div>
                          </div>

                          <div className="flex gap-2">
                            <Input
                              id="challenge"
                              type="text"
                              inputMode="numeric"
                              placeholder={
                                locale === "th" ? "คำตอบ..." : "Answer..."
                              }
                              value={userAnswer}
                              onChange={(e) => {
                                setUserAnswer(e.target.value);
                                setError(null);
                              }}
                              onKeyDown={(e) => e.key === "Enter" && handleVerify()}
                              className="text-center text-lg font-mono"
                              autoComplete="off"
                            />
                            <Button
                              onClick={handleVerify}
                              disabled={!userAnswer || isVerifying}
                              className="min-w-[140px]"
                            >
                              {isVerifying ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                              ) : (
                                <>
                                  <Eye className="h-4 w-4 mr-2" />
                                  {t.contact.revealContact}
                                </>
                              )}
                            </Button>
                          </div>

                          {/* Error message */}
                          {error && (
                            <motion.div
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="flex items-center gap-2 text-sm text-red-500"
                            >
                              <AlertCircle className="h-4 w-4" />
                              {error}
                            </motion.div>
                          )}
                        </div>
                      )}
                    </motion.div>
                  ) : (
                    <motion.div
                      key="contacts"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="space-y-4"
                    >
                      {/* Success message */}
                      <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="flex items-center justify-center gap-2 text-green-600 dark:text-green-400 bg-green-500/10 rounded-lg py-3"
                      >
                        <CheckCircle2 className="h-5 w-5" />
                        <span className="font-medium">
                          {locale === "th"
                            ? "ยืนยันสำเร็จ!"
                            : "Verified successfully!"}
                        </span>
                      </motion.div>

                      {/* Contact list */}
                      <div className="grid gap-3">
                        {contactItems.map((item, index) => (
                          <motion.a
                            key={item.label}
                            href={item.href}
                            target={
                              item.href.startsWith("http") ? "_blank" : undefined
                            }
                            rel={
                              item.href.startsWith("http")
                                ? "noopener noreferrer"
                                : undefined
                            }
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="flex items-center gap-4 p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors group"
                          >
                            <div
                              className={`p-2.5 rounded-lg ${item.bgColor} ${item.color}`}
                            >
                              <item.icon className="h-5 w-5" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm text-muted-foreground">
                                {item.label}
                              </p>
                              <p className="font-medium truncate group-hover:text-primary transition-colors">
                                {item.value}
                              </p>
                            </div>
                          </motion.a>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </CardContent>
            </Card>
          </FadeIn>

          {/* Alternative CTA */}
          <FadeIn delay={0.2} className="text-center mt-8">
            <p className="text-muted-foreground mb-4">
              {locale === "th"
                ? "หรือเชื่อมต่อกับผมบน LinkedIn"
                : "Or connect with me on LinkedIn"}
            </p>
            <Button asChild variant="outline" size="lg">
              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Linkedin className="h-4 w-4 mr-2" />
                Connect on LinkedIn
              </a>
            </Button>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
