"use client";

import { useRouter, usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { Globe } from 'lucide-react';
import { type Locale } from '@/app/i18n/settings';

interface LanguageSwitcherProps {
  lang: Locale;
  translations: any;
}

const LanguageSwitcher = ({ lang, translations }: LanguageSwitcherProps) => {
  const router = useRouter();
  const pathname = usePathname();

  const toggleLanguage = () => {
    const newLang = lang === 'ar' ? 'en' : 'ar';
    const newPath = pathname.replace(`/${lang}`, `/${newLang}`);
    router.push(newPath);
  };

  return (
    <motion.button
      onClick={toggleLanguage}
      className="flex items-center gap-2 px-4 py-2 rounded-full glass-card hover:bg-primary/10 transition-all duration-300"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <Globe className="w-5 h-5 text-primary" />
      <span className="text-sm font-medium text-foreground">
        {lang === 'ar' ? translations.language.en : translations.language.ar}
      </span>
    </motion.button>
  );
};

export default LanguageSwitcher;
