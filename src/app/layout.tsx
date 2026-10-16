import type { Metadata } from "next";
import "./globals.css";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({ subsets: ['latin'], variable: '--font-sans' });

export const metadata: Metadata = {
  metadataBase: new URL("https://phause.com"),
  title: "Phause | Strengthen. Aware. Defend.",
  description:
    "Phause delivers enterprise-grade cybersecurity solutions — threat detection, security audits, cloud protection and 24/7 monitoring to keep your business safe.",
  keywords: [
    "cybersecurity", "security audit", "threat detection",
    "cloud security", "phause", "penetration testing",
  ],
  openGraph: {
    title: "Phause | Strengthen. Aware. Defend.",
    description: "Enterprise-grade cybersecurity solutions.",
    url: "https://phause.com",
    siteName: "Phause",
    images: ["/logo.png"],
    type: "website",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={cn("font-sans", geist.variable)}>
      <body className="antialiased">{children}</body>
    </html>
  );
}