"use client";

import localFont from "next/font/local";
import { Barlow } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import { RecoilRoot } from "recoil";
import LayoutWrapper from "@/components/layout";

const barlow = Barlow({
  subsets: ["latin"],
  weight: ["400", "700"], // Specify the weights you need
  variable: "--font-primary",
});

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
      <body className={barlow.variable}>
        <RecoilRoot>
          <LayoutWrapper>{children}</LayoutWrapper>
        </RecoilRoot>
      </body>
    </html>
  );
}
