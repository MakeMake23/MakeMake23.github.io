import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../../globals.css";
import { i18n } from "../../i18n-config";
import { Locale } from "../../dictionaries";

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

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { lang: string };
}>) {
  // In an async component, we need to await params before accessing its properties
  const resolvedParams = await params;
  const langParam = resolvedParams.lang as string;
  const validLang = ['en', 'es'].includes(langParam) ? langParam : 'en';
  
  return (
    <>
      {/* We don't need html/body tags here as they're defined in the root layout */}
      {children}
    </>
  );
}
