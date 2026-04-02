"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Minus, Check } from 'lucide-react';
import Image from 'next/image';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: {
    translationKey: string;
    image: string;
    price: number;
  } | null;
  translations: any;
}

const sizes = [
  { id: 'small', priceModifier: 0 },
  { id: 'medium', priceModifier: 5 },
  { id: 'large', priceModifier: 10 },
];

const extras = [
  { id: 'whippedCream', price: 5 },
  { id: 'extraShot', price: 7 },
  { id: 'caramel', price: 4 },
  { id: 'chocolate', price: 4 },
];

const ProductModal = ({ isOpen, onClose, product, translations }: ProductModalProps) => {
  const [selectedSize, setSelectedSize] = useState('medium');
  const [selectedExtras, setSelectedExtras] = useState<string[]>([]);

  if (!product) return null;

  const sizeModifier = sizes.find(s => s.id === selectedSize)?.priceModifier || 0;
  const extrasTotal = selectedExtras.reduce((sum, extraId) => {
    const extra = extras.find(e => e.id === extraId);
    return sum + (extra?.price || 0);
  }, 0);
  const totalPrice = product.price + sizeModifier + extrasTotal;

  const toggleExtra = (extraId: string) => {
    setSelectedExtras(prev =>
      prev.includes(extraId)
        ? prev.filter(id => id !== extraId)
        : [...prev, extraId]
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg p-0 overflow-hidden bg-card border-border/50 backdrop-blur-xl max-h-[90vh] overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.3 }}
        >
          {/* Image Section */}
          <div className="relative h-52 overflow-hidden">
            <Image
              src={product.image}
              alt={translations.items[product.translationKey]?.name || ''}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
          </div>

          {/* Content Section */}
          <div className="p-5 space-y-5">
            <DialogHeader className="space-y-2">
              <DialogTitle className="text-2xl font-bold text-foreground font-arabic">
                {translations.items[product.translationKey]?.name}
              </DialogTitle>
              <DialogDescription className="text-sm text-muted-foreground font-arabic leading-relaxed">
                {translations.items[product.translationKey]?.description}
              </DialogDescription>
            </DialogHeader>

            {/* Size Selection */}
            <div className="space-y-3">
              <h4 className="font-bold text-foreground font-arabic">{translations.product.size}</h4>
              <div className="flex gap-2">
                {sizes.map((size) => (
                  <motion.button
                    key={size.id}
                    onClick={() => setSelectedSize(size.id)}
                    className={`flex-1 py-2.5 px-3 rounded-xl text-sm font-medium transition-all ${
                      selectedSize === size.id
                        ? 'ocean-gradient text-primary-foreground shadow-lg'
                        : 'glass-card text-foreground hover:bg-primary/10'
                    }`}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div className="font-arabic">{translations.sizes[size.id]}</div>
                    {size.priceModifier > 0 && (
                      <div className="text-xs opacity-80">+{size.priceModifier} {translations.menu.currency}</div>
                    )}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Extras Selection */}
            <div className="space-y-3">
              <h4 className="font-bold text-foreground font-arabic">{translations.product.extras}</h4>
              <div className="grid grid-cols-2 gap-2">
                {extras.map((extra) => {
                  const isSelected = selectedExtras.includes(extra.id);
                  return (
                    <motion.button
                      key={extra.id}
                      onClick={() => toggleExtra(extra.id)}
                      className={`p-3 rounded-xl text-sm text-start transition-all flex items-center justify-between ${
                        isSelected
                          ? 'bg-primary/20 border-2 border-primary text-foreground'
                          : 'glass-card text-foreground hover:bg-primary/5 border-2 border-transparent'
                      }`}
                      whileTap={{ scale: 0.95 }}
                    >
                      <div>
                        <div className="font-arabic font-medium">{translations.extras[extra.id]}</div>
                        <div className="text-xs text-muted-foreground">+{extra.price} {translations.menu.currency}</div>
                      </div>
                      {isSelected && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="w-5 h-5 rounded-full bg-primary flex items-center justify-center"
                        >
                          <Check className="w-3 h-3 text-primary-foreground" />
                        </motion.div>
                      )}
                    </motion.button>
                  );
                })}
              </div>
            </div>

            {/* Total Price */}
            <motion.div
              className="flex items-center justify-between p-4 rounded-2xl ocean-gradient text-primary-foreground"
              layout
            >
              <span className="font-arabic font-bold">{translations.product.total}</span>
              <motion.span
                key={totalPrice}
                initial={{ scale: 1.2 }}
                animate={{ scale: 1 }}
                className="text-2xl font-bold"
              >
                {totalPrice} {translations.menu.currency}
              </motion.span>
            </motion.div>
          </div>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
};

export default ProductModal;
