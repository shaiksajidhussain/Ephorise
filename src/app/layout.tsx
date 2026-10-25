import type { Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Suspense } from "react";
import { Footer } from "@/components/layout/Footer";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { Motion } from "@/components/motion/Motion";
import { rootMetadata } from "@/lib/seo";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata = rootMetadata();

export const viewport: Viewport = {
  themeColor: "#080D18",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`} suppressHydrationWarning>
      <body className="flex min-h-full flex-col" suppressHydrationWarning>
        <a className="skip-link" href="#content">
          Skip to content
        </a>
        <Suspense fallback={null}>
          <Motion />
        </Suspense>
        <SiteHeader />
        <div id="content" className="relative z-[1] flex-1">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
