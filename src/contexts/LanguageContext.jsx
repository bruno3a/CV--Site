import React, { createContext, useState, useContext } from 'react';
import enTranslations from '../locales/en.json';
import esTranslations from '../locales/es.json';
import ptTranslations from '../locales/pt.json';
import ruTranslations from '../locales/ru.json';

const translations = {
  en: enTranslations,
  es: esTranslations,
  pt: ptTranslations,
  ru: ruTranslations,
};

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const LanguageProvider = ({ children }) => {
  // Get initial language from localStorage or default to 'en'
  const [language, setLanguage] = useState(() => {
    const savedLang = localStorage.getItem('preferredLanguage');
    return savedLang || 'en';
  });

  // Update language and save to localStorage
  const handleLanguageChange = (newLang) => {
    setLanguage(newLang);
    localStorage.setItem('preferredLanguage', newLang);
  };

  const translate = (key) => {
    const keys = key.split('.');
    let translation = translations[language];
    
    for (const k of keys) {
      if (translation && translation[k]) {
        translation = translation[k];
      } else {
        console.warn(`Translation missing for key: ${key} in language: ${language}`);
        return key;
      }
    }
    
    return translation;
  };

  const value = {
    language,
    setLanguage: handleLanguageChange,
    t: translate,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};
