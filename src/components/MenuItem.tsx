"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import ProductModal from './ProductModal';

interface MenuItemProps {
  id: string;
  translationKey: string;
  image: string;
  price: number;
  category: string;
  index: number;
  translations: any;
}

const MenuItem = ({ translationKey, image, price, index, translations }: MenuItemProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <>
      <motion.div
        className="glass-card rounded-3xl overflow-hidden group cursor-pointer"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        whileHover={{ y: -8 }}
        layout
        onClick={handleOpenModal}
      >
        {/* Image Container */}
        <div className="relative h-48 overflow-hidden">
          <Image
            src={image}
            alt={translations.items[translationKey]?.name || ''}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-400"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ocean-deep/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Price Badge */}
          <motion.div
            className="absolute top-4 right-4 px-4 py-2 rounded-full ocean-gradient text-primary-foreground font-bold text-sm shadow-lg"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: index * 0.1 + 0.3, type: 'spring', stiffness: 200 }}
          >
            {price} {translations.menu.currency}
          </motion.div>

          {/* Hover Overlay */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
            <motion.div
              className="absolute inset-0 bg-ocean-deep/40 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
            />
            <motion.button
              className="relative z-10 px-6 py-3 rounded-full bg-primary-foreground text-primary font-bold shadow-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {translations.menu.viewDetails}
            </motion.button>
          </div>
        </div>

        {/* Content */}
        <div className="p-5">
          <h3 className="text-lg font-bold text-foreground mb-2 font-arabic">
            {translations.items[translationKey]?.name}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-2 font-arabic">
            {translations.items[translationKey]?.description}
          </p>
        </div>
      </motion.div>

      <ProductModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        product={{ translationKey, image, price }}
        translations={translations}
      />
    </>
  );
};

export default MenuItem;
