import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import { FaChevronDown } from 'react-icons/fa';

const languages = [
  { 
    code: 'en', 
    name: 'English', 
    flag: `${process.env.PUBLIC_URL}/flags/us.svg`,
    available: true 
  },
  { 
    code: 'es', 
    name: 'Español', 
    flag: `${process.env.PUBLIC_URL}/flags/es.svg`,
    available: true 
  },
  { 
    code: 'pt', 
    name: 'Português', 
    flag: `${process.env.PUBLIC_URL}/flags/br.svg`,
    available: true 
  },
  { 
    code: 'ru', 
    name: 'Русский', 
    flag: `${process.env.PUBLIC_URL}/flags/ru.svg`,
    available: true 
  },
];

const LanguageSelector = ({ isMobile = false, onOpen = () => {}, isMenuOpen = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { language, setLanguage } = useLanguage();
  
  const selectedLang = languages.find(lang => lang.code === language) || languages[0];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isOpen && !event.target.closest('.language-selector')) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  // Cerrar el selector de idioma cuando se abre el menú hamburguesa
  useEffect(() => {
    if (isMenuOpen) {
      setIsOpen(false);
    }
  }, [isMenuOpen]);

  const handleLanguageSelectorClick = () => {
    if (isMenuOpen) {
      onOpen(false); // Cerrar el menú hamburguesa
    }
    setIsOpen(!isOpen);
  };

  return (
    <div className="language-selector">
      <div className="relative">
        <button
          type="button"
          onClick={handleLanguageSelectorClick}
          className={`flex items-center justify-between bg-background-light rounded-lg 
                     transition-all duration-300 border border-gray-700 hover:border-primary/50
                     active:scale-95 select-none cursor-pointer
                     ${isMobile ? 'px-2 py-2' : 'px-3 py-2 space-x-2'}`}
          aria-label="Select language"
          aria-expanded={isOpen}
        >
          <div className="flex items-center">
            <img 
              src={selectedLang.flag} 
              alt={`${selectedLang.name} flag`}
              className="w-5 h-5 rounded-sm object-cover"
            />
            {!isMobile && (
              <span className="ml-2 font-medium text-white">{selectedLang.name}</span>
            )}
          </div>
          {!isMobile && (
            <motion.div
              animate={{ rotate: isOpen ? 180 : 0 }}
              transition={{ duration: 0.2 }}
              className="ml-2"
            >
              <FaChevronDown className="text-gray-400" />
            </motion.div>
          )}
        </button>

        <div
          className={`absolute top-full ${isMobile ? 'right-0' : 'left-0'} mt-2 
                     bg-background-light rounded-lg shadow-xl overflow-hidden
                     min-w-[140px] border border-gray-700 transition-all duration-200
                     ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
        >
          {languages.map((lang) => (
            <button
              key={lang.code}
              type="button"
              onClick={() => {
                if (lang.available) {
                  setLanguage(lang.code);
                  setIsOpen(false);
                }
              }}
              className={`flex items-center w-full px-4 py-2.5 hover:bg-background-dark transition-colors
                ${!lang.available && 'opacity-50 cursor-not-allowed'}
                ${lang.code === language ? 'bg-background-dark text-primary' : 'text-white'}
                hover:text-primary`}
            >
              <img 
                src={lang.flag} 
                alt={`${lang.name} flag`}
                className="w-5 h-5 rounded-sm object-cover"
              />
              <span className="ml-2 font-medium">{lang.name}</span>
              {!lang.available && (
                <span className="text-xs text-gray-400 ml-auto">(Soon)</span>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LanguageSelector;
