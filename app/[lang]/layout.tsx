import { Cairo } from "next/font/google";
import { notFound } from "next/navigation";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryProvider } from "@/components/providers/query-provider";
import { ToasterProvider } from "@/components/providers/toaster-provider";
import { isValidLocale, type Locale } from "../i18n/settings";
import "../globals.css";

const cairo = Cairo({ 
  subsets: ["latin", "arabic"],
  variable: "--font-cairo",
});

export async function generateStaticParams() {
  return [{ lang: 'ar' }, { lang: 'en' }];
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const locale = lang as Locale;
  
  if (!isValidLocale(locale)) {
    notFound();
  }

  const dir = locale === 'ar' ? 'rtl' : 'ltr';

  return (
    <html lang={locale} dir={dir}>
      <body className={cairo.className}>
        <QueryProvider>
          <TooltipProvider>
            {children}
            <ToasterProvider />
          </TooltipProvider>
        </QueryProvider>
      </body>
    </html>
  );
}

