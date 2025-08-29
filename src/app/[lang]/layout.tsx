import { getDictionary, Locale } from "@/dictionaries";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import BackToTopButton from "@/components/BackToTopButton";

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: Locale }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  return (
    <div>
      <Header currentLocale={lang} />
      <main>{children}</main>
      <Footer dict={dict} />
      <BackToTopButton />
    </div>
  );
}
