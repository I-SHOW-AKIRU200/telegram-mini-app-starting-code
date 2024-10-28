"use client";

import localFont from "next/font/local";
import "./globals.css";
import Script from "next/script";
import { RecoilRoot } from "recoil";
import LayoutWrapper from "@/components/layout";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <Script
          src="https://telegram.org/js/telegram-web-app.js"
          strategy="beforeInteractive"
        />
      </head>
      <body>
        <RecoilRoot>
          <LayoutWrapper>{children}</LayoutWrapper>
        </RecoilRoot>
      </body>
    </html>
  );
}
