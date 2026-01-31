import type { Metadata } from "next";
import { DM_Sans, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Providers } from "@/providers/providers";

const dmSans = DM_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const playfair = Playfair_Display({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "Paul (Udomchai) | Data, Automation, AI & Vibe Coding Expert",
    template: "%s | PaulX",
  },
  verification: {
    google: "rPj0DdG7zIs2itoxQsf5ckTNSeb5dHm0dQ8wvBHmWa4",
  },
  description:
    "Portfolio website of Paul (Udomchai) - 10+ years of experience in Data, Automation, AI, and Vibe Coding. Building intelligent solutions that transform businesses.",
  keywords: [
    "Data Analyst",
    "AI Developer",
    "Automation Expert",
    "Vibe Coding",
    "Thailand",
    "Bangkok",
    "n8n",
    "Power BI",
    "Claude API",
    "OpenAI",
  ],
  authors: [{ name: "Paul (Udomchai)", url: "https://paulx.co" }],
  creator: "Paul (Udomchai)",
  openGraph: {
    type: "website",
    locale: "th_TH",
    alternateLocale: "en_US",
    url: "https://paulx.co",
    siteName: "PaulX Portfolio",
    title: "Paul (Udomchai) | Data, Automation, AI & Vibe Coding Expert",
    description:
      "10+ years of experience building intelligent solutions with Data, Automation, AI, and Vibe Coding",
    images: [
      {
        url: "https://i.ibb.co/zH7N2y5h/20251231-221309-213.jpg",
        width: 1200,
        height: 630,
        alt: "Paul (Udomchai) - Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Paul (Udomchai) | Data, Automation, AI & Vibe Coding Expert",
    description:
      "10+ years of experience building intelligent solutions",
    images: ["https://i.ibb.co/zH7N2y5h/20251231-221309-213.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th" suppressHydrationWarning>
      <body
        className={`${dmSans.variable} ${playfair.variable} font-sans antialiased`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
