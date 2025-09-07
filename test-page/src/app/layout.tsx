import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import {Providers} from "./providers";

const inter = Inter({
  variable: "--font-inter",
  display: 'swap',
});

export const metadata: Metadata = {
  title: "22 Circles - หน้าเว็บทดสอบ",
  description: "สร้างด้วยความขี้เกียจ",
  icons: {
    icon: '/logo.svg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th" className="white">
      <head>
        {/* Viewport Configuration */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
        
        {/* Color Scheme - tells iOS this is a light theme */}
        <meta name="color-scheme" content="light" />
        
        {/* Apple-specific Meta Tags for iOS Status Bar */}
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        
        {/* Theme Color for Address Bar */}
        <meta name="theme-color" content="#ffffff" />
        
        {/* iOS Safari specific styling */}
        <meta name="apple-mobile-web-app-title" content="22 Circles" />
      </head>
      <body
        className={`${inter.variable} antialiased`}
      >
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
