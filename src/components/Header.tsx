"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { QrCode } from 'lucide-react';
import LanguageSwitcher from './LanguageSwitcher';
import QRCodeModal from './QRCodeModal';
import { type Locale } from '../../app/i18n/settings';

interface HeaderProps {
  lang: Locale;
  translations: any;
}

const Header = ({ lang, translations }: HeaderProps) => {
  const [isQRModalOpen, setIsQRModalOpen] = useState(false);

  return (
    <>
      <motion.header 
        className="fixed top-0 left-0 right-0 z-50 px-4 py-4 bg-background/60 backdrop-blur-lg border-b border-border/10"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <motion.div 
            className="flex items-center gap-3"
            whileHover={{ scale: 1.02 }}
          >
            <div className="w-12 h-12 rounded-full ocean-gradient flex items-center justify-center shadow-lg">
              <span className="text-primary-foreground font-bold text-xl">OM</span>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold text-foreground font-arabic">{translations.brand.name}</h1>
            </div>
          </motion.div>

          <div className="flex items-center gap-3">
            <LanguageSwitcher lang={lang} translations={translations} />
          </div>
        </div>
      </motion.header>

      <QRCodeModal 
        isOpen={isQRModalOpen} 
        onClose={() => setIsQRModalOpen(false)}
        translations={translations}
      />
    </>
  );
};

export default Header;
