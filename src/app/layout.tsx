import type { Metadata } from "next";
import { Manrope, Plus_Jakarta_Sans } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://ruby-science-academy.vercel.app"),
  title: {
    default: "RUBY Science Academy | A/L Science Tuition in Colombo Kotahena",
    template: "%s | RUBY Science Academy",
  },
  description:
    "Premium Tamil medium A/L Science tuition for Maths, Physics, and Chemistry in Colombo Kotahena.",
  icons: {
    icon: [
      { url: "/ruby-logo.jpeg", sizes: "32x32", type: "image/jpeg" },
      { url: "/ruby-logo.jpeg", sizes: "16x16", type: "image/jpeg" },
    ],
    apple: "/ruby-logo.jpeg",
    shortcut: "/ruby-logo.jpeg",
  },
  openGraph: {
    title: "RUBY Science Academy",
    description:
      "Modern A/L Science tuition institute website for students and parents in Colombo Kotahena.",
    type: "website",
    siteName: "RUBY Science Academy",
  },
  twitter: {
    card: "summary_large_image",
    title: "RUBY Science Academy",
    description:
      "Tamil medium A/L Science classes in Colombo Kotahena for Maths, Physics, and Chemistry.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${jakarta.variable} ${manrope.variable} h-full scroll-smooth antialiased`}
    >
      <body className="min-h-full bg-background text-foreground">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
