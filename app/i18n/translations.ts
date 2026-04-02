import arTranslation from './locales/ar.json';
import enTranslation from './locales/en.json';

export const translations = {
  ar: arTranslation,
  en: enTranslation,
};

export type TranslationKey = keyof typeof arTranslation;

