"use client";

import { motion } from 'framer-motion';
import { 
  Coffee, 
  IceCream, 
  Cake, 
  GlassWater, 
  Citrus,
  UtensilsCrossed,
  Sparkles,
  LayoutGrid
} from 'lucide-react';

interface CategoryTabsProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
  translations: any;
}

const CategoryTabs = ({ activeCategory, onCategoryChange, translations }: CategoryTabsProps) => {
  const categories = [
    { id: 'all', icon: LayoutGrid, key: 'all' },
    { id: 'coffee', icon: Coffee, key: 'coffee' },
    { id: 'smoothies', icon: Sparkles, key: 'smoothies' },
    { id: 'desserts', icon: Cake, key: 'desserts' },
    { id: 'mojito', icon: GlassWater, key: 'mojito' },
    { id: 'iceCream', icon: IceCream, key: 'iceCream' },
    { id: 'breakfast', icon: UtensilsCrossed, key: 'breakfast' },
    { id: 'juices', icon: Citrus, key: 'juices' },
  ];

  return (
    <div className="w-full overflow-x-auto pb-4 scrollbar-hide">
      <div className="flex gap-3 justify-start md:justify-center min-w-max px-4">
        {categories.map((category, index) => {
          const Icon = category.icon;
          const isActive = activeCategory === category.id;

          return (
            <motion.button
              key={category.id}
              onClick={() => onCategoryChange(category.id)}
              className={`
                flex flex-col items-center gap-2 px-5 py-3 rounded-2xl transition-all duration-300
                ${isActive 
                  ? 'ocean-gradient text-primary-foreground shadow-lg' 
                  : 'glass-card hover:bg-primary/10 text-foreground'
                }
              `}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <Icon className={`w-6 h-6 ${isActive ? 'text-primary-foreground' : 'text-primary'}`} />
              <span className="text-sm font-medium whitespace-nowrap font-arabic">
                {translations.categories[category.key]}
              </span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};

export default CategoryTabs;
