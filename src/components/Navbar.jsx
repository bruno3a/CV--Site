import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import LanguageSelector from './LanguageSelector';

const NavLink = ({ href, children, onClick }) => (
  <a 
    href={href}
    className="text-gray-300 hover:text-primary transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background-dark"
    aria-label={children}
    tabIndex={0}
    onClick={onClick}
  >
    {children}
  </a>
);

const Navbar = () => {
  const { t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header
      role="banner"
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-background-dark/95 backdrop-blur-sm py-4' : 'bg-transparent py-6'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <nav role="navigation" aria-label="Main navigation" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a 
            href="#" 
            className="text-2xl font-bold text-primary flex-shrink-0"
            aria-label="Home"
          >
            CV - Bruno Trezza
          </a>
          
          {/* Desktop Menu */}
          <div className="hidden xl:flex items-center justify-center flex-1 mx-8">
            <div className="flex space-x-8">
              <NavLink href="#about">{t('nav.about')}</NavLink>
              <NavLink href="#experience">{t('nav.experience')}</NavLink>
              <NavLink href="#projects">{t('nav.projects')}</NavLink>
              <NavLink href="#education">{t('nav.education')}</NavLink>
              <NavLink href="#skills">{t('nav.skills')}</NavLink>
              <NavLink href="#contact">{t('nav.contact')}</NavLink>
            </div>
          </div>

          {/* Right Side Controls */}
          <div className="flex items-center space-x-3">
            {/* Desktop Language Selector */}
            <div className="hidden xl:block">
              <LanguageSelector 
                onOpen={() => setIsMenuOpen(false)}
                isMenuOpen={isMenuOpen}
              />
            </div>

            {/* Mobile Controls */}
            <div className="xl:hidden flex items-center space-x-2">
              {/* Mobile Language Selector */}
              <div className="flex items-center">
                <LanguageSelector 
                  isMobile={true}
                  onOpen={setIsMenuOpen}
                  isMenuOpen={isMenuOpen}
                />
              </div>
              
              {/* Mobile Menu Button */}
              <button 
                className="text-gray-300 focus:outline-none focus:ring-2 focus:ring-primary
                           bg-background-light rounded-lg px-2 py-2 border border-gray-700 hover:border-primary/50"
                onClick={() => {
                  setIsMenuOpen(!isMenuOpen);
                }}
                aria-label="Toggle menu"
                aria-expanded={isMenuOpen}
              >
                <svg 
                  className="w-6 h-6" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  {isMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <motion.div
          className={`xl:hidden absolute right-0 ${isMenuOpen ? 'block' : 'hidden'}`}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: isMenuOpen ? 1 : 0, y: isMenuOpen ? 0 : -20 }}
          transition={{ duration: 0.2 }}
          style={{ 
            right: '16px' // Esto alinea con el margen del contenedor principal
          }}
        >
          <div className="absolute right-0 top-full mt-2 min-w-[200px] 
                        bg-background-light rounded-lg shadow-xl overflow-hidden 
                        border border-gray-700">
            <div className="py-1">
              {[
                { href: "#about", label: t('nav.about') },
                { href: "#experience", label: t('nav.experience') },
                { href: "#projects", label: t('nav.projects') },
                { href: "#education", label: t('nav.education') },
                { href: "#skills", label: t('nav.skills') },
                { href: "#contact", label: t('nav.contact') }
              ].map((item, index) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <a
                    href={item.href}
                    onClick={handleLinkClick}
                    className="block px-4 py-2.5 text-white hover:bg-background-dark 
                             transition-colors hover:text-primary"
                  >
                    {item.label}
                  </a>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </nav>
    </motion.header>
  );
};

export default Navbar;


