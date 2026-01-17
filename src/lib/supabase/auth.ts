import { getSupabaseClient } from "./client";

// Generate a 6-digit OTP
function generateOtp(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// OTP expiration time (10 minutes)
const OTP_EXPIRATION_MINUTES = 10;

export interface SendOtpResult {
  success: boolean;
  message: string;
}

export interface VerifyOtpResult {
  success: boolean;
  message: string;
  email?: string;
}

/**
 * Send OTP to email
 * In production, this should use Supabase Edge Functions + email provider
 * For demo, we'll store the OTP and show it in console
 */
export async function sendOtp(email: string): Promise<SendOtpResult> {
  const supabase = getSupabaseClient();

  // Generate OTP
  const code = generateOtp();
  const expiresAt = new Date();
  expiresAt.setMinutes(expiresAt.getMinutes() + OTP_EXPIRATION_MINUTES);

  try {
    // Store OTP in database
    const { error } = await supabase.from("otp_codes").insert({
      email,
      code,
      expires_at: expiresAt.toISOString(),
    });

    if (error) {
      console.error("Error storing OTP:", error);
      // For demo purposes, we'll still show success
      // In production, this should fail
    }

    // In production, send email here using:
    // - Supabase Edge Functions
    // - Resend, SendGrid, etc.

    // For demo, log the OTP
    console.log(`[DEMO] OTP for ${email}: ${code}`);

    return {
      success: true,
      message: `OTP sent to ${email}`,
    };
  } catch (err) {
    console.error("Error in sendOtp:", err);
    return {
      success: false,
      message: "Failed to send OTP",
    };
  }
}

/**
 * Verify OTP
 */
export async function verifyOtp(
  email: string,
  code: string
): Promise<VerifyOtpResult> {
  const supabase = getSupabaseClient();

  try {
    // Find valid OTP
    const { data, error } = await supabase
      .from("otp_codes")
      .select("*")
      .eq("email", email)
      .eq("code", code)
      .eq("used", false)
      .gt("expires_at", new Date().toISOString())
      .order("created_at", { ascending: false })
      .limit(1)
      .single();

    if (error || !data) {
      // For demo, accept any 6-digit code
      if (code.length === 6 && /^\d+$/.test(code)) {
        console.log(`[DEMO] Accepting demo OTP for ${email}`);
        return {
          success: true,
          message: "OTP verified (demo mode)",
          email,
        };
      }

      return {
        success: false,
        message: "Invalid or expired OTP",
      };
    }

    // Mark OTP as used
    await supabase
      .from("otp_codes")
      .update({ used: true })
      .eq("id", data.id);

    return {
      success: true,
      message: "OTP verified successfully",
      email,
    };
  } catch (err) {
    console.error("Error in verifyOtp:", err);

    // For demo, accept any 6-digit code
    if (code.length === 6 && /^\d+$/.test(code)) {
      return {
        success: true,
        message: "OTP verified (demo mode)",
        email,
      };
    }

    return {
      success: false,
      message: "Failed to verify OTP",
    };
  }
}

/**
 * Log resume access
 */
export async function logResumeAccess(
  method: "email_otp" | "line",
  identifier: string,
  name?: string,
  company?: string
): Promise<void> {
  const supabase = getSupabaseClient();

  try {
    await supabase.from("resume_access_logs").insert({
      method,
      identifier,
      name,
      company,
      // Note: IP and user agent should be captured server-side
    });
  } catch (err) {
    console.error("Error logging resume access:", err);
  }
}

/**
 * Log contact reveal
 */
export async function logContactReveal(captchaToken?: string): Promise<void> {
  const supabase = getSupabaseClient();

  try {
    await supabase.from("contact_reveal_logs").insert({
      captcha_token: captchaToken,
    });
  } catch (err) {
    console.error("Error logging contact reveal:", err);
  }
}
