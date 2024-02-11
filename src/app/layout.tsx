import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import { Inter } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Weather.blue",
  description: "Simple weather forecast",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}

        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
