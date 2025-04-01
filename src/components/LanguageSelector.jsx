import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';

const languages = [
  { 
    code: 'en', 
    name: 'English', 
    flag: '/flags/us.svg',
    available: true 
  },
  { 
    code: 'es', 
    name: 'Español', 
    flag: '/flags/es.svg',
    available: true 
  },
  { 
    code: 'pt', 
    name: 'Português', 
    flag: '/flags/br.svg',
    available: true 
  },
  { 
    code: 'ru', 
    name: 'Русский', 
    flag: '/flags/ru.svg',
    available: true 
  },
];

const LanguageSelector = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { language, setLanguage } = useLanguage();
  
  const selectedLang = languages.find(lang => lang.code === language) || languages[0];

  const handleLanguageSelect = (lang) => {
    if (lang.available) {
      setLanguage(lang.code);
      setIsOpen(false);
    }
  };

  return (
    <div className="fixed top-4 right-4 z-50">
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center space-x-2 bg-background-light rounded-lg px-4 py-2 text-white hover:bg-background-dark transition-colors"
        >
          <img 
            src={selectedLang.flag} 
            alt={`${selectedLang.name} flag`}
            className="w-5 h-5 rounded-sm object-cover"
          />
          <span className="ml-2">{selectedLang.name}</span>
        </button>

        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full right-0 mt-2 bg-background-light rounded-lg shadow-lg overflow-hidden min-w-[160px]"
          >
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => handleLanguageSelect(lang)}
                className={`flex items-center w-full px-4 py-2 hover:bg-background-dark transition-colors
                  ${!lang.available && 'opacity-50 cursor-not-allowed'}
                  ${lang.code === language ? 'bg-background-dark' : ''}`}
              >
                <img 
                  src={lang.flag} 
                  alt={`${lang.name} flag`}
                  className="w-5 h-5 rounded-sm object-cover"
                />
                <span className="ml-2">{lang.name}</span>
                {!lang.available && (
                  <span className="text-xs text-gray-400 ml-auto">(Soon)</span>
                )}
              </button>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default LanguageSelector;
