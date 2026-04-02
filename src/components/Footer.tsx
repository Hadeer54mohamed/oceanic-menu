"use client";

import { motion } from 'framer-motion';
import { Instagram, Facebook, Twitter, MapPin, Phone, Clock } from 'lucide-react';
import { type Locale } from '@/app/i18n/settings';

interface FooterProps {
  lang: Locale;
  translations: any;
}

const Footer = ({ lang, translations }: FooterProps) => {
  const socialLinks = [
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Twitter, href: '#', label: 'Twitter' },
  ];

  return (
    <footer className="ocean-gradient py-16 px-4 relative overflow-hidden">
      {/* Wave Top */}
      <div className="absolute top-0 left-0 right-0 h-16 -translate-y-full">
        <svg 
          className="absolute bottom-0 w-full h-full"
          viewBox="0 0 1440 60" 
          preserveAspectRatio="none"
        >
          <path
            fill="hsl(var(--primary))"
            d="M0,30 C360,60 720,0 1440,30 L1440,60 L0,60 Z"
          />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-primary-foreground">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-primary-foreground/20 flex items-center justify-center">
                <span className="font-bold text-xl">OM</span>
              </div>
              <h3 className="text-2xl font-bold font-arabic">{translations.brand.name}</h3>
            </div>
            <p className="text-primary-foreground/80 font-arabic">
              {translations.brand.tagline}
            </p>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-4"
          >
            <div className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-aqua-glow" />
              <div>
                <p className="font-bold font-arabic">{translations.footer.workingHours}</p>
                <p className="text-primary-foreground/80 text-sm">{translations.footer.everyday} 8:00 - 24:00</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="w-5 h-5 text-aqua-glow" />
              <div>
                <p className="font-bold font-arabic">{translations.footer.address}</p>
                <p className="text-primary-foreground/80 text-sm">123 Ocean Street, City</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-aqua-glow" />
              <div>
                <p className="font-bold font-arabic">{translations.footer.phone}</p>
                <p className="text-primary-foreground/80 text-sm">+966 50 000 0000</p>
              </div>
            </div>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h4 className="text-lg font-bold mb-4 font-arabic">{translations.footer.followUs}</h4>
            <div className="flex gap-4">
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    className="w-12 h-12 rounded-full bg-primary-foreground/20 flex items-center justify-center hover:bg-primary-foreground/30 transition-colors duration-300"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                  >
                    <Icon className="w-5 h-5" />
                  </motion.a>
                );
              })}
            </div>
          </motion.div>
        </div>

        {/* Copyright */}
        <motion.div
          className="mt-12 pt-8 border-t border-primary-foreground/20 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <p className="text-primary-foreground/70 text-sm font-arabic">
            © 2024 {translations.brand.name}. {translations.footer.rights}.
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
