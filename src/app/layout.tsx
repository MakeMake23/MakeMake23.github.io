import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

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
  description: "CTO & Computer Scientist & Blockchain Developer & Back-end Developer",
  keywords: "Andy Ledesma García, CTO, Computer Scientist, Blockchain Developer, Back-end Developer",
};

export default function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params?: { lang?: string };
}>) {
  // Default to 'en' if no language parameter is available
  const lang = params?.lang || 'en';
  
  return (
    <html lang={lang}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
