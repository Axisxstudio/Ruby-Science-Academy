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
    "Premium Tamil medium A/L Science tuition for Maths, Physics, and Chemistry in Colombo Kotahena. Expert teachers and proven results for 2028 A/L Science Stream.",
  keywords: [
    "A/L Science Tuition",
    "Tamil Medium A/L Science",
    "Physics Tuition Colombo",
    "Chemistry Tuition Kotahena",
    "Combined Maths Classes",
    "RUBY Science Academy",
    "A/L 2028 Science Stream",
    "Advanced Level Science Sri Lanka",
  ],
  authors: [{ name: "RUBY Science Academy" }],
  creator: "RUBY Science Academy",
  publisher: "RUBY Science Academy",
  formatDetection: {
    email: false,
    address: true,
    telephone: true,
  },
  icons: {
    icon: [
      { url: "/ruby-logo.jpeg", sizes: "32x32", type: "image/jpeg" },
      { url: "/ruby-logo.jpeg", sizes: "16x16", type: "image/jpeg" },
    ],
    apple: "/ruby-logo.jpeg",
    shortcut: "/ruby-logo.jpeg",
  },
  openGraph: {
    title: "RUBY Science Academy | A/L Science Tuition in Colombo Kotahena",
    description:
      "Modern A/L Science tuition institute for Maths, Physics, and Chemistry. Join our 2028 A/L Science Stream classes now.",
    url: "https://ruby-science-academy.vercel.app",
    siteName: "RUBY Science Academy",
    type: "website",
    locale: "en_LK",
  },
  twitter: {
    card: "summary_large_image",
    title: "RUBY Science Academy",
    description:
      "Tamil medium A/L Science classes in Colombo Kotahena for Maths, Physics, and Chemistry.",
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
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: "RUBY Science Academy",
    description: "Premium Tamil medium A/L Science tuition in Colombo Kotahena.",
    url: "https://ruby-science-academy.vercel.app",
    logo: "https://ruby-science-academy.vercel.app/ruby-logo.jpeg",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Kotahena",
      addressRegion: "Colombo",
      addressCountry: "LK",
    },
    telephone: "+94 77 123 4567",
    sameAs: [
      "https://www.facebook.com/RubyScienceAcademy",
      "https://www.instagram.com/RubyScienceAcademy",
    ],
  };

  return (
    <html
      lang="en"
      className={`${jakarta.variable} ${manrope.variable} h-full scroll-smooth antialiased`}
    >
      <body className="min-h-full bg-background text-foreground">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
        <Toaster />
      </body>
    </html>
  );
}
