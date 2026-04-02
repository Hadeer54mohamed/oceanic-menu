"use client";

import { motion } from 'framer-motion';
import { Sparkles, Clock, Flame } from 'lucide-react';
import { type Locale } from '@/app/i18n/settings';

const offers = [
  {
    id: 1,
    translationKey: 'offer1',
    discount: 20,
    icon: Flame,
    bgClass: 'from-orange-500 to-red-500',
  },
  {
    id: 2,
    translationKey: 'offer2',
    discount: 15,
    icon: Clock,
    bgClass: 'from-primary to-ocean-medium',
  },
  {
    id: 3,
    translationKey: 'offer3',
    discount: 25,
    icon: Sparkles,
    bgClass: 'from-purple-500 to-pink-500',
  },
];

interface SpecialOffersProps {
  lang: Locale;
  translations: any;
}

const SpecialOffers = ({ lang, translations }: SpecialOffersProps) => {
  return (
    <section className="py-12 px-4 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3 font-display flex items-center justify-center gap-3">
            <Sparkles className="w-8 h-8 text-primary" />
            {translations.offers.title}
            <Sparkles className="w-8 h-8 text-primary" />
          </h2>
        </motion.div>

        {/* Offers Carousel */}
        <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide">
          {offers.map((offer, index) => {
            const Icon = offer.icon;
            return (
              <motion.div
                key={offer.id}
                className={`flex-shrink-0 w-[300px] sm:w-[350px] p-6 rounded-3xl bg-gradient-to-br ${offer.bgClass} text-white snap-center relative overflow-hidden`}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02, y: -5 }}
              >
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-white/20 -translate-y-1/2 translate-x-1/2" />
                  <div className="absolute bottom-0 left-0 w-24 h-24 rounded-full bg-white/20 translate-y-1/2 -translate-x-1/2" />
                </div>

                {/* Content */}
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                      <Icon className="w-6 h-6" />
                    </div>
                    <div className="text-3xl font-bold">
                      {offer.discount}% {translations.offers.off}
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold mb-2 font-arabic">
                    {translations.offers[offer.translationKey].title}
                  </h3>
                  <p className="text-white/80 text-sm font-arabic">
                    {translations.offers[offer.translationKey].description}
                  </p>
                </div>

                {/* Shimmer Effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                  animate={{ x: ['-100%', '100%'] }}
                  transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
                />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SpecialOffers;
