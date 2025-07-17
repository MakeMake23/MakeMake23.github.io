import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import favicon16 from "../assets/images/favicon-16x16.png";
import favicon32 from "../assets/images/favicon-32x32.png";
import favicon48 from "../assets/images/favicon-48x48.png";
import favicon180 from "../assets/images/favicon-180x180.png";
import favicon192 from "../assets/images/favicon-192x192.png";
import favicon512 from "../assets/images/favicon-512x512.png";
import ethCursor from "../assets/images/eth-cursor.png";
import ethCursorClick from "../assets/images/eth-cursor-click.gif";
import CustomCursor from "@/components/CustomCursor";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Andy Ledesma García | CTO & Computer Scientist",
  description:
    "CTO & Computer Scientist & Blockchain Developer & Back-end Developer",
  keywords:
    "Andy Ledesma García, CTO, Computer Scientist, Blockchain Developer, Back-end Developer",
};

export default function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params?: { lang?: string };
}>) {
  const lang = params?.lang || "en";

  return (
    <html lang={lang}>

      <head>
        <link rel="icon" type="image/png" sizes="16x16" href={favicon16.src} />
        <link rel="icon" type="image/png" sizes="32x32" href={favicon32.src} />
        <link rel="icon" type="image/png" sizes="48x48" href={favicon48.src} />
        <link rel="apple-touch-icon" sizes="180x180" href={favicon180.src} />
        <link
          rel="icon"
          type="image/png"
          sizes="192x192"
          href={favicon192.src}
        />
        <link
          rel="icon"
          type="image/png"
          sizes="512x512"
          href={favicon512.src}
        />
        <style>{`
          body, a, button, [role="button"], input[type="submit"], input[type="button"], input[type="reset"], .clickable {
            cursor: none !important; /* Hide the default cursor on all elements */
          }
        `}</style>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <CustomCursor defaultCursor={ethCursor.src} clickCursor={ethCursorClick.src} />
        {children}
      </body>
    </html>
  );
}
