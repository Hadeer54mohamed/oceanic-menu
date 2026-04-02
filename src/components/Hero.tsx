"use client";

import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import Image from 'next/image';
import { type Locale } from '@/app/i18n/settings';

interface HeroProps {
  lang: Locale;
  translations: any;
}

const Hero = ({ lang, translations }: HeroProps) => {
  const scrollToMenu = () => {
    document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <Image
          src="/hero-bg.jpg"
          alt="Hero Background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ocean-deep/80 via-ocean-mid/60 to-ocean-light/40" />
      </div>

      {/* Animated Waves */}
      <div className="absolute bottom-0 left-0 right-0 h-32">
        <svg 
          className="absolute bottom-0 w-full h-full animate-wave"
          viewBox="0 0 1440 120" 
          preserveAspectRatio="none"
        >
          <path
            fill="hsl(var(--background))"
            fillOpacity="0.3"
            d="M0,64 C480,120 960,0 1440,64 L1440,120 L0,120 Z"
          />
        </svg>
        <svg 
          className="absolute bottom-0 w-full h-full animate-wave animation-delay-200"
          viewBox="0 0 1440 120" 
          preserveAspectRatio="none"
        >
          <path
            fill="hsl(var(--background))"
            fillOpacity="0.5"
            d="M0,80 C360,20 720,100 1440,40 L1440,120 L0,120 Z"
          />
        </svg>
        <svg 
          className="absolute bottom-0 w-full h-full"
          viewBox="0 0 1440 120" 
          preserveAspectRatio="none"
        >
          <path
            fill="hsl(var(--background))"
            d="M0,96 C240,60 720,120 1440,80 L1440,120 L0,120 Z"
          />
        </svg>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <p className="text-ocean-foam text-lg md:text-xl mb-4 font-arabic">
            {translations.hero.welcome}
          </p>
        </motion.div>

        <motion.h1
          className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 font-display"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <span className="text-primary-foreground drop-shadow-lg">{translations.brand.name}</span>
        </motion.h1>

        <motion.p
          className="text-lg md:text-xl text-ocean-foam/90 mb-10 font-arabic max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          {translations.hero.subtitle}
        </motion.p>

        <motion.button
          onClick={scrollToMenu}
          className="group inline-flex items-center gap-3 px-8 py-4 rounded-full ocean-gradient text-primary-foreground font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.98 }}
        >
          <span className="font-arabic">{translations.hero.cta}</span>
          <motion.div
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <ChevronDown className="w-5 h-5" />
          </motion.div>
        </motion.button>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        <motion.div
          className="w-6 h-10 rounded-full border-2 border-primary-foreground/50 flex items-start justify-center p-2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <motion.div 
            className="w-1.5 h-3 bg-primary-foreground/70 rounded-full"
            animate={{ y: [0, 8, 0], opacity: [1, 0.5, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
