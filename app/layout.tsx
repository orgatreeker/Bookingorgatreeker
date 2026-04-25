import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-serif",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Orgatreeker | Personal Finance Consultant - Gopu Halder",
  description:
    "Stop wondering where your salary goes. Get a proven budgeting system that helps salaried professionals save more every month. 1,000+ people guided.",
  keywords: [
    "personal finance",
    "budgeting",
    "salary management",
    "expense tracker",
    "financial planning",
    "money management",
    "savings",
    "India",
  ],
  authors: [{ name: "Gopu Halder" }],
  openGraph: {
    title: "Orgatreeker | Personal Finance Consultant",
    description:
      "Your salary is working. Your system is not. Find out where your money is leaking.",
    type: "website",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Orgatreeker | Personal Finance Consultant",
    description:
      "Your salary is working. Your system is not. Find out where your money is leaking.",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#00033D",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${cormorant.variable} bg-background`}
    >
      <head>
        <script
          src="https://fast.wistia.com/player.js"
          async
          defer
        />
      </head>
      <body className="min-h-screen font-sans antialiased">{children}</body>
    </html>
  );
}
