import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Social Wave Growth - Ride the Wave to Social Success",
  description: "Schedule posts, analyze performance, and create engaging content across all your social platforms — all from one powerful dashboard.",
  keywords: ["social media management", "scheduling", "analytics", "content creation", "AI"],
  openGraph: {
    title: "Social Wave Growth - Ride the Wave to Social Success",
    description: "The all-in-one platform for social media management.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
