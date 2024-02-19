import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Analytics } from '@vercel/analytics/react';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "GPTS Prompt - Your Prompt Engineer Community",
  description: "Prompt engineering is shaping the future of how we interact with technology. We founded GPTs Prompt to cultivate a space where this art form can thrive. Through playful challenges, shared knowledge, and a dash of friendly competition, we're unlocking the potential of AI, one well-crafted prompt at a time.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={inter.className}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
