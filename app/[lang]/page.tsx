import type { Metadata } from "next";
import { translations } from "../i18n/translations";
import { type Locale } from "../i18n/settings";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import SpecialOffers from "@/components/SpecialOffers";
import MenuSection from "@/components/MenuSection";
import Footer from "@/components/Footer";
import Bubbles from "@/components/Bubbles";
import WhatsAppButton from "@/components/WhatsAppButton";

export const metadata: Metadata = {
  title: "Online Menu - قائمة الطعام الإلكترونية",
  description: "استمتع بأشهى المأكولات والمشروبات - Enjoy the finest food and drinks",
};

export default async function HomePage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const locale = lang as Locale;
  const t = translations[locale];

  return (
    <main className="min-h-screen bg-background relative overflow-hidden">
      <Bubbles />
      <Header lang={locale} translations={t} />
      <Hero lang={locale} translations={t} />
      <SpecialOffers lang={locale} translations={t} />
      <MenuSection lang={locale} translations={t} />
      <Footer lang={locale} translations={t} />
      <WhatsAppButton />
    </main>
  );
}

