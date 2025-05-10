import type React from "react";
import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Script from "next/script";
import { PwaInstallPrompt } from "@/components/pwa-install-prompt";

const inter = Inter({ subsets: ["latin"] });

export const viewport: Viewport = {
  themeColor: "#2563eb",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export const metadata: Metadata = {
  title: "NavegaVis - Navegação Indoor por Wi-Fi",
  description:
    "Sistema de navegação indoor para pessoas com deficiência visual usando triangulação de redes Wi-Fi",
  generator: "v0.dev",
  manifest: "/manifest.json",
  icons: [
    { rel: "apple-touch-icon", sizes: "72x72", url: "/icons/icon-72x72.png" },
    { rel: "apple-touch-icon", sizes: "96x96", url: "/icons/icon-96x96.png" },
    {
      rel: "apple-touch-icon",
      sizes: "128x128",
      url: "/icons/icon-128x128.png",
    },
    {
      rel: "apple-touch-icon",
      sizes: "144x144",
      url: "/icons/icon-144x144.png",
    },
    {
      rel: "apple-touch-icon",
      sizes: "152x152",
      url: "/icons/icon-152x152.png",
    },
    {
      rel: "apple-touch-icon",
      sizes: "192x192",
      url: "/icons/icon-192x192.png",
    },
    {
      rel: "apple-touch-icon",
      sizes: "384x384",
      url: "/icons/icon-384x384.png",
    },
    {
      rel: "apple-touch-icon",
      sizes: "512x512",
      url: "/icons/icon-512x512.png",
    },
    { rel: "shortcut icon", url: "/icons/icon-72x72.png" },
  ],
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "NavegaVis",
  },
  applicationName: "NavegaVis",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <head>
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="mobile-web-app-capable" content="yes" />
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          {children}
          <PwaInstallPrompt />
        </ThemeProvider>
        <Script src="/sw-register.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}
