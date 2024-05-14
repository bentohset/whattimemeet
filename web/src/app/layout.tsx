import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { Toaster } from "@/components/ui/toaster";

import { Footer, Navbar } from "@/features/navigation";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "WhatTimeMeet",
  description: "A modern meeting scheduler",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen bg-black">
          <Navbar />
          <div className="bg-white min-h-[600px]">{children}</div>
          <Footer />
          <Toaster />
        </div>
      </body>
    </html>
  );
}
