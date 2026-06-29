import type { Metadata } from "next";
import { Inter } from "next/font/google"; // Switched to Inter for the exact SaaS geometric look
import "./globals.css";
import Providers from "../components/layout/Providers";

// Load Inter font with modern, crisp geometric styles
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "FoodBridge - Reduce Food Waste",
  description: "Connecting restaurants with NGOs to share surplus food.",
  icons: {
    icon: "/logo.png",
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
      className={`${inter.variable} h-full antialiased`}
    >
      {/* 
        Added bg-[#F8F9FC] (Soft clean gray from reference)
        Added text-[#1A1F2B] (Crisp Dark Navy from reference)
      */}
      <body className="min-h-full flex flex-col bg-[#F8F9FC] text-[#1A1F2B] font-sans">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}