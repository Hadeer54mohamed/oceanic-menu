"use client";

import { useState, useMemo, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import CategoryTabs from './CategoryTabs';
import MenuItem from './MenuItem';
import SearchBar from './SearchBar';
import { type Locale } from '@/app/i18n/settings';

interface MenuItemType {
  id: string;
  translationKey: string;
  image: string;
  price: number;
  category: string;
}

const menuItems: MenuItemType[] = [
  // Coffee
  { id: '1', translationKey: 'espresso', image: '/menu/coffee.jpg', price: 15, category: 'coffee' },
  { id: '2', translationKey: 'cappuccino', image: '/menu/coffee.jpg', price: 18, category: 'coffee' },
  { id: '3', translationKey: 'latte', image: '/menu/coffee.jpg', price: 20, category: 'coffee' },
  { id: '4', translationKey: 'mocha', image: '/menu/coffee.jpg', price: 22, category: 'coffee' },
  
  // Smoothies
  { id: '5', translationKey: 'berrySmothie', image: '/menu/smoothie.jpg', price: 25, category: 'smoothies' },
  { id: '6', translationKey: 'mangoSmothie', image: '/menu/smoothie.jpg', price: 25, category: 'smoothies' },
  
  // Desserts
  { id: '7', translationKey: 'chocolateCake', image: '/menu/dessert.jpg', price: 30, category: 'desserts' },
  { id: '8', translationKey: 'cheeseCake', image: '/menu/dessert.jpg', price: 28, category: 'desserts' },
  
  // Mojito
  { id: '9', translationKey: 'classicMojito', image: '/menu/mojito.jpg', price: 22, category: 'mojito' },
  { id: '10', translationKey: 'strawberryMojito', image: '/menu/mojito.jpg', price: 24, category: 'mojito' },
  
  // Ice Cream
  { id: '11', translationKey: 'vanillaIceCream', image: '/menu/icecream.jpg', price: 18, category: 'iceCream' },
  { id: '12', translationKey: 'chocolateIceCream', image: '/menu/icecream.jpg', price: 18, category: 'iceCream' },
  
  // Breakfast
  { id: '13', translationKey: 'englishBreakfast', image: '/menu/breakfast.jpg', price: 45, category: 'breakfast' },
  { id: '14', translationKey: 'pancakes', image: '/menu/breakfast.jpg', price: 35, category: 'breakfast' },
  
  // Juices
  { id: '15', translationKey: 'orangeJuice', image: '/menu/juice.jpg', price: 15, category: 'juices' },
  { id: '16', translationKey: 'mixedJuice', image: '/menu/juice.jpg', price: 18, category: 'juices' },
];

interface MenuSectionProps {
  lang: Locale;
  translations: any;
}

const MenuSection = ({ lang, translations }: MenuSectionProps) => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSticky, setIsSticky] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const tabsRef = useRef<HTMLDivElement>(null);

  // Handle sticky navigation
  useEffect(() => {
    const handleScroll = () => {
      if (tabsRef.current) {
        const rect = tabsRef.current.getBoundingClientRect();
        setIsSticky(rect.top <= 70);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const filteredItems = useMemo(() => {
    let items = menuItems;
    
    // Filter by category
    if (activeCategory !== 'all') {
      items = items.filter(item => item.category === activeCategory);
    }
    
    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      items = items.filter(item => {
        const name = translations.items[item.translationKey]?.name?.toLowerCase() || '';
        const description = translations.items[item.translationKey]?.description?.toLowerCase() || '';
        return name.includes(query) || description.includes(query);
      });
    }
    
    return items;
  }, [activeCategory, searchQuery, translations]);

  return (
    <section id="menu" ref={sectionRef} className="py-20 px-4 relative">
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 font-display">
            {translations.menu.title}
          </h2>
          <div className="w-24 h-1 ocean-gradient mx-auto rounded-full" />
        </motion.div>

        {/* Search Bar */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <SearchBar value={searchQuery} onChange={setSearchQuery} translations={translations} />
        </motion.div>

        {/* Category Tabs - Floating */}
        <div ref={tabsRef}>
          <motion.div
            className={`transition-all duration-300 ${
              isSticky
                ? 'fixed top-16 left-0 right-0 z-40 bg-background/80 backdrop-blur-xl py-4 px-4 shadow-lg border-b border-border/20'
                : ''
            }`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className={isSticky ? 'max-w-7xl mx-auto' : ''}>
              <CategoryTabs 
                activeCategory={activeCategory} 
                onCategoryChange={setActiveCategory}
                translations={translations}
              />
            </div>
          </motion.div>
        </div>

        {/* Spacer when sticky */}
        {isSticky && <div className="h-20" />}

        {/* Menu Grid */}
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-10"
          layout
        >
          {filteredItems.length > 0 ? (
            filteredItems.map((item, index) => (
              <MenuItem
                key={item.id}
                {...item}
                index={index}
                translations={translations}
              />
            ))
          ) : (
            <motion.div
              className="col-span-full text-center py-16"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <p className="text-muted-foreground text-lg font-arabic">
                {translations.search.noResults}
              </p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default MenuSection;
