"use client";

import { useState, useCallback } from "react";
import { sendOtp, verifyOtp, logResumeAccess } from "@/lib/supabase/auth";

export type OtpStep = "email" | "otp" | "verified";

interface UseOtpAuthOptions {
  onSuccess?: (email: string) => void;
  onError?: (error: string) => void;
}

interface UseOtpAuthReturn {
  step: OtpStep;
  email: string;
  otp: string;
  isLoading: boolean;
  error: string | null;
  setEmail: (email: string) => void;
  setOtp: (otp: string) => void;
  handleSendOtp: () => Promise<void>;
  handleVerifyOtp: () => Promise<void>;
  reset: () => void;
}

export function useOtpAuth(options?: UseOtpAuthOptions): UseOtpAuthReturn {
  const [step, setStep] = useState<OtpStep>("email");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSendOtp = useCallback(async () => {
    if (!email) {
      setError("Please enter your email");
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const result = await sendOtp(email);

      if (result.success) {
        setStep("otp");
      } else {
        setError(result.message);
      }
    } catch (err) {
      console.error("Error sending OTP:", err);
      setError("Failed to send OTP. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }, [email]);

  const handleVerifyOtp = useCallback(async () => {
    if (!otp) {
      setError("Please enter the OTP code");
      return;
    }

    if (otp.length !== 6 || !/^\d+$/.test(otp)) {
      setError("OTP must be 6 digits");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const result = await verifyOtp(email, otp);

      if (result.success) {
        // Log resume access
        await logResumeAccess("email_otp", email);

        setStep("verified");
        options?.onSuccess?.(email);
      } else {
        setError(result.message);
        options?.onError?.(result.message);
      }
    } catch (err) {
      console.error("Error verifying OTP:", err);
      const errorMessage = "Failed to verify OTP. Please try again.";
      setError(errorMessage);
      options?.onError?.(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, [email, otp, options]);

  const reset = useCallback(() => {
    setStep("email");
    setEmail("");
    setOtp("");
    setError(null);
    setIsLoading(false);
  }, []);

  return {
    step,
    email,
    otp,
    isLoading,
    error,
    setEmail,
    setOtp,
    handleSendOtp,
    handleVerifyOtp,
    reset,
  };
}
